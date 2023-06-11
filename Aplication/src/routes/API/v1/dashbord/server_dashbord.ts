import {Request, Response, Router} from "express"
import { chacke_aggred_terms_api, check_csrf_tocken, is_discord_login } from "../../../../middlewares/auth"
import { DonationsTable, InvoicesTable, SectionTable, ServersTable, UsersTable } from "../../../../tables"
import { HasMany, HasOne, where, Op } from "sequelize"
import { DB_DonationsTable, DB_Invoices, DB_ServersTable } from "../../../../types"
import { UploadedFile } from "express-fileupload"
import { client, server_error_msg } from "../../../../handler/runner"
import path from "path"
import { createDate, createDateNow } from "./all_dashbords"
import { inputsFillter, max_len, route_code } from "../../../../functions"
import { Send_err_msg, unknown_problem } from "../../../pages/error_page"
import { auth_secure } from "../../../../functions/YoFi_Crypto"
import { HTTPLogs } from "../../../../handler/logs"
import { Funcs } from "../../../../functions/class"
const server_dashbord = Router()

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.server_dashbord, code)
}



export const isUserHaveTheServer = (req:Request, res:Response, server_id:string) => {
    const discord_data = req.user as any
    for(let server of discord_data.guilds){
        if(server.owner && server.id == server_id){
            return {
                server_name:server.name,
                server_img:`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`,
                isOwend:true,
            }
        }
    }
    return {
        server_name:"",
        server_img:"",
        isOwend:false
    }
}
server_dashbord.use(chacke_aggred_terms_api)
server_dashbord.use(is_discord_login)

server_dashbord.get("/render_log", is_discord_login , async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const target_server_id = req.query.server_id
    if(!target_server_id || typeof target_server_id != "string"){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(isNaN(Number(target_server_id))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    const UserServer = isUserHaveTheServer(req, res,target_server_id as string)
    if(!UserServer.isOwend){
        return res.send(error_handler.create_json_api_msg("invalid permission"))
    }
    var get_server_data
    var get_donations
    var get_my_payments
    try{
        get_server_data = await ServersTable.findOne({
            where:{
                server_id:target_server_id
            } as DB_ServersTable,
            logging:false
        })
        get_donations = await DonationsTable.findAll({
            where:{
                resiver_server_or_user_id:`s${target_server_id}`,
            } as DB_DonationsTable,
            logging:false,
            order:[
                ["id", "DESC"]
            ],
            limit:6,
        })
        get_my_payments = await InvoicesTable.findAll({
            where:{
                server_id:target_server_id
            } as DB_Invoices,
            logging:false,
            order:[
                ["id", "DESC"]
            ],
            limit:6,
        })
    } catch(err){
        logger.write_error(err, route_code.server_dashbord + 1)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(1)))
    }

    
    var server_data:DB_ServersTable | null  = null
    if(get_server_data){
        server_data = get_server_data.get()
    }
    var isMyBotInTheServer = false
    try{
        await client.guilds.fetch(target_server_id)
        isMyBotInTheServer = true
    } catch(err){
        isMyBotInTheServer = false
    }
    const created_csrf_tocket = auth_secure.createRandomLang(100)
    req.session.CSRF_token = created_csrf_tocket
    res.send({
        server_donations:get_donations ? get_donations.map(value => value.get()) : [],
        server_payments:get_my_payments ? get_my_payments.map(value => value.get()) : [],
        is_bot_added:isMyBotInTheServer,
        try:created_csrf_tocket,
        server_data:{
            server_name:UserServer.server_name,
            server_img:UserServer.server_img,
            ...server_data
        }
    })
})

server_dashbord.use(check_csrf_tocken)

