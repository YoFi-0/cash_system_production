import {Router} from "express"
import { chacke_aggred_terms_api, check_csrf_tocken, is_discord_login } from "../../../../middlewares/auth"
import { DonationsTable, InvoicesTable, UsersTable } from "../../../../tables"
import { HasMany, HasOne, where, Op, DATE } from "sequelize"
import { DB_DonationsTable, DB_UsersTable } from "../../../../types"
import { YoFi_PayPalClient } from "../../../../handler/paypal"
import { createDate, createDateNow } from "./all_dashbords"
import { server_error_msg, server_error_object } from "../../../../handler/runner"
import { inputsFillter, route_code } from "../../../../functions"
import { Send_err_msg, unknown_problem } from "../../../pages/error_page"
import { auth_secure } from "../../../../functions/YoFi_Crypto"
import { HTTPLogs } from "../../../../handler/logs"
const user_dashbord = Router()
user_dashbord.use(chacke_aggred_terms_api)
user_dashbord.use(is_discord_login)
const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.user_dashbord, code)
}


user_dashbord.get("/render_log" , async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const sesstion_discord_user_id = (req.user as any).id
    var get_donations;
    var get_my_payments;
    try{
        get_donations = await DonationsTable.findAll({
            where:{
                [Op.or]:[
                    {
                        sender_user_id:sesstion_discord_user_id
                    },
                    {
                        resiver_server_or_user_id:`u${sesstion_discord_user_id}`,
                    },
                    {
                        resiver_server_or_user_id:"%s%",
                        sender_user_id:sesstion_discord_user_id
                    }
                ]
            },
            order:[
                ["id", "DESC"]
            ],
            limit:6,
            logging:false
        })
        get_my_payments = await InvoicesTable.findAll({
            where:{
                [Op.or]:[
                    {user_id:{
                        [Op.like]:`%${sesstion_discord_user_id}--88--%`
                    }},
                    {user_id:{
                        [Op.like]:`%--88--${sesstion_discord_user_id}%`
                    }}
                ]
            },
            order:[
                ["id", "DESC"]
            ],
            limit:6,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.user_dashbord + 1)
        res.send(error_handler.create_json_api_msg(p_unknown_problem(1)))
        return
    }

    const server_Donation:DB_DonationsTable[] = []
    const privte_Donation:DB_DonationsTable[] = []
    for(let value of get_donations){
        const recurd:DB_DonationsTable = value.get()
        if(recurd.resiver_server_or_user_id[0] == "s"){
            server_Donation.push(recurd)
            continue;
        }
        if(recurd.resiver_server_or_user_id[0] == "u"){
            privte_Donation.push(recurd)
            continue;
        }
    }
    const created_csrf_tocket = auth_secure.createRandomLang(100)
    req.session.CSRF_token = created_csrf_tocket
    res.send({
        servers_donations:server_Donation,
        privte_donations:privte_Donation,
        try:created_csrf_tocket,
        my_payments:get_my_payments.map(value => value.get()),
    })
})

user_dashbord.use(check_csrf_tocken)

user_dashbord.post("/create_config", async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const {pay_pal_email} = req.body
    if(!pay_pal_email || typeof pay_pal_email != "string"){
        res.send("missing fields")
        return
    }
    const isValidEmail  = inputsFillter({
        email:pay_pal_email,
        lang:"en"
    })
    if(!isValidEmail.test){
        res.send("Inavlid Email")
        return
    }
    try{
        await UsersTable.update({
            pay_pal_email:pay_pal_email
        } as DB_UsersTable, {where:{
            id:req.session.login_data?.id
        } as DB_UsersTable, logging:false})
    } catch(err){
        logger.write_error({
            yofiMsg:"create paypal email error",
            error:err
        }, 0)
        return res.send(server_error_msg)
    }
    res.send("paypal updated")
})

user_dashbord.post("/private_donations", async(req, res) => {
    //done
    const logger = new HTTPLogs(req, res)
    const error_handler =  new Send_err_msg(req, res)
    const {
        donater_user_id,
        donater_user_name,
        donated_user_id,
        donated_user_name,
        amount,
        donationType,
        from_date,
        to_date
    } = req.body
    const sesstion_discord_user_id = (req.user as any).id
    const {from} = req.query
    const target_don = "u"
    let limit = req.query.limit || 2
    if(isNaN(Number(from)) || isNaN(Number(limit))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(Number(limit) > 6){
        return res.send(error_handler.create_json_api_msg("invalid max number"))
    }
    const user_id_where = {
        [Op.or]:[
            {
                sender_user_id:donated_user_id ? sesstion_discord_user_id : donater_user_id || sesstion_discord_user_id,
                resiver_server_or_user_id:{
                    [Op.like]:`%${target_don}%`
                }
            },
            {resiver_server_or_user_id: `${target_don}${donater_user_id ? sesstion_discord_user_id : donated_user_id || sesstion_discord_user_id}`}, // <== add evrey thing here
        ],
    }
    const isItFromWho = donationType == "from_me" ? {
        sender_user_id:sesstion_discord_user_id
    } : donationType == "to_me" ? {
        resiver_server_or_user_id:`${target_don}${sesstion_discord_user_id}`
    } : user_id_where
    const where:any = {
        ...isItFromWho,
        sender_username:donater_user_name,
        resiver_server_or_user_name:`${target_don}${donated_user_name}`,
        amount:amount,
        createdAt:{
            [Op.between]:[createDate(from_date), to_date ? createDate(to_date) : createDateNow()]
        }
    }
    if(!donater_user_name){
        delete where.sender_username
    }
    if(!donated_user_name){
        delete where.resiver_server_or_user_name
    }
    if(!amount){
        delete where.amount
    }
    if(!from_date){
        delete where.createdAt
    }
    var get_donations
    try{
        get_donations = await DonationsTable.findAll({
            where:where,
            order:[
                ["id", "DESC"]
            ],
            offset:Number(from),
            limit:Number(limit),
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.user_dashbord + 2)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(2)))
    }


    const private_donations:DB_DonationsTable[] = []
    for(let value of get_donations){
        const recurd:DB_DonationsTable = value.get()
        if(recurd.resiver_server_or_user_id[0] == target_don){
            private_donations.push(recurd)
            continue;
        }
    }
    res.send(private_donations)
})

