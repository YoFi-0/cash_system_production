declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MNGO_URL:string
            PAY_PAL_CLIENT_ID:string
            PAY_PAL_CLIENT_SECRET:string
            PAY_PAL_ACOUNT_EMAIL:string
            PAY_PAL_MERCHANT_ID:string
            PRODUCTION_PAY_PAL_CLIENT_ID:string
            PRODUCTION_PAY_PAL_CLIENT_SECRET:string
            PRODUCTION_PAY_PAL_ACOUNT_EMAIL:string
            PRODUCTION_PAY_PAL_MERCHANT_ID:string
            DISCORD_OAUTH2_CLIENT_ID:string
            USE_REAL_PUBLIC:string
            ADMIN_USERS_CONTROLS:string
            DISCORD_OAUTH2_CLIENT_SK:string
            SERVRE_PORT:string
            BOT_TOKEN:string
            SOCKET_PORT:string
            SESTION_SECRIT:string
            PRODUCTION:string
            PROTOCOL:string
            DOMAIN:string
            VALIDE_API_ADMIN_ROUTE_IP:string
            WEBSITE_DOMAIN:string
            WEBSITE_PROTOCOL:string
            OURE_NAME:string
            EMAIL_SERVICE:string,
            EMAIL_FOR_SEND_THE_EMAILS:string,
            EMAIL_PASSWORD:string
            GOOGLE_AUTH_CLIENT_ID:string
            GOOGLE_AUTH_CLIENT_SECRET:string
            DB_HOST:string
            DB_PORT:string
            DB_USER:string
            DB_PASSWORD:string
            DB_NAME:string
            DB_POOL:string
            DB_DIALECT:string
            STRIPE_SK:string,
            STRIPE_PK:string
            ERORR_LOGS_CHANNEL_ID:string
            ERORR_LOGS_SERVER_ID:string
        }
    }
}



export {};