//out script [in lansher]
import express, { Router } from "express"
import discord from 'discord.js'
import discordModals from "discord-modals";
import intents from "./intents";
import {connection} from "../connections";
import { RoutesType, allRoutes } from "./routes_arr"
import stripe from "./stripe"
import https from "https"



import {promisify} from 'util'
import {Event} from './events'
import fs from 'fs'
import path from 'path'
import { CommandType, CustmIdFunctionOptions, Custom_idType, DB_Bascit, DB_ServersTable, DB_UsersTable, RegisterCommandsOptionsType, RunOptions } from "../types";
import { APPLAY_HTTP_CONFIG, isDevelopment, server_port } from "./http_config";
import { YoFi_PayPalClient } from "./paypal";
import { Programlogs } from "./logs";
//out script [in lansher]

process.on("uncaughtException" , (err) => {
    // Programlogs.write_error(err)
    if(process.env.PRODUCTION != "true"){
        console.log(err)
    }
})

export const server_error_msg = "server error"
export const server_error_object = {
    error:"server error"
}
const ssl_config = {
    ssl_files_path:`C:/Certbot/archive/${process.env.DOMAIN}`,
    privte_key_failename:"privkey1.pem",
    cert_filename:"fullchain1.pem"
}
const httpServer = express()

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const getJSTSFileFrom = async(filesPath:string) => {
    return (await readdir(path.join(__dirname, `../${filesPath}`))).map(file => {
        if(file.endsWith('.js') || file.endsWith('.ts')){
            return `../${filesPath}/${file}`.replace('.ts', '').replace('.js', '')
        }
    })
}



const createRoute = async(obj:RoutesType[], ) =>{
    for(let route of obj){
        if(!route.routeName.startsWith("/")){
            throw new Error("every rout must start with (/)")
        }
        const fileType = route.type == "Page" ? "pages" : "API"
        const router:Router = await client.importFile(path.join(__dirname, `../routes/${fileType}/${route.path}.${__filename.split(".")[1]}`))
        httpServer.use(`${route.type == "Page" ? "" : "/Api"}${route.routeName}`, router)
    }
}





export class Bot  extends discord.Client{
    commands: discord.Collection<string, CommandType> = new discord.Collection();
    constructor(){
        super({
            intents: intents
        })
    }

    public async start() {
        // await BascitTaple.destroy({
        //     where:{
        //         user_id:'1034167607995154493'
        //     }
        // })
        // await InvoicesTable.destroy({
        //     where:{
        //         user_id:'1034167607995154493'
        //     }
        // })
        // const isValidPayPalApiKey = await  paypal.auth()
        // if(!isValidPayPalApiKey){
        //     console.log('error in paypal')
        //     return
        // }
        // console.log('paypal authenticated')
        // const invoice = await paypal.createInvice({
        //     email:'lolo@lolo.com',
        //     itmes:[
        //         {
        //             name:'mama',
        //             quantity:'2',
        //             unit_amount:{
        //                 value:'5',
        //                 currency_code:'USD'
        //             },
        //             tax: {
        //                 name: "Sales Tax",
        //                 percent: "10",
        //             },
        //         } as any
        //     ],
        //     user_id:'123456789'
        // })
        // const invoice2 = await paypal.getInvoiceById(invoice.invoic_id)
        try{
            await connection.sync({
                logging:false,
                force:false,
            })
            console.log('[✅] database OK')
        } catch(err){
            console.log(err)
            console.log('[⛔] database err')
            return
        }
        try{
            await stripe.plans.list()
            console.log("[✅] stripe Ok")
        } catch(err){
            console.log(err)
            console.log("[⛔] stripe error")
            return
        }
        discordModals(this);
        await this.injectEveryThing();
        await this.login(process.env.BOT_TOKEN);
        
       
        if(await YoFi_PayPalClient.auth()){
            console.log("[✅] Paypal api Ok")
        } else {
            console.log("[⛔] Paypal api err")
        }
        console.log('[✅] Aplication started')
    }
    public async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    private async addCommands({commands}:RegisterCommandsOptionsType){
        await this.application!.commands.set(commands)
    }

    private async injectEveryThing(){
        const slashCommands: discord.ApplicationCommandDataResolvable[] = [];
        const commands =  await getJSTSFileFrom('commands');
        commands.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath!);
            if (!command.name){
                return
            };
            this.commands.set(command.name, command);
            slashCommands.push(command);
        })
        this.on("ready", async() => {
            try{
                await this.addCommands({
                    commands: slashCommands,
                });
                console.log('[✅] command adedd')
            } catch(err){
                console.log(err)
                console.log('[⛔] command dosn\'et add adedd')
            }
            // const cert = await readFile(path.join(ssl_config.ssl_files_path, ssl_config.cert_filename))
            // const privte_key = await readFile(path.join(ssl_config.ssl_files_path, ssl_config.privte_key_failename))
            // const https_Server = https.createServer({
            //     key:privte_key,
            //     cert:cert
            // }, httpServer)
            httpServer.listen(server_port, async() => {
                
                console.log(`[✅] https server is on in port => ${server_port}`)
            })
        })
        const events =  await getJSTSFileFrom('events');
        events.forEach(async (filePath) => {
            const event: Event<keyof discord.ClientEvents> = await this.importFile(
                filePath!
            );
            this.on(event.event, event.run);
        })

        const custm_id =  await getJSTSFileFrom('custm_id');
        
        this.on('interactionCreate', async(interaction:any) => {
            if(custm_id.includes(`../custm_id/${interaction.customId}`)){
                const id:Custom_idType = await this.importFile(custm_id[custm_id.indexOf(`../custm_id/${interaction.customId}`)]!);
                if((interaction.customId == id.id)){
                    const params:CustmIdFunctionOptions = {
                        client:this,
                        interaction:interaction as discord.ButtonInteraction<discord.CacheType>,
                    }
                    id.run(params)
                }
            }
        })
    }
}


declare module 'express-session' {
    interface SessionData {
        payment_done:boolean
        is_error:boolean
        api_err_msg:string
        CSRF_token:string
        is_not_agrred_terms_user:boolean
        login_data:{
            id:number
        }
        user_bascket:DB_Bascit,
        target_server:DB_ServersTable
        donations:{
            target_user_or_server:DB_UsersTable | (DB_ServersTable & {owner_id:string}),
        }
    }
}




export const client = new Bot()


const main = async() => {
    console.log(`${isDevelopment ? "[👷👷👷] devlopment mode" : "[🆗🆗🆗] production mode"}`)
    APPLAY_HTTP_CONFIG(httpServer)
    await createRoute(allRoutes)
    httpServer.all(/([A-z]|[0-9])/g, (req, res) => {
        res.render("index")
    })
    await client.start()
    // await send_emergency_erorr({
    //     buyer_user_id:"916478096675307571",
    //     buyer_user_name:"soso",
    //     invoice_id:"invoice",
    //     owner_id:"797425316758159360",
    //     server_id:"797428943534686249",
    //     server_name:"lala",
    //     user_tag:"185187",
    //     requster_user_id:"562570652700377099",
    //     type:"donation"
    // })
    // for(let i = 0; i < 50; i ++){
    //     await ServersTable.create({
    //         disc:`this is server number ${i}`,
    //         lang:"Arabic",
    //         logs_channel:"123456789" + i,
    //         our_user_id:1,
    //         pay_pal_email:"lala@lala.com" + i,
    //         products_mangers:"[\"\"]",
    //         rate:2.5,
    //         server_id:"123558" + i,
    //         server_name:"server num" + i,
    //         invite_link:"https://google.com",
    //     } as DB_ServersTable)
    // }
}
main()