server_dashbord.post("/create_config", async (req, res) => {
    const logger = new  HTTPLogs(req, res)
    let {target_basket_embed_description, target_lang, target_logs_channel_id, pay_pal ,target_products_mangers, target_server_id, target_invite_link, target_discrption} = req.body
    if(!target_server_id){
        return res.send("missing fields")
    }
    if(
        typeof target_basket_embed_description != "string" || 
        typeof target_lang != "string" || 
        typeof target_logs_channel_id != "string" || 
        typeof pay_pal != "string" || 
        typeof target_products_mangers != "string" || 
        typeof target_server_id != "string" || 
        typeof target_invite_link != "string" || 
        typeof target_discrption != "string" ||
        typeof target_server_id != "string"
    ){
        return res.send("missing fields")
    }
    if(target_invite_link.length > 100){
        return res.send(`invite link must be less then 100`)
    }
    if(target_discrption.length > max_len.description){
        return res.send(`store description must be less then ${max_len.description}`)
    }
    if(target_basket_embed_description.length > max_len.description){
        return res.send(`basket embed description must be less then ${max_len.description}`)
    }
    const is_email_ok = inputsFillter({
        email:pay_pal,
        lang:"en"
    })
    if(!is_email_ok.test){
        return res.send("invalid email")
    }
    try{
        const test_products_mangers =  JSON.parse(target_products_mangers)
        if(test_products_mangers.length == undefined){
            return res.send("invalid fields")
        }
        if(test_products_mangers.length > 100){
            return res.send("you can't add more then 100 manger")
        }
        if(test_products_mangers.length > 0){
            for(let manger of test_products_mangers){
                if(manger.length > 30 || isNaN(Number(manger))){
                    return res.send("invalid user id")
                }
            }
        }
    } catch(err){
        return res.send("invalid argument")
    }
    const is_user_ban = await Funcs.HTTP_is_Server_Ban(req, res)
    if(is_user_ban.err) {
        return
    }
    if(is_user_ban.status){
        return res.send("sorry you can't complete your configuration because you have a banned store before")
    }
    var server
    try{
         server = await client.guilds.fetch(target_server_id)
    } catch(err){
        logger.write_error("server id is not valid in creating config", 0)
        return res.send("invalid server id")
    }
    if(server.ownerId != (req.user as any).id){
        return res.send("permetion denide")
    }
    try{
         await server.channels.fetch(target_logs_channel_id)
    } catch(err){
        return res.send("invalid channel id")
    }
    var getServerSttings 
    try{
        getServerSttings = await ServersTable.findOne({
            where:{
                server_id:target_server_id
            } as DB_ServersTable,
            logging:false
        })
    } catch(err){
        return res.send(p_unknown_problem(3))
    }
    target_products_mangers = target_products_mangers || "[]"
    var isLangBass = false
    if(target_lang == "English" || target_lang == "Arabic"){
        isLangBass = true
    }
    if(!isLangBass){
        return res.send("missing fields")
    }
    
    
    try{
        var fileImgePath
        if(req.files){
            const img = req.files.img as UploadedFile
            if(!img.mimetype.startsWith("image")){
                return res.send("it must be an image")
            }
            if(img.size > 2500000){
                return res.send("image must be 2MB or less")
            }
            const fileExtention = img.name.split(".")[img.name.split(".").length - 1]
            await new Promise((ok, not_ok) => {
                img.mv(path.join(__dirname, `../../../../../public/server_bascket_imgs/_${target_server_id}.${fileExtention}`), (err) => {
                    if(err){
                        logger.write_error({
                            yofiMsg:"connot uploud the store image",
                            error:err,
                        }, 0)
                        not_ok(err)
                    } else {
                        ok("file created")
                    }
                })
            })
            fileImgePath = `${process.env.PROTOCOL}://${process.env.DOMAIN}/server_bascket_imgs/_${target_server_id}.${fileExtention}`
        }
    
        if(!getServerSttings){
            if(!target_lang || !target_logs_channel_id || !pay_pal){
                return res.send("missing fields")
            }
            ServersTable.create({
                server_name:server!.name,
                user_id:(req.user as any).id,
                status:null,
                disc:target_discrption,
                basket_embed_description:target_basket_embed_description,
                invite_link:target_invite_link,
                basket_embed_imageURL:fileImgePath,
                lang:target_lang,
                products_mangers:target_products_mangers,
                server_id:target_server_id,
                pay_pal_email:pay_pal,
                logs_channel:target_logs_channel_id,
                our_user_id:req.session.login_data!.id,
                rate:3.5
            } as DB_ServersTable, {logging:false})
            return res.send("config created")
        } else {
            const DB_serverSttings:DB_ServersTable = getServerSttings.get()
            ServersTable.update({
                server_name:server!.name,
                invite_link:target_invite_link || DB_serverSttings.invite_link,
                disc:target_discrption || DB_serverSttings.disc,
                basket_embed_description:target_basket_embed_description || DB_serverSttings.basket_embed_description,
                basket_embed_imageURL:fileImgePath || DB_serverSttings.basket_embed_imageURL,
                lang:target_lang || DB_serverSttings.lang,
                logs_channel:target_logs_channel_id || DB_serverSttings.logs_channel,
                products_mangers:target_products_mangers == DB_serverSttings.products_mangers ? DB_serverSttings.products_mangers : target_products_mangers,
                pay_pal_email:pay_pal || DB_serverSttings.pay_pal_email,
            } as DB_ServersTable, {logging:false, where: DB_serverSttings.user_id ? {
                server_id:target_server_id,
                user_id:(req.user as any).id,
                our_user_id:req.session.login_data!.id,
             } as DB_ServersTable : {
                server_id:target_server_id,
                our_user_id:req.session.login_data!.id,
             } as DB_ServersTable})
            return res.send("config updated")
        }
    } catch(err){
        logger.write_error(err, route_code.server_dashbord + 2)
        return res.send(p_unknown_problem(2))
    }
})

