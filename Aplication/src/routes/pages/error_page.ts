import {NextFunction, Request, Response, Router} from "express"
import { error_encoder } from "../../functions/YoFi_Crypto";
import { HTTPLogs } from "../../handler/logs";
const error_page = Router()

class Req {
    private res:Response;
    private req:Request
    constructor(req:Request, res:Response){
        this.req = req,
        this.res = res
    }
    public send(msg:string){
        this.res.render("error_page", {
            server_msg:msg
        })
    }
}

export class Send_err_msg{
    private res:Response;
    private req:Request
    constructor(req:Request, res:Response){
        this.req = req,
        this.res = res
    }
    public async redirect(msg:string, status:number = 500){
        const logger = new HTTPLogs(this.req, this.res)
        this.res.status(status)
        var en_coded_text
        try{
            en_coded_text = await error_encoder.createMistry(msg)
        } catch(err){
            logger.write_error({
                yofiMsg:"connot send error 25 to the user bacose the decoding",
                error:err
            }, 0)
            this.res.status(500)
            return this.res.send("error number 25")
        }
        this.req.session.is_error = true
        this.res.redirect(`${error_path}?err=${en_coded_text}`)
    }
    public create_json_api_msg(msg:string){
        return JSON.stringify({
            err:msg
        })
    }
    public create_json_fixed_api_msg(){
        return JSON.stringify({
            err:"error"
        })
    }
}

export const error_path = "/somthing_is_wrong"
export const unknown_problem = (type:number ,code:number) => {
    return `error code: ${type + code},some thing is wrong with our server you can contact us about the problem`
}

error_page.get("/", async(req, res) => {
    const logger = new HTTPLogs(req, res)
    if(!req.session.is_error){
        return res.redirect("/")
    }
    delete req.session.is_error
    const handler = new Req(req, res)
    const {err} = req.query
    if(!err){
        return res.redirect("/")
    }
    if(typeof err != "string"){
        return res.redirect("/")
    }
    var erreorMsg
    try{
        erreorMsg = await error_encoder.viewMistry(err)
    } catch(err){
        logger.write_error({
            yofiMsg:"connot send an error to the user",
            error:err
        }, 0)
        res.status(500)
        return res.send("error number 26")
    }
    return handler.send(erreorMsg)
})


export default error_page