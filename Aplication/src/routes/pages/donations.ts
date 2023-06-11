import {Router, Request, Response, NextFunction} from "express"
import { auth_secure_no_random } from "../../functions/YoFi_Crypto"
import { DonationsTable, ServerStsusEnums, ServersTable, UsersTable } from "../../tables"
import { DB_DonationsTable, DB_ProductsWithSection, DB_ServersTable, DB_UsersTable } from "../../types"
import { YoFi_PayPalClient } from "../../handler/paypal"
import { Item } from "@paypal/checkout-server-sdk/lib/orders/lib"
import { client, server_error_msg, server_error_object } from "../../handler/runner"
import { route_code, send_emergency_erorr } from "../../functions"
import { Send_err_msg, unknown_problem } from "./error_page"
import { chacke_aggred_terms, chacke_aggred_terms_api, is_discord_login } from "../../middlewares/auth"
import { HTTPLogs } from "../../handler/logs"
import { Funcs } from "../../functions/class"
const donations = Router()

donations.use((req:Request, res:Response, next:NextFunction) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.cookie("path", `/don/${req.path}${req.query.id ? `?id=${req.query.id}` : ""}`, {
            httpOnly: true
        })
        res.redirect("/discord")
    }
})

donations.get("/", chacke_aggred_terms, (req, res) => {
    res.render("donations")
})

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.donation, code)
}