user_dashbord.post("/server_donations", async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {
        donated_server_id,
        donated_server_name,
        amount,
        from_date,
        to_date
    } = req.body
    const sesstion_discord_user_id = (req.user as any).id
    const {from} = req.query
    const target_don = "s"
    let limit = req.query.limit || 2
    if(isNaN(Number(from)) || isNaN(Number(limit))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(Number(limit) > 6){
        return res.send(error_handler.create_json_api_msg("invalid max number"))
    }
    const where:any = {
        sender_user_id:sesstion_discord_user_id,
        resiver_server_or_user_id:donated_server_id ? `${target_don}${donated_server_id}` : {
            [Op.like]:`%${target_don}%`
        },
        resiver_server_or_user_name:`${target_don}${donated_server_name}`,
        amount:amount,
        createdAt:{
            [Op.between]:[createDate(from_date), to_date ? createDate(to_date) : createDateNow()]
        }
    }
    if(!donated_server_name){
        delete where.resiver_server_or_user_name
    }
    if(!amount){
        delete where.amount
    }
    if(!from_date){
        delete where.createdAt
    }
    var get_donations;
    try{
        get_donations = await DonationsTable.findAll({
            where:where,
            order:[
                ["id", "DESC"]
            ],
            offset:Number(from),
            limit:Number(limit),
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.user_dashbord + 3)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(3)))
    }


    const server_Donation:DB_DonationsTable[] = []
    for(let value of get_donations){
        const recurd:DB_DonationsTable = value.get()
        if(recurd.resiver_server_or_user_id[0] == target_don){
            server_Donation.push(recurd)
            continue;
        }
    }
    res.send(server_Donation)
})

user_dashbord.post("/store_payments", async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {
            request_lifter_user_id,
            request_lifter_user_name,
            payeer_user_id,
            payeer_user_name,
            store_server_id,
            store_server_name,
            total_amount,
            from_date,
            to_date
        } = req.body
    const {from} = req.query
    let limit = req.query.limit || 2
    const sesstion_discord_user_id = (req.user as any).id
    if(isNaN(Number(from)) || isNaN(Number(limit))){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    if(Number(limit) > 6){
        return res.send(error_handler.create_json_api_msg("invalid max number"))
    }
    const user_id_where = request_lifter_user_id ? {
        user_id:{
            [Op.like]:`%${request_lifter_user_id}--88--${sesstion_discord_user_id}%`
        }
    } : payeer_user_id ? {
        user_id:{
            [Op.like]:`%${sesstion_discord_user_id}--88--${payeer_user_id}%`
        }
    } : {
        [Op.or]:[
            {user_id:{
                [Op.like]:`%${sesstion_discord_user_id}--88--%`
            }},
            {user_id:{
                [Op.like]:`%--88--${sesstion_discord_user_id}%`
            }}
        ]
    }
    const where:any = {
        ...user_id_where,
        user_username:payeer_user_name && request_lifter_user_name ? 
        `${request_lifter_user_name}--88--${payeer_user_name}` : {
            [Op.like]:request_lifter_user_name ? `%${request_lifter_user_name}--88--%` : `%--88--${payeer_user_name}%`
        },
        server_name:store_server_name,
        server_id:store_server_id,
        total_amount:total_amount,
        createdAt:{
            [Op.between]:[createDate(from_date), to_date ? createDate(to_date) : createDateNow()]
        },
    }
    if(!store_server_id){
        delete where.server_id
    }
    if(!payeer_user_name && !request_lifter_user_name){
        delete where.user_username
    }
    if(!store_server_name){
        delete where.server_name
    }
    if(!total_amount){
        delete where.total_amount
    }
    if(!from_date){
        delete  where.createdAt
    }
    var get_my_payments;
    try{
        get_my_payments = await InvoicesTable.findAll({
            where:where,
            order:[
                ["id", "DESC"]
            ],
            offset:Number(from),
            limit:Number(limit),
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.user_dashbord + 4)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(4)))
    }

    res.send(get_my_payments.map(value => value.get()))
})



export default user_dashbord