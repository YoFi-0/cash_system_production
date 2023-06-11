import {NextFunction, Request, Response, Router} from "express"
import { check_csrf_tocken, is_discord_login } from "../../middlewares/auth"
import { auth_secure } from "../../functions/YoFi_Crypto"
import { AcceptedUsersConditionsTable } from "../../tables"
import { DB_AcceptedUsersConditions } from "../../types"
import { Send_err_msg, unknown_problem } from "./error_page"
import { route_code } from "../../functions"
import { HTTPLogs } from "../../handler/logs"
const index = Router()

const p_unknown_problem = (code:number) =>{
    return unknown_problem(route_code.index, code)
}

const send = (req:Request, res:Response) =>{
    res.render("index", {
        isUserAuth_ed:req.isAuthenticated()
    })
}
index.get("/", (req, res) => {
    if(req.isAuthenticated()){
        res.redirect("/dashbord/user")
        return
    }
    send(req, res)
})


index.get("/log_out", check_csrf_tocken , async(req, res) => {
    const logger = new HTTPLogs(req, res)
    const isLogedAout = await new Promise((r) => {
        req.session.destroy((err) => {
            if(err){
                logger.write_error({
                    yofiMsg:"user connot logout regulry",
                    error:err
                }, 0)
                r(false)
            } else {
                r(true)
            }
        })
    })
    if(!isLogedAout){

        res.status(500)
        return res.send("server error")
    }
    return res.redirect("/")
})

index.post("/print", (req, res) => {
    res.send(req.cookies)
})

index.get("/aggree_terms", is_discord_login, (req, res) => {
    req.session.CSRF_token = auth_secure.createRandomLang(150)
    res.render("aggree_terms", {
        csrfTocken:req.session.CSRF_token
    })
})

index.post("/aggree_terms", check_csrf_tocken, is_discord_login, async(req, res) => {
    const {is_agrred} = req.body
    const discord_user_id = (req.user as any).id
    const logger = new HTTPLogs(req, res)
    const error_handler = new Send_err_msg(req, res)
    if(!is_agrred){
        return res.redirect("/aggree_terms")
    }
    try{
        await AcceptedUsersConditionsTable.create({
            user_id:discord_user_id
        } as DB_AcceptedUsersConditions, {logging:false})
    } catch(err){
        logger.write_error(err, route_code.index + 1)
        return error_handler.redirect(p_unknown_problem(1))
    }
    delete req.session.is_not_agrred_terms_user
    res.redirect("/dashbord/user")
})

export default index