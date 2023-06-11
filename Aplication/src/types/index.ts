import discord from 'discord.js'
import { Bot } from '../handler/runner';
export interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
export interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
export type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: discord.PermissionResolvable[];
    run: RunFunction;
} & discord.ChatInputApplicationCommandData;
export type RegisterCommandsOptionsType = {
    commands:discord.ApplicationCommandDataResolvable[]
}
export interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
export interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
export type CustmIdFunctionOptions = {
    client: Bot;
    interaction: discord.Interaction<any> ;
}
export type CustmIdFunction = (commandOptions: CustmIdFunctionOptions) => any
export type Custom_idType = {
    id:string,
    run:CustmIdFunction
}
export type DB_SectionType = {
    id:number
    server_id:string
    section_name:string
}

export type DB_AcceptedUsersConditions = {
    id: number,
    user_id:string,
}

export type DB_ProductsWithSection = {
    id:number
    server_id:string
    section_name:string
    product_name:string
    product_price:number
}
export type DB_SingelProduct = {
    id: number
    server_id:string
    product_name:string
    product_price:number
    product_disc:string
    product_img_url:string
}

export type DB_Bascit = {
    id:number
    server_id:string
    user_id:string
    isLoked:boolean
    payment_path:string
    products:string
}

export type productInBascitType = {
    product_name:string,
    product_price:number,
    one_product_price:number,
    quantity:number,
}

export type DB_CustomersTable = {
    id:number
    email:string,
    pay_pal_email:string
    user_id:string
}

export type DB_UsersTable = {
    id:number,
    email:string,
    user_id:string,
    pay_pal_email:string | null
    status?:"ban" | null
}

export type DB_ServersTable = {
    id:number
    our_user_id:number
    server_name:string
    server_id:string
    user_id?:string
    lang: "English" | "Arabic"
    products_mangers:string
    pay_pal_email:string
    logs_channel:string
    basket_embed_description?:string
    basket_embed_imageURL?:string,
    invite_link?:string,
    disc:string,
    rate:number,
    status:"VF" | "BN" | null
}


export type BotConfigType = {
    index:number,
    isrRequire:boolean
    inputType:string,
    options?:string[]
    content:string | boolean | string[],
    inputTitle:string
    from:number
}[]

export type PaypalItme = {
    name:string,
    quantity:string,
    category: "DIGITAL_GOODS",
    unit_amount:{
        currency_code?:string,
        value:string
    },                 
    tax?: {
        name:string,
        percent:string,
    } | null,
}


export type constructorPayPalApiParamType = {
    client_id:string,
    client_secrit:string,
    isSandBox:boolean
}

export type InputsFillterTypeFunction = {
    test:boolean
    msg:string
}
export type InputsFillterType = {
    password?:string
    email?:string
    username?:string
    prosuct_input?:string
    section_name_input?:string
    number_input?:string
    lang:"en" | "ar"
    image_url?:string
    product_disc?:string
}
export type DB_Invoices = {
    id:number
    server_id:string
    server_name:string
    user_id:string
    user_username:string
    invoice_id:string
    total_amount:number,
    createdAt:Date
}

export type DB_DonationsTable = {
    id:number,
    sender_user_id:string,
    sender_username:string,
    resiver_server_or_user_id:string,
    resiver_server_or_user_name:string
    invoice_id:string
    amount:number,
    createdAt:Date
}
export type DB_RatesServersTable = {
    id:number
    server_id:string
    user_id:string
    rate:number
}
export type InvoiceByIdType = {
    id:string,
    status:'PAID' | string,
    items:PaypalItme[]
    detail:{
        metadata:{
            create_time: string,
            last_update_time: string,
            recipient_view_url:string
        }
    }
    primary_recipients:{
        billing_info:{
            email:string
        }
    }[]
    amount:{
        value:string
        currency_code:string
    }
}


export const EnumLoginPath = {
    invoice:"invoice",
    config:"config"
}