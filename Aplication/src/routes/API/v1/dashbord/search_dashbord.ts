import {Router} from "express"
import {Op} from "sequelize"
import { chacke_aggred_terms_api, is_discord_login } from "../../../../middlewares/auth"
import { RatesServersTable, ServersTable } from "../../../../tables"
import { DB_RatesServersTable, DB_ServersTable } from "../../../../types"
import { Send_err_msg, unknown_problem } from "../../../pages/error_page"
import { route_code } from "../../../../functions"
import { HTTPLogs } from "../../../../handler/logs"
import { client } from "../../../../handler/runner"
const search_dashbord = Router()

search_dashbord.use(chacke_aggred_terms_api)
search_dashbord.use(is_discord_login)

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.search_dashbord, code)
}


const notNull = {
    // done
    disc:{
        [Op.not]:null
    },
    invite_link:{
        [Op.not]:null
    }
}
const getOrderBy = (searchName?:string):[["rate" | "server_name", "DESC" | "ASC"]] => {
    // done
    if(!searchName){
        return [["rate", "DESC"]]
    }
    if(searchName.startsWith("name") || searchName == "name"){
        if(searchName.includes("_")){
            return [["server_name", "DESC"]]
        }
        return [["server_name", "ASC"]]
    }
    if(searchName.startsWith("rate") || searchName == "rate"){
        if(searchName.includes("_")){
            return [["rate", "ASC"]]
        }
        return  [["rate", "DESC"]]
    }
    return [["rate", "DESC"]]
}

search_dashbord.post("/render", async(req, res) => {
    const logger = new HTTPLogs(req, res)
    // done
    const orderBy = getOrderBy()
    const error_handler = new Send_err_msg(req, res)
    var getAllServers;
    try{
        getAllServers = await ServersTable.findAll({
            order:orderBy,
            limit:12,
            where:notNull,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.search_dashbord + 1)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(1)))
    }
    var final = []
    for(let i = 0; i < getAllServers.length; i++){
        let s = getAllServers[i].get() as DB_ServersTable
        (s as any).server_imgeURL  = `https://cdn.discordapp.com/icons/${s.server_id}/${client.guilds.cache.get(s.server_id)?.icon}.png?size=256`
        final.push(s)
    }
    return res.send(final)
})

search_dashbord.post("/render_agine", async(req, res) => {
    const logger = new HTTPLogs(req, res)
    // done
    let {words, sort_name, from} = req.body as {words:string, sort_name:string, from:number | any}
    const orderBy = getOrderBy(!sort_name || typeof sort_name != "string" ? "rate" : sort_name)
    const error_handler = new Send_err_msg(req, res)
    if(isNaN(Number(from))){
        from = 0
    }
    if(typeof words != "string"){
        words = ""
    }
    const where = words ? {
        [Op.or]:[
            {
                ...notNull,
                disc:{
                    [Op.like]:`%${words}%`
                }
            },
            {
                ...notNull,
                server_name:{
                    [Op.like]:`%${words}%`
                }
            },
            {
                ...notNull,
                pay_pal_email:{
                    [Op.like]:`%${words}%`
                }
            },
            {
                ...notNull,
                basket_embed_description:{
                    [Op.like]:`%${words}%`
                }
            }
        ]
    } : notNull
    var getAllServers;
    
    try{
        getAllServers = await ServersTable.findAll({
            where:where,
            order:orderBy,
            offset:Number(from),
            limit:12,
            logging:false
        })
    } catch(err){
        logger.write_error(err, route_code.search_dashbord + 2)
        return res.send(error_handler.create_json_api_msg(p_unknown_problem(2)))
    }
    var final = []
    for(let i = 0; i < getAllServers.length; i++){
        let s = getAllServers[i].get() as DB_ServersTable
        (s as any).server_imgeURL  = `https://cdn.discordapp.com/icons/${s.server_id}/${client.guilds.cache.get(s.server_id)?.icon}.png?size=256`
        final.push(s)
    }
    return res.send(final)
})




export default search_dashbord