import { Request, Response, request } from "express"
import fs from "fs"
import path from "path"
import { allRoutes } from "./routes_arr"
import { Interaction } from "discord.js"

const root_dir = path.join(__dirname, "../../../logs")

interface ILogsJson {
    date_time:Date ,
    path:string,
    ip:string | null
    request:{
        body:any,
        headers:any,
        query:any
        params:any,
        cookie:any
    }
    username:string | null,
    user_id:string | null,
    discord_iser_id:string | null,
    discord_tag:string | null
}

export class Programlogs {
    public static write_error(error:any){
        try{
            JSON.stringify(error)
            fs.appendFileSync(path.join(root_dir, `errors/program_errors.json`), JSON.stringify({
                date_time:new Date(),
                error
            }), "utf-8")
        } catch(err){
            try{
                fs.appendFileSync(path.join(root_dir, `/errorsprogram_errors.json`), `${error}`, "utf-8")
            } catch(err){
                fs.appendFileSync(path.join(root_dir, `/errorsprogram_errors.json`), error, "utf-8")
            }
        }
    }
    public static bot_errors(error:any, intarction:Interaction<any>){
        try{
            JSON.stringify({
                intarction: intarction.isCommand() ? intarction.commandName : intarction.channelId,
                error:error
            })
            fs.appendFileSync(path.join(root_dir, `errors/bot_errors.json`), JSON.stringify({
                date_time:new Date(),
                error
            }), "utf-8")
        } catch(err){
            try{
                fs.appendFileSync(path.join(root_dir, `/errors/bot_errors.json`), `${error}`, "utf-8")
            } catch(err){
                fs.appendFileSync(path.join(root_dir, `/errors/bot_errors.json`), error, "utf-8")
            }
        }
    }
}

export class HTTPLogs {
    private req:Request
    private res:Response
    constructor (req:Request, res:Response){
        this.req = req
        this.res = res
    }
    private writeFile(logFileName:string, data:any):void{
        fs.appendFileSync(path.join(root_dir, `routes/${logFileName}.json`), JSON.stringify(data) + ",")
    }
    private write_not_our_route_File(logFileName:string, data:any):void{
        fs.appendFileSync(path.join(root_dir, `invalid_routes/${logFileName}.json`), JSON.stringify(data) + ",")
    }
    public write_route_logs(){
        var isOurRout = false
        for(let route of allRoutes){
            const req_route = this.req.originalUrl.split("/").filter((str, i) => i != this.req.originalUrl.split("/").length + 1).join("/")
            if(req_route.startsWith(route.routeName) && route.routeName != "/"){
                isOurRout = true
                break
            } else if(`${req_route.replace("/api", "")}`.startsWith(route.routeName) && route.routeName != "/"){
                isOurRout = true
                break
            }
        }
        const logs_data:ILogsJson = {
            date_time:new Date(),
            path:this.req.originalUrl,
            ip:this.req.headers['x-forwarded-for'] as string || this.req.socket.remoteAddress || null,
            username:(this.req.user as any)?.username || null,
            discord_iser_id:(this.req.user as any)?.id || null,
            user_id:`${this.req.session?.login_data?.id}` || null,
            discord_tag:(this.req.user as any)?.discriminator || null,
            request:{
                params:this.req.params,
                query:this.req.query,
                body:this.req.body,
                headers:this.req.headers,
                cookie:this.req.cookies
            }
        }
        var logs_path
        if(this.req.originalUrl.includes("?")){
            logs_path = this.req.originalUrl == "/" ? "_index" : this.req.originalUrl.replaceAll("/", '_').replaceAll("#", "").split('?')[0]
        } else {
            logs_path = this.req.originalUrl == "/" ? "_index" : this.req.originalUrl.replaceAll("/", '_').replaceAll("#", "")
        }
        if(isOurRout || this.req.originalUrl == "/"){
            this.writeFile(logs_path, logs_data)
        } else {
            this.write_not_our_route_File(logs_path, logs_data)
        }
    }
    public write_error(err:any, code:number){
        fs.appendFileSync(path.join(root_dir, `errors/errors.json`), JSON.stringify({
            date_time:new Date(),
            path:this.req.originalUrl,
            error_code:code == 0 ? "node code" : code,
            ip:this.req.headers['x-forwarded-for'] as string || this.req.socket.remoteAddress || null,
            username:(this.req.user as any)?.username || null,
            discord_iser_id:(this.req.user as any)?.id || null,
            user_id:`${this.req.session?.login_data?.id}` || null,
            discord_tag:(this.req.user as any)?.discriminator || null,
            error:err
        }))
    }
}