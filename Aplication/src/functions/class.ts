import { Request, Response } from "express";
import { ServerStsusEnums, ServersTable } from "../tables";
import { DB_ServersTable } from "../types";
import { HTTPLogs } from "../handler/logs";
import { route_code } from ".";
import { unknown_problem } from "../routes/pages/error_page";

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.funcs, code)
}

export class Funcs {
    public static admin_users_ids:string[] = JSON.parse(process.env.ADMIN_USERS_CONTROLS!)
    public static HTTP_is_Server_Ban = async(req:Request, res:Response) =>{
        const logger = new HTTPLogs(req, res)
        try{
            const bans_user_servers = await ServersTable.findAll({
                where:{
                    status:ServerStsusEnums.Ban,
                    our_user_id:req.session.login_data!.id,
                } as DB_ServersTable
            })
            if(bans_user_servers.length > 0){
                return {
                    err:false,
                    status:true
                }
            }
            return {
                err:false,
                status:false
            }
        } catch(err){
            logger.write_error(err, route_code.funcs + 1)
            res.send(p_unknown_problem(1))
            return {
                err:true,
                status:true
            }
        }
    }
}