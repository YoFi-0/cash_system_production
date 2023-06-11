import {NextFunction, Request, Response, Router} from "express"
import { chacke_aggred_terms, chacke_aggred_terms_api, is_discord_login } from "../../../middlewares/auth"
import { DB_Bascit, DB_Invoices, DB_ServersTable, DB_UsersTable, EnumLoginPath, PaypalItme, productInBascitType } from "../../../types"
import axios from "axios"
import discord, { TextBasedChannel } from "discord.js"
import paypalLib from "@paypal/checkout-server-sdk"
import { isDevelopment } from "../../../handler/http_config"
import { YoFi_PayPalClient, payPalClient } from "../../../handler/paypal"
import { BascitTaple, InvoicesTable, ServerStsusEnums, ServersTable, UsersTable } from "../../../tables"
import { _$, route_code, send_emergency_erorr } from "../../../functions"
import { client, server_error_msg, server_error_object } from "../../../handler/runner"
import Crypto from "crypto"
import { Item } from "@paypal/checkout-server-sdk/lib/orders/lib"
import { auth_secure_no_random, error_encoder } from "../../../functions/YoFi_Crypto"
import { Send_err_msg, unknown_problem } from "../error_page"
import { HTTPLogs } from "../../../handler/logs"

const paypal = Router()
const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.paypal, code)
}

paypal.use((req:Request, res:Response, next:NextFunction) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.cookie("path", `/invoice/${req.path}${req.query.id && req.query.a ? `?id=${req.query.id}&a=${req.query.a}` : ""}`, {
            httpOnly: true
        })
        res.redirect("/discord")
    }
})

