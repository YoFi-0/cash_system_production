import { NextFunction, Request, Response } from "express"
import { server_error_object } from "../handler/runner"
import { HTTPLogs } from "../handler/logs"

export const is_discord_login = (req:Request, res:Response, next:NextFunction) => {
    const sesstion_discord_user_id = (req.user as any)?.id
    if(!sesstion_discord_user_id || !req.session.login_data?.id){
        req.session.destroy((err) => {
            if(err){
                console.log(err)
            }
        })
        res.redirect("/discord")
        return
    }
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect("/discord")
    }
}

export const write_logs = (req:Request, res:Response, next:NextFunction) =>{
    new HTTPLogs(req, res).write_route_logs()
    next()
}

const allowWebSiteFeachOrgine = (req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Origin","*")
    next()
}

export const chacke_aggred_terms = (req:Request, res:Response, next:NextFunction) => {
    if(req.session.is_not_agrred_terms_user){
        return res.redirect("/aggree_terms")
    }
    next()
}
export const chacke_aggred_terms_api = (req:Request, res:Response, next:NextFunction) => {
    if(req.session.is_not_agrred_terms_user){
        req.session.api_err_msg = "terms"
        return res.send({
            err:"none"
        })
    }
    next()
}

export const check_csrf_tocken = (req:Request, res:Response, next:NextFunction) => {
    const {user_user} = req.body
    const {hide_user} = req.query
    if(!req.session.CSRF_token){
        res.status(200)
        return res.render("index")
    }
    if(!user_user && !hide_user){
        res.status(200)
        return res.render("index")
    }
    if(user_user){
        if(req.session.CSRF_token == user_user){
            next()
            return
        }
    } else if(hide_user) {
        if(req.session.CSRF_token == hide_user){
            next()
            return
        }
    }
    res.status(200)
    return res.render("index")
}