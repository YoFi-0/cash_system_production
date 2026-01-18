import type { Express } from "express";
import expressSession from "express-session"
import path from "path"
import express from "express"
import expressCookie from 'cookie-parser'
import sessionFileStore from "session-file-store"
import passport from "passport";
import paypalLib from "@paypal/checkout-server-sdk"
import fileUpload from "express-fileupload";
import { YoFi_PayPalClient, payPalClient } from "./paypal";
export const server_port = process.env.SERVRE_PORT ? Number(process.env.SERVRE_PORT) : 8000
export const isDevelopment = process.env.PRODUCTION == "true" ? false : true
import cors from "cors"
import { write_logs } from "../middlewares/auth";

var FileStore = sessionFileStore(expressSession);
export const APPLAY_HTTP_CONFIG = async (app:Express) => {
    app.use(expressCookie(process.env.SESTION_SECRIT!))
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(cors({origin:`${process.env.PROTOCOL}://${process.env.DOMAIN}`, credentials:true}))
    app.use(expressSession({
        secret:process.env.SESTION_SECRIT!,
        cookie:{
            maxAge:1000 * 60 * 60 * 24,
            httpOnly:true,
            secure:process.env.PROTOCOL === "https" ? true : false,
        },
        saveUninitialized: true,
        resave: false,
        name:"YoFi",
        store: new FileStore({
            path:path.join(__dirname, "../../../ram"),
            logFn:() => {

            },
        }),
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(fileUpload())
    app.use(express.static(path.join(__dirname ,`../../public`)))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname , '../../views'));
    app.use(write_logs)
    // console.log(await YoFi_PayPalClient.get_ivcoice_by_order_id({
    //     orderID:"4LS116725V997220U"
    // }))
    
}