paypal.get("/payment", chacke_aggred_terms, async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    const {id, a} = req.query
    var getUserBasket
    var getServerData
    if(!a || typeof a != "string" || !id || typeof id != "string"){
        return res.redirect("/")
    }
    const avatarurls = a
    var getUser;
    try{
        getUserBasket = await BascitTaple.findOne({
            where:{
                payment_path:id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.paypal + 1)
        await error_handler.redirect(p_unknown_problem(1))
        return
    }
    if(!getUserBasket){
        res.redirect("/")
        return
    }
    
    const userBasketDB:DB_Bascit = getUserBasket.get()


    const userBasket:productInBascitType[] = JSON.parse(userBasketDB.products)

    try{
        getServerData = await ServersTable.findOne({
            where:{
                server_id:userBasketDB.server_id
            } as DB_ServersTable,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.paypal + 2)
        await error_handler.redirect(p_unknown_problem(2))
        return
    }
    if(!getServerData){
        await error_handler.redirect("this server does not have a store !!")
        return
    }

    const serverData:DB_ServersTable = getServerData.get()
    if(serverData.status == ServerStsusEnums.Ban){
        try{
            getUserBasket = await BascitTaple.destroy({
                where:{
                    payment_path:id
                } as DB_Bascit,
                logging:false
            })
        } catch(err){

        }
        return res.render("ban_server", {
            server_name:serverData.server_name
        })
    }
    var server
    var logsChannle
    var user
    try{
        server = await client.guilds.fetch(serverData.server_id)
        logsChannle = await server.channels.fetch(serverData.logs_channel)
        user = await server.members.fetch(userBasketDB.user_id)
        if(!logsChannle || !user){
            return await error_handler.redirect("this server does not have a store !!")
        }
        getUser = await UsersTable.findOne({
            attributes:["status"],
            where:{
                user_id:userBasketDB.user_id,
                status:"ban"
            } as DB_UsersTable
        })
        if(getUser){
            try{
                getUserBasket = await BascitTaple.destroy({
                    where:{
                        payment_path:id
                    } as DB_Bascit,
                    logging:false
                })
            } catch(err){
    
            }
            res.render("ban_user", {
                username:user.user.username
            })
            return
        }
    } catch(err){
        return await error_handler.redirect("this server does not have a store !!")
    }
    


    var user_avatar_url
    var finalAvatarUrl
    try{
        const finalDcrypt =  await auth_secure_no_random.viewMistry(avatarurls as string);
        [user_avatar_url] = finalDcrypt.split("|-/-|")
        finalAvatarUrl = await auth_secure_no_random.createMistry(`${user_avatar_url}|-/-|${server.iconURL() || "no avatar"}}`)
    } catch(err){
        logger.write_error(err, route_code.paypal + 3)
        return await error_handler.redirect(p_unknown_problem(3))
    }
    req.session.user_bascket = userBasketDB
    req.session.target_server = serverData

    res.render("pay", {
        client_id:process.env.PAY_PAL_CLIENT_ID,
        our_email:process.env.PAY_PAL_ACOUNT_EMAIL,
        store_email:serverData.pay_pal_email,
        products:userBasket,
        avatarurls:finalAvatarUrl,
        server_name:server.name,
        user_avatar_url:user_avatar_url,
        server_avatar_url:server.iconURL() || "/images/store.jpg",
        username:user.user.username,
        path_id:id
    })
})


paypal.post("/create-pay",chacke_aggred_terms_api, async(req, res) => {
    // done
    const error_handler = new Send_err_msg(req, res)
    if(!req.session.user_bascket || !req.session.target_server){
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    const userBasketDB:DB_Bascit = req.session.user_bascket
    const userBasket:productInBascitType[] = JSON.parse(userBasketDB.products)

    const serverData:DB_ServersTable = req.session.target_server
    var ramTotal = 0
    const reqItmes:PaypalItme[] = []
    userBasket.forEach(product => {
        ramTotal += product.quantity * product.one_product_price
        reqItmes.push({
            name:product.product_name,
            quantity:`${product.quantity}`,
            category: "DIGITAL_GOODS",
            unit_amount:{
                value:`${product.one_product_price}`,
                currency_code:"USD"
            },
        })
    })

    const paypal_requst = await YoFi_PayPalClient.create_Pay({
        logs_channel_id:serverData.logs_channel,
        server_id:serverData.server_id,
        email:serverData.pay_pal_email,
        itmes:{
            items:reqItmes,
            total:ramTotal
        },
        user_id:userBasketDB.user_id
    })

    return res.send(paypal_requst)
})

paypal.post("/transfare-pay", chacke_aggred_terms_api, async(req, res) => {
    // done
    const logger = new HTTPLogs(req, res)
    const {orderID} = req.body as {orderID:string}
    const error_handler = new Send_err_msg(req, res)
    if(!orderID || typeof orderID != "string"){
        req.session.api_err_msg = "sorry i cant help you"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    var order_data:{
        server_id: string | null;
        user_id: string | null;
        logs_channel_id: string | null;
        created_at: string | null;
        products:Item[] | null
        total:number | null
    } = {
        logs_channel_id:null,
        server_id:null,
        user_id:null,
        created_at:null,
        products:null,
        total:null
    } 
    try{
        const invoiceData = await YoFi_PayPalClient.get_ivcoice_by_order_id({
            orderID:orderID as string
        })
        order_data.logs_channel_id = invoiceData.logs_channel_id
        order_data.server_id = invoiceData.server_id
        order_data.user_id = invoiceData.user_id
        order_data.products = invoiceData.products
        order_data.created_at = invoiceData.created_at
        order_data.total = invoiceData.them_total
    } catch(err){
        req.session.api_err_msg = "there is no order for this payment"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    if(!order_data.logs_channel_id || !order_data.server_id || !order_data.user_id){
        logger.write_error({
            yofiMsg:"orderid dose note have a data"
        }, route_code.paypal + 5)
        req.session.api_err_msg = p_unknown_problem(5)
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    var server
    var user
    var logsChannle
    try{
        server = await client.guilds.fetch(order_data.server_id)
        logsChannle = await server.channels.fetch(order_data.logs_channel_id)
        user = await server.members.fetch(order_data.user_id)
    } catch(err){
        logger.write_error({
            yofiMsg:"there is no server or channel or user",
            error:err
        }, 0)
        req.session.api_err_msg = "the store server must have a logs channel"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    if(!user || !server || !logsChannle || !logsChannle.isTextBased()){
        logger.write_error({
            yofiMsg:"i think ther is no channel logs",
        }, 0)
        req.session.api_err_msg = "the store server must have a logs channel"
        return res.send(error_handler.create_json_fixed_api_msg())
    }

    try{
        await BascitTaple.destroy({
            where:{
                payment_path:req.session.user_bascket!.payment_path
            } as DB_Bascit,
            logging:false
        })
        await InvoicesTable.create({
            invoice_id:`in_${orderID}`,
            server_id:order_data.server_id! as string,
            user_id:`${order_data.user_id}--88--${(req.user as any).id}` as string,
            user_username:`${user.user.username}--88--${(req.user as any).username}`,
            server_name:server.name,
            total_amount:order_data.total,
            createdAt:new Date(order_data.created_at!)
        } as DB_Invoices, {logging:false})
    } catch(err){
        req.session.api_err_msg = p_unknown_problem(6)
        logger.write_error(err, route_code.paypal + 6)
        return res.send(error_handler.create_json_fixed_api_msg())
    }

    var paypal_exe_checkOut
    try{
        paypal_exe_checkOut = await YoFi_PayPalClient.create_checkOut({id:orderID})
    } catch(err){
        logger.write_error({
            yofiMsg:"payment fro a product feild",
            error:err
        }, 0)
        try{
            await InvoicesTable.destroy({
                where:{
                    invoice_id:`in_${orderID}`
                } as DB_Invoices,
                logging:false
            })
        } catch(err){
            logger.write_error({
                yofiMsg:"payment fro a product feild and its not removed from the database",
                error:err
            }, 0)
            try{
                send_emergency_erorr({
                    buyer_user_id:(req.user as any).id,
                    buyer_user_name:(req.user as any).username,
                    invoice_id:`in_${orderID}`,
                    owner_id:server.ownerId,
                    requster_user_id:order_data.user_id,
                    server_id:server.id,
                    server_name:server.name,
                    user_tag:(req.user as any).discriminator,
                    type:"invoice"
                })
            } catch(err){
                logger.write_error({
                    yofiMsg:"delete the record now !! form the database from table invoices with order_id: " + `in_${orderID}`
                }, 10)
                req.session.api_err_msg = "you need take a screenshot of this page and to contact us immediately !!"
                return res.send(error_handler.create_json_fixed_api_msg())
            }
            logger.write_error(err, route_code.paypal + 7)
            req.session.api_err_msg = p_unknown_problem(7)
            return res.send(error_handler.create_json_fixed_api_msg())
        }
        logger.write_error({
            yofiMsg:"payment connet be completed",
            error:err
        }, route_code.paypal + 0)
        req.session.api_err_msg = "this payment cannot be completed check that you add your valid Paypal email"
        return res.send(error_handler.create_json_fixed_api_msg())
    }
    

    try{
        const rplaceDate = (date:Date) => {
            return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00': date.getUTCMinutes()}`
        }
        const congratEmbed = new discord.EmbedBuilder({
            title:_$.custom_id.is_invoice_payed.paidInvoice.embid.title,
            description:`${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.congrat._1} ${user.user.username} ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.congrat._2}
    
    ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.User}: <@${order_data.user_id}>
    
    \`\`\`
    ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.Total_Price}: ${YoFi_PayPalClient.pars_prcent(order_data.total)} USD
    ${!rplaceDate(new Date(order_data.created_at!)).includes('NaN') ? `${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.invoice_created_at}: ${rplaceDate(new Date(order_data.created_at!))} (${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.By_UTC_Time})` : ''}
    \`\`\`
    ***${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.products}***
    \`\`\`
    ${order_data.products!.map(product => {
        return `${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.product_name}: ${product.name}
    ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.quantity}: ${product.quantity}
    ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.single_prodcut_price}: ${product.unit_amount.value}
    ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.total_product_price}: ${YoFi_PayPalClient.pars_prcent(Number(product.quantity) * Number(product.unit_amount.value))}
    
    `
        }).join('\n')}
    \`\`\`
    `
        })
     
        if(user.avatarURL()){
            congratEmbed.setThumbnail(user.avatarURL())
        }
    
        
        await logsChannle!.send({
            embeds:[congratEmbed],
        })
    } catch(err){
        send_emergency_erorr({
            buyer_user_id:(req.user as any).id,
            buyer_user_name:(req.user as any).username,
            invoice_id:`in_${orderID}`,
            owner_id:server.ownerId,
            requster_user_id:order_data.user_id,
            server_id:server.id,
            server_name:server.name,
            user_tag:(req.user as any).discriminator,
            type:"invalid to send msg to server"
        })
    }
    req.session.payment_done = true
    res.send(paypal_exe_checkOut)
})

paypal.get("/done", async(req, res) => {
    const error_handler = new Send_err_msg(req, res)
    if(!req.session.user_bascket || !req.session.target_server || !req.session.payment_done){
        return res.redirect("/")
    }
    var server
    var user
    try{
        server = await client.guilds.fetch(req.session.target_server.server_id)
        user = await server.members.fetch(req.session.user_bascket.user_id)
        if(!user || !server){
            return await error_handler.redirect("this server does not have a store !!")
        }
    } catch(err){
        return await error_handler.redirect("this server does not have a store !!")
    }

    delete req.session.user_bascket
    delete req.session.target_server
    res.render("pay_done", {
        server_name:server.name,
        username:user.user.username,
    })
})

paypal.get("/api_err", async(req, res) => {
    if(!req.session.user_bascket || !req.session.target_server || !req.session.api_err_msg){
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


export default paypal