donations.get("/servers",chacke_aggred_terms, async(req, res) => {
    // done

    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {id} = req.query
    if(!id || typeof id != "string"){
        return res.redirect("/")
    }
    var server_id
    var avatarURL
    var server_name
    try{
        const finalDcrypt =  await auth_secure_no_random.viewMistry(id);
        [server_id, avatarURL, server_name] = finalDcrypt.split("|-/-|")
    } catch(err){
        logger.write_error(err, route_code.donation + 1)
        return await error_handler.redirect(p_unknown_problem(1))
    }
    var getServer
    try{
        getServer = await ServersTable.findOne({
            where:{
                server_id:server_id
            } as DB_ServersTable,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.donation + 2)
        return await error_handler.redirect(p_unknown_problem(2))
    }
    var discord_server
    try{
        discord_server = await client.guilds.fetch(server_id)
    } catch(err){
        return await error_handler.redirect("unknoun server")
    }
    if(!getServer){
        return res.redirect("/")
    }
    const ServerDB:DB_ServersTable = getServer.get()
    if(ServerDB.status == ServerStsusEnums.Ban){
        return res.render("ban_server", {
            server_name:ServerDB.server_name
        })
    }
    req.session.donations = {
        target_user_or_server:{...ServerDB, owner_id:discord_server.ownerId},
    }
    res.render("donations", {
        store_email:ServerDB.pay_pal_email,
        our_email:process.env.PAY_PAL_ACOUNT_EMAIL,
        avatar_url:avatarURL,
        target_name:server_name,
        don_type:"servers",
        client_id:process.env.PAY_PAL_CLIENT_ID,
        redirect:"server",
    })
})

donations.get("/users",chacke_aggred_terms, async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {id} = req.query
    if(!id || typeof id != "string"){
        return res.redirect("/")
    }
    var user_id
    var avatarURL
    var targe_user_username
    try{
        const finalDcrypt =  await auth_secure_no_random.viewMistry(id);
        [user_id, avatarURL, targe_user_username] = finalDcrypt.split("|-/-|")
    } catch(err){
        logger.write_error(err, route_code.donation + 4)
        return await error_handler.redirect(p_unknown_problem(4))
    }
    var getUser
    try{
        getUser =await UsersTable.findOne({
            where:{
                user_id:user_id
            } as DB_UsersTable,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.donation + 5)
        return await error_handler.redirect(p_unknown_problem(5))
    }
    if(!getUser){
        return res.redirect("/")
    }
    const userDB:DB_UsersTable = getUser.get()
    req.session.donations = {
        target_user_or_server:userDB,
    }
    res.render("donations", {
        store_email:userDB.pay_pal_email,
        our_email:process.env.PAY_PAL_ACOUNT_EMAIL,
        avatar_url:avatarURL,
        target_name:targe_user_username,
        don_type:"users",
        redirect:id,
        client_id:process.env.PAY_PAL_CLIENT_ID
    })
})

const createOrder = async(req:Request, res:Response, type: "server" | "user") => {
    // done
    const {amount} = req.body
    const error_handler = new Send_err_msg(req, res)
    if(!amount || isNaN(Number(amount))){
        req.session.api_err_msg = "the amount must be a number"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    const paypal_requst = await YoFi_PayPalClient.sendMony({
        email:req.session.donations!.target_user_or_server.pay_pal_email!,
        sender_user_id:(req.user as any).id,
        amount:amount,
        resiver_user_id:type == "server" ?
        (req.session.donations?.target_user_or_server as DB_ServersTable).server_id :
        (req.session.donations?.target_user_or_server as DB_UsersTable).user_id
    })
    return res.send(paypal_requst)
}

donations.post("/create_oreder/servers", chacke_aggred_terms_api, async(req, res) =>{
    // done
    await createOrder(req, res, "server")
})

donations.post("/create_oreder/users", chacke_aggred_terms_api, async(req, res) =>{
    // done
    await createOrder(req, res, "user")
})

donations.post("/check_out", chacke_aggred_terms_api, async(req, res) =>{
    // done
    const logger = new HTTPLogs(req, res)
    const {path, target_name} = req.query
    const {orderID} = req.body as {orderID:string}
    const error_handler = new Send_err_msg(req, res)
    if(!path || !target_name || !orderID){
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    if(!req.session.donations?.target_user_or_server){
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    var order_data:{
        server_id: string | null;
        user_id: string | null;
        logs_channel_id: string | null;
        created_at: string | null;
        total:number | null
    } = {
        logs_channel_id:null,
        server_id:null,
        user_id:null,
        created_at:null,
        total:null
    }
    try{
        const invoiceData = await YoFi_PayPalClient.get_ivcoice_by_order_id({
            orderID:orderID as string
        })
        order_data.logs_channel_id = invoiceData.logs_channel_id
        order_data.server_id = invoiceData.server_id
        order_data.user_id = invoiceData.user_id
        order_data.created_at = invoiceData.created_at
        order_data.total = YoFi_PayPalClient.getPrsent(invoiceData.total, YoFi_PayPalClient.our_prcent.donation).them
    } catch(err){
        logger.write_error({
            yofiMsg:"connote get order id",
            error:err
        }, 0)
        req.session.api_err_msg = "there is no order"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    if(!order_data.server_id || !order_data.user_id){
        logger.write_error({
            yofiMsg:"order data in donations dose not have data",
        }, 0)
        req.session.api_err_msg = p_unknown_problem(6)
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    try{
        await DonationsTable.create({
            invoice_id:`in_${orderID}`,
            resiver_server_or_user_id:`${path == "servers" ? "s" : "u"}${order_data.server_id!}`,
            sender_user_id:order_data.user_id as string,
            amount:order_data.total,
            sender_username:(req.user as any).username,
            resiver_server_or_user_name:`${path == "servers" ? "s" : "u"}${target_name}`,
            createdAt:new Date(order_data.created_at!)
        } as DB_DonationsTable, {logging:false})
    } catch(err){
        logger.write_error(err, route_code.donation + 7)
        req.session.api_err_msg = p_unknown_problem(7)
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    var paypal_exe_checkOut
    try{
        paypal_exe_checkOut = await YoFi_PayPalClient.create_checkOut({id:orderID})
    } catch(err){
        logger.write_error({
            yofiMsg:"connot create donation payment",
            error:err
        }, 0)
        try{
            await DonationsTable.destroy({
                where:{
                    invoice_id:`in_${orderID}`
                } as DB_DonationsTable,
                logging:false
            })
        } catch(err){
            logger.write_error({
                yofiMsg:"payment fild but not distoroid in the database",
                error:err
            }, 0)
            var is_it_server = (req.session.donations.target_user_or_server as DB_ServersTable).server_name ? true : false
            var discord_server = is_it_server ? (req.session.donations.target_user_or_server) : {}
            try{
                send_emergency_erorr({
                    buyer_user_id:(req.user as any).id,
                    buyer_user_name:(req.user as any).username,
                    requster_user_id:(req.user as any).id,
                    type:"donation",
                    invoice_id:`in_${orderID}`,
                    user_tag:(req.user as any).discriminator,
                    server_id:is_it_server ? (discord_server as DB_ServersTable & {owner_id:string}).server_id : "no server its user to user donation",
                    owner_id: is_it_server ?(discord_server as DB_ServersTable & {owner_id:string}).owner_id : order_data.server_id,
                    server_name: is_it_server ? (discord_server as DB_ServersTable & {owner_id:string}).server_name : "no server its user to user donation"
                })
            } catch(err){
                logger.write_error({
                    yofiMsg:"delete the record now !! form the database from table donations with order_id: " + `in_${orderID}`
                }, 10)
                req.session.api_err_msg = "you need take a screenshot of this page and to contact us immediately !!"
                return res.send(error_handler.create_json_fixed_api_msg())
            }
            logger.write_error(err, route_code.donation + 8)
            req.session.api_err_msg = p_unknown_problem(8)
            return res.send(error_handler.create_json_fixed_api_msg())
        }
        req.session.api_err_msg = "this payment cannot be completed check that you add your valid Paypal email"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    req.session.payment_done = true
    res.send(paypal_exe_checkOut)
})

donations.get("/done", async(req, res) => {
    const error_handler = new Send_err_msg(req, res)
    const logger = new HTTPLogs(req, res)
    if(!req.session.donations || !req.session.payment_done || !req.session.donations?.target_user_or_server){
        return res.redirect("/")
    }
    const {id} = req.query
    if(id != "server"){
        if(typeof id != "string"){
            return res.redirect("/")
        }
        var user_id
        var avatarURL
        var targe_user_username
        try{
            const finalDcrypt =  await auth_secure_no_random.viewMistry(id);
            [user_id, avatarURL, targe_user_username] = finalDcrypt.split("|-/-|")
        } catch(err){
            logger.write_error(err, route_code.donation + 11)
            return await error_handler.redirect(p_unknown_problem(11))
        }
        delete req.session.donations
        delete req.session.payment_done
        delete req.session.donations
        res.render("donation_done", {
            server_name:targe_user_username,
            username:(req.user as any).username,
        })
    } else {
        const target_user_or_server = req.session.donations!.target_user_or_server as DB_ServersTable
        delete req.session.donations
        delete req.session.payment_done
        delete req.session.donations
        res.render("donation_done", {
            server_name:target_user_or_server.server_name,
            username:(req.user as any).username,
        })
    }
})

donations.get("/api_err", async(req, res) => {
    if(!req.session.donations?.target_user_or_server || !req.session.api_err_msg){
        return res.redirect("/")
    }
    const error_handler = new Send_err_msg(req, res)
    const msg = req.session.api_err_msg
    delete req.session.api_err_msg
    if(msg == "go_home"){
        res.redirect("/")
        return
    }
    if(msg == "terms"){
        res.redirect("aggree_terms")
        return
    }
    return await error_handler.redirect(msg)
})

export default donations