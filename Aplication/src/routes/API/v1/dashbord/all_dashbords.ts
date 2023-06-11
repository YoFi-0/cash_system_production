import {Router} from "express"
import { chacke_aggred_terms_api, check_csrf_tocken, is_discord_login } from "../../../../middlewares/auth"
import { DonationsTable, InvoicesTable, SectionTable, ServersTable, UsersTable } from "../../../../tables"
import { HasMany, HasOne, where, Op } from "sequelize"
import { DB_DonationsTable, DB_Invoices, DB_SectionType, DB_ServersTable, DB_UsersTable } from "../../../../types"
import { YoFi_PayPalClient } from "../../../../handler/paypal"
import { isUserHaveTheServer } from "./server_dashbord"
import { server_error_msg, server_error_object } from "../../../../handler/runner"
import { Send_err_msg, unknown_problem } from "../../../pages/error_page"
import { route_code } from "../../../../functions"
import { HTTPLogs } from "../../../../handler/logs"
export const createDate  = (stringDate:string) => new Date(stringDate)
export const createDateNow = () => new Date()
const all_dashbords = Router()

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.all_dashbords, code)
}


all_dashbords.use(chacke_aggred_terms_api)

all_dashbords.get("/get_all_owned_servers_id", is_discord_login , async(req, res) => {
    // done
    const discord_data = req.user as any
    const formated_owned_user_servers = []
    for(let server of discord_data.guilds){
        if(server.owner){
            formated_owned_user_servers.push({
                server_id:server.id,
                server_icon: server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}` : "/images/store.jpg"
            })
        }
    }

    res.send({
        user_owned_servers:formated_owned_user_servers
    })
})

all_dashbords.get("/get_user_data", is_discord_login , async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const sesstion_discord_user_id = (req.user as any).id
    const discord_data = req.user as any
    var get_user_data;
    try{
        get_user_data = await UsersTable.findOne({
            attributes:["pay_pal_email"],
            where:{
                user_id:sesstion_discord_user_id,
                id:req.session.login_data?.id
            } as DB_UsersTable,
            logging:false
        })
    } catch(err){
        logger.write_error(err,route_code.all_dashbords + 1)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(1)))
    }

    if(!get_user_data){
        logger.write_error("user get to route /get_user_data with out login", route_code.all_dashbords + 4)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(4)))
    }
    const user_data:DB_UsersTable = get_user_data?.get()
    res.send({
        discord_user_id:sesstion_discord_user_id,
        username:discord_data.username,
        tag:discord_data.discriminator,
        user_image:`https://cdn.discordapp.com/avatars/${sesstion_discord_user_id}/${discord_data.avatar}`,
        pay_pal_email:user_data.pay_pal_email,
    })
})

all_dashbords.use(check_csrf_tocken)

all_dashbords.post("/invoice_payment_product_logs", is_discord_login, async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const invoiceId = req.query.invoice
    const server_id = req.query.server_id
    const sesstion_discord_user_id = (req.user as any).id
    if(!invoiceId || typeof invoiceId != "string"){
        return res.send(error_handler.create_json_api_msg("invalid params"))
    }
    var isUserHaveServer
    if(server_id){
        isUserHaveServer = isUserHaveTheServer(req, res, server_id as string)
        if(!isUserHaveServer.isOwend){
            return res.send(error_handler.create_json_api_msg("invalid permetion"))
        }
    }
    const where = isUserHaveServer?.isOwend ? {
        server_id:server_id,
        invoice_id:invoiceId
    } as DB_Invoices : {
        user_id:{
            [Op.like]:`%${sesstion_discord_user_id}%`
        },
        invoice_id:invoiceId
    }
    var get_my_payments;
    try{
        get_my_payments = await InvoicesTable.findOne({
            where:where,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.all_dashbords + 2)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(2)))
    }

    if(!get_my_payments){
        return res.send([])
    }
    const invoice:DB_Invoices = get_my_payments.get()
    var pay_pal_invoice_data;
    try{
        pay_pal_invoice_data = await YoFi_PayPalClient.get_ivcoice_by_order_id({
            orderID:invoice.invoice_id.replace("in_", "")
        })
    } catch(err){
        logger.write_error(err, route_code.all_dashbords + 3)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(3)))
    }

    res.send(pay_pal_invoice_data.products)
})



export default all_dashbords