server_dashbord.post("/server_payments", async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {
        request_lifter_user_id,
        request_lifter_user_name,
        payeer_user_id,
        payeer_user_name,
        total_amount,
        from_date,
        to_date,
    } = req.body
    const {from} = req.query
    let limit = req.query.limit || 2
    const target_server_id = req.query.server_id
    if(!target_server_id){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    const UserServer = isUserHaveTheServer(req, res, target_server_id as string)
    if(!UserServer.isOwend ){
        return res.send(error_handler.create_json_api_msg("invalid permission"))
    }
    if(isNaN(Number(from)) || isNaN(Number(limit))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(Number(limit) > 6){
        return res.send(error_handler.create_json_api_msg("invalid max number"))
    }
    const where:any = {
        server_id:target_server_id,
        user_id:request_lifter_user_id && payeer_user_id ?
        `${request_lifter_user_id}--88--${payeer_user_id}` : {
            [Op.like]:payeer_user_id ? `%--88--${payeer_user_id}%` : `%${request_lifter_user_id}--88--%`
        },
        user_username: request_lifter_user_name && payeer_user_name ?
        `${request_lifter_user_name}--88--${payeer_user_name}` : {
            [Op.like]: payeer_user_name ? `%--88--${payeer_user_name}%` : `%${request_lifter_user_name}--88--%`
        },
        total_amount:total_amount,
        createdAt:{
            [Op.between]:[createDate(from_date), to_date ? createDate(to_date) : createDateNow()]
        },
    }
    if(!from_date){
        delete where.createdAt
    }
    if(!total_amount){
        delete where.total_amount
    }
    if(!request_lifter_user_name && !payeer_user_name){
        delete where.user_username
    }
    if(!request_lifter_user_id && !payeer_user_id){
        delete where.user_id
    }
    var get_my_payments;
    try{
        get_my_payments = await InvoicesTable.findAll({
            where:where,
            logging:false,
            order:[
                ["id", "DESC"]
            ],
            offset:Number(from),
            limit:Number(limit),
        })
    } catch(err){
        logger.write_error(err, route_code.server_dashbord + 4)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(4)))
    }
    return res.send(get_my_payments.map(value => value.get()))
})

server_dashbord.post("/server_donations", async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {
        donater_user_id,
        donater_user_name,
        amount,
        from_date,
        to_date,
    } = req.body
    const target_server_id = req.query.server_id
    if(!target_server_id){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    const {from} = req.query
    let limit = req.query.limit || 2
    const UserServer = isUserHaveTheServer(req, res,target_server_id as string)
    if(!UserServer.isOwend){
        return res.send(error_handler.create_json_api_msg("invalid permission"))
    }
    if(isNaN(Number(from)) || isNaN(Number(limit))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(Number(limit) > 6){
        return res.send(error_handler.create_json_api_msg("invalid max number"))
    }
    if(isNaN(Number(from))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    const where:any = {
        amount:amount,
        sender_username:donater_user_name,
        sender_user_id:donater_user_id,
        createdAt:{
            [Op.between]:[createDate(from_date), to_date ? createDate(to_date) : createDateNow()]
        },
    }
    if(!amount){
        delete where.amount
    }
    if(!donater_user_name){
        delete where.sender_username
    }
    if(!donater_user_id){
        delete where.sender_user_id
    }
    if(!from_date){
        delete where.createdAt
    }
    var get_donations;
    try{
        get_donations = await DonationsTable.findAll({
            where:{
                ...where,
                resiver_server_or_user_id:`s${target_server_id}`,
            } as DB_DonationsTable,
            logging:false,
            order:[
                ["id", "DESC"]
            ],
            offset:Number(from),
            limit:Number(limit),
        })
    } catch(err){
        logger.write_error(err, route_code.server_dashbord + 5)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(5)))
    }
    const server_Donation:DB_DonationsTable[] = get_donations.map(value => value.get())
    res.send(server_Donation)
})

export default server_dashbord
