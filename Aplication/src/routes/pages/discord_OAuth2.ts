import {Router, Response, Request, NextFunction} from "express"
import Passport_Discord from "passport-discord"
import passport from "passport";
import { DB_AcceptedUsersConditions, DB_UsersTable, EnumLoginPath } from "../../types";
import { AcceptedUsersConditionsTable, UsersTable } from "../../tables";
import { server_error_msg } from "../../handler/runner";
import { Send_err_msg, error_path } from "./error_page";
import { HTTPLogs } from "../../handler/logs";
const discord_OAuth2 = Router()
const Discord_Strategy =  Passport_Discord.Strategy


discord_OAuth2.get("/ok", async(req, res) => {
   res.render("flash")
})

discord_OAuth2.post("/flash", async(req, res) => {
    var user;
    var is_user_aggreed;
    const logger = new HTTPLogs(req, res)
    try {
        user = await UsersTable.findOne({
            where:{
                user_id:(req.user as any).id,
            } as DB_UsersTable,
            logging:false
        })
        if(!user){
            user = await UsersTable.create(
                {
                    user_id:(req.user as any).id,
                    email:(req.user as any).email,
                } as DB_UsersTable,
                {logging:false})
            user = await user.save()
        }
        if(!user){
            throw new Error("user not saved in database")
        }
        is_user_aggreed = await AcceptedUsersConditionsTable.findOne({
            where:{
                user_id:(req.user as any).id
            } as DB_AcceptedUsersConditions,
            logging:false
        })
    } catch(err){
        console.log(err)
        logger.write_error({
            yofiMsg:"err in taken discord data from login its database error",
            error:err
        }, 0)
        var is_it_err = false
        await new Promise(r => {
            req.session.destroy((err) => {
                if(err){
                    logger.write_error({
                        yofiMsg:"connot logout the user after loging with error",
                        error:err
                    }, 0)
                    is_it_err = true
                    r(null)
                    return
                }
                r(null)
            })
        })
        if(is_it_err){
            return res.send({
                go:"/"
            })
        }
        return res.send({
            go:"/discord/auth"
        })
    }
    if(!is_user_aggreed){
        req.session.is_not_agrred_terms_user = true
    }

    const ourUser:DB_UsersTable = user.get()
    req.session.login_data = {
        id:ourUser.id
    }
    
    if(req.cookies.path){
        res.clearCookie("path",{
            httpOnly:true
        })
        return res.send({
            go:req.cookies.path
        })
    }
    res.send({
        go:"/dashbord/user"
    })
})


discord_OAuth2.use((req:Request, res:Response, next:NextFunction) => {
    if(req.isAuthenticated()){
        res.redirect("/")
    } else {
        next()
    }
})

const thisRouteName = "/discord"

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj:any, done) {
    done(null, obj);
});

var scopes = ['identify', 'email', 'guilds'];
passport.use(new Discord_Strategy(
    {
        clientID:process.env.DISCORD_OAUTH2_CLIENT_ID!,
        clientSecret:process.env.DISCORD_OAUTH2_CLIENT_SK!,
        scope:scopes,
        callbackURL:`${process.env.PROTOCOL}://${process.env.DOMAIN}/discord/auth` //`${process.env.PROTOCOL}://${process.env.DOMAIN}${thisRouteName}/auth`
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
))

discord_OAuth2.get('/', passport.authenticate('discord', {scope:scopes}));

discord_OAuth2.get('/auth', passport.authenticate('discord', {
    failureRedirect: `${thisRouteName}/fail`,
}), function(req, res) {
    res.redirect(`${thisRouteName}/ok`) // Successful auth
});
discord_OAuth2.get("/fail", async(req, res) => {
    await new Send_err_msg(req, res).redirect("Your Discord authentication has been failed")
})




export default discord_OAuth2