import { DB_RatesServersTable, DB_ServersTable, ExtendedInteraction, InputsFillterType, InputsFillterTypeFunction } from '../types'
import config from '../config.json'
import sequelize from "sequelize";
import discord, { TextChannel } from 'discord.js'
import { RatesServersTable, ServersTable } from '../tables';
import { client } from '../handler/runner';
import { lang_obj } from './lang';
export const sleep = async(dlay:number) => {
    await new Promise(r => setTimeout(() => r(true), dlay))
}


export const removeFromArray = <T>(arr:T[], itme:T) =>{
    return arr.filter(theItme => {
        return itme != theItme
    })
}

export const max_len = {
    product_name:30,
    product_price:8,
    quantity:3,
    section_name:30,
    empid_title:30,
    description:255,
    image_url:500,
    discord_id:30,
    email:50,
    server_name:101,
};


export const route_code = {
    donation:9000,
    paypal:8000,
    user_dashbord:7000,
    server_dashbord:6000,
    all_dashbords:5000,
    search_dashbord:4000,
    index:3000,
    funcs:2000,
};


export const send_emergency_erorr = async(
    {server_name, buyer_user_name, invoice_id, owner_id, server_id, buyer_user_id, user_tag, requster_user_id, type}:{
        buyer_user_id:string,
        buyer_user_name:string
        server_id:string,
        user_tag:string,
        server_name:string,
        owner_id:string,
        invoice_id:string,
        requster_user_id:string,
        type:"invoice" | "donation" | "invalid to send msg to server"
    }
) => {
    const server = await client.guilds.fetch(process.env.ERORR_LOGS_SERVER_ID!)
    const channel = await server.channels.fetch(process.env.ERORR_LOGS_CHANNEL_ID!) as TextChannel
    const alert = type == "invalid to send msg to server" ? 
`في رسالة شراء ما وصلت للسيرفر
حاول تتواصل مع المستخدمين اللي في الرسالة
` : 
`عند ريكورد في الداتا بيس لازم تنمسح يدويا
احذفو بسرعه`
   const msg =  `------------------------------------------
***⛔⛔⛔ تحذير تحذير***
صاحب الطلب
<@${requster_user_id}>
المشتري
<@${buyer_user_id}>
صاحب المتجر
<@${owner_id}>
***${alert}***
${type == "invalid to send msg to server" ? "" : `الجدول`}
${type == "invalid to send msg to server" ? "" : `:${type}`} 
\`\`\`
buyer_user_name: ${buyer_user_name}
buyer_user_id: ${buyer_user_id}
server_id: ${server_id}
user_tag: ${user_tag}
server_name: ${server_name}
owner_id: ${owner_id}
invoice_id: ${invoice_id}
created_at: ${new Date().toJSON()}
\`\`\`
------------------------------------------`
    await channel.send(msg)
}

export const somthin_is_wrong = "somthing is worng !"

// class PayPalApi {
//     private client_id:string
//     private client_secrit:string
//     private isSandBox:boolean
//     private static isDataGetIt = false
//     private static payPalUserInfo = {
//         name:'',
//         email_address:''
//     }
//     constructor({client_id,client_secrit,isSandBox}:constructorPayPalApiParamType){
//         this.client_id = client_id
//         this.client_secrit = client_secrit
//         this.isSandBox = isSandBox
//     }

//     private async sendReq(path:string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body?:any, headers?:string, addHeders?:any){
//        const req =  await axios({
//             url:`https://${this.isSandBox ? `api-m.sandbox` : 'api-m'}.paypal.com${path}`,
//             method:method,
//             auth:{
//                 username:this.client_id,
//                 password:this.client_secrit
//             },
//             headers:{
//                 "Content-Type": headers ? headers : 'application/x-www-form-urlencoded',
//                 ...addHeders
//             },
//             data: {
//                 'grant_type':'client_credentials',
//                 ...body
//             }
//         })
//         return {
//             status:req.status,
//             res:req.data
//         }
//     }
//     public async auth(){
//         try{
//             const req = await this.sendReq('/v1/oauth2/token', 'POST')
//             if(req.status == 200){
//                 return true
//             } else {
//                 return false
//             }
//         } catch(err){
//             console.log(err)
//             return false
//         }
//     }
//     private async getCreatedInvoiceObj(obj:any){
//         const getOBJRes = obj.href
//         const finalUrl = this.isSandBox ? getOBJRes.replace('https://api.sandbox.paypal.com', '') : getOBJRes.replace('https://api.paypal.com', '')
//         const req = await this.sendReq(finalUrl, 'GET')
//         return req
//     }
//     private async getInvoiceURL(obj:any){
//         const invoice_id = obj.res.id
//         await this.sendReq(`/v2/invoicing/invoices/${invoice_id}/send`, 'POST', {}, 'application/json')
//         return obj.res.detail.metadata.recipient_view_url
//     }
//     public async getInvoicesForUser({
//         user_id,
//         start_date /*yyyy-mm-dd*/,
//         end_date// yyyy-mm-dd
//     }:{
//         user_id:string
//         start_date?:string // yyyy-mm-dd
//         end_date?:string // yyyy-mm-dd
//     }){
//         const req = await this.sendReq('/v2/invoicing/search-invoices', 'POST', start_date && end_date ? {
//             reference:`Discord User Id: ${user_id}`,
//             invoice_date_range: {
//                 start: start_date, // yyyy-mm-dd
//                 end: end_date // yyyy-mm-dd
//               }
//         } :{
//             reference:`Discord User Id: ${user_id}`,
//         }, 'application/json')
//         return req.res
//     }
//     public async createInvice({user_id, itmes, email}:{
//         user_id:string
//         itmes:PaypalItme[],
//         email:string
//     }){
//         const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
//         const config:BotConfigType = JSON.parse(configReder)
//         const reqBody = {
//             detail:{
//                 currency_code:config[5].content,
//                 reference:`Discord User Id: ${user_id}`,
//             },
//             primary_recipients:[
//                 {
//                     billing_info:{
//                         email_address:email,
//                     }
//                 }
//             ],
//             items:itmes
//         }
//         const req = await this.sendReq('/v2/invoicing/invoices', 'POST', reqBody, 'application/json')
//         const reponsofCreatedInvoice = await this.getCreatedInvoiceObj(req.res)
//         const finalURL = await this.getInvoiceURL(reponsofCreatedInvoice)
//         return {
//             invoic_id:reponsofCreatedInvoice.res.id,
//             invoice_url:finalURL
//         }
//     }
//     public async getInvoiceById(id:string){
//        const req = await this.sendReq(`/v2/invoicing/invoices/${id}`, 'GET')
//        return req.res
//     }
//     public async cancelInvoice(id:string):Promise<{
//         status:boolean,
//         msg:string
//         res?:any
//     }>{
//         var req
//         try{
//             req = await this.sendReq(`/v2/invoicing/invoices/${id}/cancel`, 'POST', {}, 'application/json')
//         } catch(err:any){
//             if(err.response.data.name == 'UNPROCESSABLE_ENTITY'){
//                 return {
//                     status:false,
//                     msg:_$.payPal.invoice_notfound_unlocked_basket
//                 }
//             } else {
//                 throw Error(err)
//             }
//         }
//         return {
//             msg:_$.payPal.canceled_invoice_unlocked_basket,
//             status:true,
//             res:req.res
//         }
//     }
// }

// const paypal = new PayPalApi({
//     client_id:'ARnmkJUzeOr9ZvMRvrTLcT4yWkhQ2Oyr_NbnPn3Tt5uvi_rlK_o6eoC5ku11fuCwS9Cruryc-oV-XXWi',
//     client_secrit:'EKYDlXoQ1W_U3QYaTPQ5cfJPJrtUzi8P8TbMbySdSm_iBgRMlE0fZXbHwrunUHcdCjEkXKE7DCcN15hb',
//     isSandBox:true
// })

// const payPalClient = ({
//     client_id,
//     client_secrit
// }:{client_secrit:string, client_id:string}) => {
//     return new PayPalApi({
//         client_id:client_id,
//         client_secrit:client_secrit,
//         isSandBox:true
//     })
// }



export const inputsFillter = ({
    password,
    email,
    username,
    prosuct_input,
    section_name_input,
    image_url,
    product_disc,
    lang
}:InputsFillterType):InputsFillterTypeFunction => {
    const respons =  {
        test:false,
        msg: ''
    }
    const valid_Inputs = [
        password,
        email,
        username,
        prosuct_input,
        section_name_input,
        image_url,
        product_disc
    ]
    const _$ = lang_obj(lang)
    const filter = valid_Inputs.filter(value => {
        if(!value){
            return true
        }
        if(value == undefined){
            return true
        }
        if(" ".repeat(value.length) == value){
            return false
        }
        return true
    })
    if(valid_Inputs.length != filter.length){
        respons.msg = "invalid value"
        return respons
    }
    // password Regxp
    /*
        ^                         Start anchor
        (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
        (?=.*[!@#$&*])            Ensure string has one special case letter.
        (?=.*[0-9].*[0-9])        Ensure string has two digits.
        (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
        .{8,30}                      Ensure string is of length 8.
        $                         End anchor.
    */
   // username Regxp
   /*
        ^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
        └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
            │         │         │            │           no _ or . at the end
            │         │         │            │
            │         │         │            allowed characters
            │         │         │
            │         │         no __ or _. or ._ or .. inside
            │         │
            │         no _ or . at the beginning
            │
            username is 8-30 characters long
   */
    const passwordReg = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,30}$/
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const usernameReg = /^(?=[a-zA-Z0-9_]{4,30}$)(?!.*[_]{2})[^_].*[^_]$/
    if(password){
        if(password.length < 8){
            respons.msg = 'password must be longer than 7 characters'
            return respons
        }
        if(password.length > 30){
            respons.msg = 'invalid password'
            return respons
        }
        if(!passwordReg.test(password)){
            respons.msg = 'password must be strong'
            return respons
        }
    }
    if(username){
        if(username.length < 4){
            respons.msg = 'username must be longer than 3 characters'
            return respons
        }
        if(username.length > 30){
            respons.msg = 'username must be less than 30 characters'
            return respons
        }
        if(!usernameReg.test(username)){
            respons.msg = 'invalid username'
            return respons
        }
    }
    if(section_name_input){
        if(section_name_input.length > 30 || section_name_input.length < 1){
            respons.msg = 'section name must be less then 30 and product name must be more then 1 letters'
            return respons
        }
        if(" ".repeat(section_name_input.length) == section_name_input){
            respons.msg = 'invalid value'
            return respons
        }
    }
    if(image_url){
        if(!image_url.startsWith('http://') && 
        !image_url.startsWith('https://') && 
        !image_url.toLocaleLowerCase().endsWith('.png') &&
        !image_url.toLocaleLowerCase().endsWith('.gif') && 
        !image_url.toLocaleLowerCase().endsWith('.jpg') &&
        !image_url.toLocaleLowerCase().endsWith('.svg') && 
        !image_url.toLocaleLowerCase().endsWith('.webp')
         ){
            respons.msg =  _$.custom_id.create_single_product__model.bsdMsg.badImagURL
            return respons
         }
    }
    if(prosuct_input){
        if(prosuct_input.length > 30 || prosuct_input.length < 1){
            respons.msg = 'product name must be less then 30 and product name must be more then 1 letters'
            return respons
        }
        if(" ".repeat(prosuct_input.length) == prosuct_input){
            respons.msg = 'invalid value'
            return respons
        }
    }
    if(email){
        if(!emailReg.test(email)){
            respons.msg = 'invalid email'
            return respons
        }
    }
    respons.test = true
    return respons
}

export const IsvalidUser = async(interaction:discord.Interaction<any>) => {
    var serverConfig
    try{
        serverConfig = await ServersTable.findOne({
            where:{
                server_id:interaction.guild.id
            } as DB_ServersTable,
            logging:false
        })
    } catch(err){
        return {
            status:false,
            err: true,
            serverConfig:null,
            ban_or_varified:null
        }
    }
    if(!serverConfig){
        return {
            status:false,
            err: false,
            serverConfig:null,
            ban_or_varified:null
        }
    }
    const DB_serverConfig:DB_ServersTable = serverConfig.get()
    const targetArray = JSON.parse(DB_serverConfig.products_mangers)
    if(!targetArray.includes(interaction.user.id) && interaction.user.id != interaction.guild.ownerId){
        return {
            status:false,
            err: false,
            serverConfig:DB_serverConfig,
            ban_or_varified:DB_serverConfig.status
        }
    } else {
        return {
            status:true,
            err: false,
            serverConfig:DB_serverConfig,
            ban_or_varified:DB_serverConfig.status
        }
    }
}

export const valid_image_url = (image_url:string) => {
    if(!image_url.startsWith("https://")){
        return false
    }
    if(!image_url.endsWith(".gif") && !image_url.endsWith(".png") && !image_url.endsWith(".jpg")){
        return false
    }
    return true
}

export const rate_server = async(interaction:discord.ButtonInteraction<any> | ExtendedInteraction, rate:number) => {
    await interaction.deferReply({
        ephemeral:true
    })
    const isUpdated = await RatesServersTable.update({
        rate:rate
    } as DB_RatesServersTable, 
        {
            where:{
                user_id:interaction.user.id,
                server_id:interaction.guildId
            } as  DB_RatesServersTable,
            logging:false
        }
    )
    if(isUpdated[0] == 0){
        await RatesServersTable.create({
            user_id:interaction.user.id,
            server_id:interaction.guildId,
            rate:rate
        } as DB_RatesServersTable, {logging:false})
    }
    const get_server_rate_AVG = await RatesServersTable.findAll({
        attributes:[[sequelize.fn('avg', sequelize.col('rate')), 'rate']],
        where:{
            server_id:interaction.guildId
        } as DB_RatesServersTable,
        logging:false
    })
    const server_rate_AVG:DB_RatesServersTable =  get_server_rate_AVG[0].get()
    await ServersTable.update({
        rate:server_rate_AVG.rate
    }, {
        where:{
            server_id:interaction.guildId
        } as DB_ServersTable,
        logging:false
    })
    interaction.editReply({
        content:"thank you for your support"
    })
}

export const lang = (en:string, ar:string, index?:Array<number>):string =>{
    var words = null
    const configPlace = (config[0].content as string).toLocaleLowerCase()
    if(index && index.length !=0){
        if(index.length > 1){
            throw Error('array must have one itme only !!!')
        }
        const myNumber = index[0]
        words = config[myNumber].content ? config[myNumber].content as string 
        : configPlace == 'arabic' ? ar : en
    } else {
        words = configPlace == 'arabic' ? ar : en
    }
    return words
}

export const _$ = {
    // main !== 1 all
    all:{
        lockedBasket:lang('your basket is locked you need to **Confirm your invoice** first', `تم إقفال سلتك حتى تقوم ***بالتحقق من فتورتك***`),
        err:lang(`somthing is worng !`, ``),
        qunntyMustNumber:lang('quantity must be a number', 'الكمية يجب ان تكون رقماً'),
        highQuintty:lang(`the quantity is to high`, `الكمية جداً مرتفعه`),
        bad_permetion:lang('sorry but **you can\'t use this** command', `عذراَ انت غير مصرح لك لإستخدام هذا الامر`),
        no_data:lang('sorry your server dose not have any configrations yet', `عذرا سيرفرك لا يتضمن إعدادات خاصة`),
        create_config:lang('configrate', `إضافة إعدادات `),
        singleProductEdit:{
            words:{
                Product_Name:lang('Product Name', `اسم المنتج`),
                Price:lang('Price', `سعر المنتج`),
            },
            buttons:{
                createAnotherProduct:lang('Create Another single product', `انشاء منتج فردي آخر`),
                updateThisProduct:lang('Update this product', `تحديث هذا المنتج`),
                deleteThisProduct:lang('Delete this product', `حذف هذا المنتج`),
                showAllProducts:lang('Show all single product', `اضهار جميع المنتجات الفردية`)
            }
        }
    },
    // main !== 2 commands
    commands:{
        //commands !== 1 controller
        controller:{
            description:lang(`in this command you can control all your products`, `في هذا الأمر ، يمكنك التحكم في جميع منتجاتك`),
            embid:{
                title:lang('Control Panel', `لوحة التحكم`),
                description:{
                    _1:lang('Hello', `مرحباَ`),
                    _2:lang(`
***welcome to the Control Panel***
this ***Controller*** allow you to control all your products
in real time so you can add or update and delete
any product you want and at the end
you can use ***/publish_my_store*** to set up your products
in your real server

for adding a section press
*** Add section Button ***

for updating Section a section press
*** Update section Button ***

for Deleting Section a section press
*** Delete section Button ***

for See All Section a section press
*** Show All Section Button ***`,
`***اهلاَ بك في لوحة التحكم***
تسمح لك ***وحدة التحكم*** هذه بالتحكم في جميع منتجاتك
في الوقت الفعلي حتى تتمكن من اضافة أو تعديل و حذف
أي منتج تريده وفي النهاية
يمكنك استخدام ***/publish_my_store*** لإعداد منتجاتك
في سيرفرك

لإضافة قسم اضغط على
*** إضافة قسم ***

للتعديل علة قسم إضغط على
*** تعديل قسم ***

لحذف قسم إضغط على
*** حذف قسم ***

لإظهار أسماء أقسامك اضغط على
*** اضهار جميع الاقسام ***`)
                },
                buttons:{
                    _1:lang('Add section', `إضافة قسم`),
                    _2:lang('Update section', `تعديل قسم`),
                    _3:lang('Delete section', `حذف قسم`),
                    _4:lang('show all section', `إضهار جميع الأقسام`),
                    _5:lang('Create single product', `إنشاء منتج فردي`),
                    _6:lang('Update single product', `تحديث منتج فردي`),
                    _7:lang('Delete single product', `حذف منتج فردي`),
                    _8:lang('show one single product',`إضهار منتج فردي`),
                    _9:lang('show all single product', `إضهار جميع المنتجات الفردية`)
                }
            }
        },
        //commands !== 2 publish_my_store
        publish_my_store:{
            finalMsg:lang('all products has been sent', `تم إرسال جميع المنتجات`),
            description:lang(`with this command everyone will can see your products`, `هذا الامر يتيح لك إضهار منتجاتك للعامة`),
            errs:{
                _1:lang('there is no channel', `عذرا لكن لا يوجد مكان ل نشر منتجاتك فيه`),
                _2:lang(`you don't have any product yet`, `ليس لديك منتجات ل تنشرها`)
            },
            embeds:{
                priceFld:lang('Price', `السعر`),
                productNameFld:lang('Product Name', `إسم المنتج`),
                buttons:{
                    _1:lang('Add To Basket', `إضافة الى السله`),
                    _2:lang('Remove From Basket', `حذف من السله`)
                }
            },
            selectors:{
                priceDisc:lang('Price', `السعر`)
            },
            basket:{
                embid:{
                    title:lang('basket', 'السله'),
                    description:lang(`here you can check out and controle your products`, `هنا يمكنك الدفع و التحكم ب منتجاتك`),
                },
                buttons:{
                    _1:lang('Show me my basket', `إضهار سلتي`),
                    _2:lang('Remove from my basket', `حذف منتج من سلتي`),
                    _3:lang('Check out', `الدفع`),
                    _4:lang('Confirm My Invoice', `التحقق من فاتورتي`)
                }
            }
        },
        //commands !== 3 get_my_payments_by_date
        get_my_payments_by_date:{
            description:lang('in this command you can take all your paid invoices bettwen two dates', `في هذا الأمر ، يمكنك أخذ جميع فواتيرك المدفوعة بين تاريخين`),
            commandOptions:{
                _1:{
                    name:lang('start_date', `start_date`),
                    description:lang('Date must be like yyyy-mm-dd for example 2022-12-13', `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`)
                },
                _2:{
                    name:lang('end_date', `end_date`),
                    description:lang('Date must be like yyyy-mm-dd for example 2022-12-13', `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`)
                }
            },
            badMsgs:{
                invaldDate:lang(`***Invalid Date***
you must write the date like this yyyy-mm-dd
for example 2022-12-13`, `***طريقة كتابتك للتاريخ غير صحيحه***
يجب أن تكتب التاريخ مثل هذا yyyy-mm-dd
على سبيل المثال 2022-12-13`,
                ),
                userHasNoInvoice:lang(`has no invoices paid between dates`, `ليس لديه فواتير مدفوعة بين هذين التاريخين`),
                connotFindTheUser:lang(`cannot find the target user`, `عذراً لا يمكنني العثور على المستخدم الذي تقصده`),
                userNoInvoiceYet:lang('The user has no invoices paid', `المستخدم ليس لديه فواتير مدفوعه`),
            },
            words:{
                username:lang(`Username`, `إسم المستخدم`),
                userId:lang(`User ID`, `آي دي المستخدم`),
                productName:lang(`product name`, `إسم المنتج`),
                quantity:lang(`quantity`, `الكمية`),
                singleProductPrice:lang(`single prodcut price`, `سعر المنتج الواحد`),
                totlePrice:lang(`Total Price`, `سعر المنتج مع الكميات`)
            },
            okMsgs:{
                dataCollectd:lang('User information collected', `تم جمع معلومات المستخدم`),
                allInvoicesSent:lang('All invoices have been sent', `تم إرسال جميع الفواتير`)
            },
            finalInvoices:{
                notFoundInServer:lang(`not found he must be on the server`, `غير موجود يجب ان يكون في السيرفر`),
                invoicePideBy:lang(`this invoice has been paid by`, `تم دفع هذه الفاتورة بواسطة`),
                invoiceCreatedAt:lang(`invoice created at`, `تم إنشاء الفاتورة في`),
                invoiceUpdatedAT:lang(`invoice updated or paid at` ,`تم دفع او تعديل الفاتورة في`),
                byUTC:lang(`By UTC Time`, `حسب توقيت UTC`)
            }
        },
        //commands !== 3 get_user_payments_by_date
        get_user_payments_by_date:{
            description:lang('in this command you can take all paid invoices of user bettwen two dates', `في هذا الأمر ، يمكنك أخذ جميع فواتير المستخدم المدفوعة بين تاريخين`),
            commandOptions:{
                _1:{
                    name:lang('user', `user`),
                    description:lang('Target user', `المستخدم المقصود`)
                },
                _2:{
                    name:lang('start_date', `start_date`),
                    description:lang('Date must be like yyyy-mm-dd for example 2022-12-13', `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`)
                },
                _3:{
                    name:lang('end_date', `end_date`),
                    description:lang('Date must be like yyyy-mm-dd for example 2022-12-13', `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`)
                }
            },
        }
    },
    //main !== 3 custom_id
    custom_id:{
        // ping ping
        all:{
            sectionSelectror:{
                words:{
                    price:lang('Price', `السعر`),
                    productName:lang('product Name', `اسم المنتج`),
                },
                noProductOption:{
                    label:lang('no prodcuts yet', `لا يوجد منتجات بعد`),
                    description:lang('This is not a product', `هذا ليس منتجا`)
                },
                buttons:{
                    addProduct:lang('Add product to this section', `إضافة منتج للقسم`),
                    updateProduct:lang('Update product in this section', `تعديل منتج من القسم`),
                    deleteProduct:lang('Delete product in this section', `حذف منتج من القسم`)
                }
            }
        },
        //custom_id !== 1 add_product_section_to_basket
        add_product_section_to_basket:{
            addBasket:lang('added to the basket with quantity', `تم اضافة المنتج الى السلة بكمية`),
            only_25:lang('you can take only ***25*** products names in your ***Basket***', 'يمكنك إضافة ***25*** منتج في ***السله*** فقط')
        },
        //custom_id !== 2 add_to_basket__model
        add_to_basket__model:{
            addBasket:lang('added to the basket with quantity', `تم اضافة المنتج الى السلة بكمية`),
            only_25:lang('you can take only ***25*** products names in your ***Basket***',  'يمكنك إضافة ***25*** منتج في ***السله*** فقط')
        },
        //custom_id !== 3 add_to_basket
        add_to_basket:{
            lockedBasket:lang('your basket is locked you need to **Confirm your invoice** first', `تم إقفال سلتك حتى تقوم ***بالتحقق من فتورتك***`),
            model:{
                addBasket:lang('Add To Basket', `إضافة الى السلة`),
                quntty:lang('Quantity', `الكمية`),
            }
        },
        //custom_id !== 4 add_to_basket
        cancel_invoice:{
            notInvoiceYet:lang('you dont have an invoice yet', `ليس لديك فاتورة بعد`),
            butInvoceUnlocked:lang('but your bascket is unlocked', `لكن تم فتح فاتورتك`)
        },
        //custom_id !== 5 check_out_create_model
        check_out__model:{
            tryAginEmail:lang('try agine', `حاول مجددأ`),
            invalidEmailMsg:lang('invalid Email please try agine', `عذراً البريد الإلكتروني غير صالح حاول مجدداَ`),
            udpatedEmail:lang('Your email has been updated', `تم تحديث البريد الإلكتروني ب نجاح`)
        },
        //custom_id !== 6 check_out_create_model
        check_out_create_model:{
            title:lang(`To complete the process, you must update your email`, `لإكمال العملية عليك تحديث بريدك الإلكتروني`),
            emailLable:lang('Email', `البريد الإلكتروني`)
        },
        //custom_id !== 7 check_out
        check_out:{
            badMsg:lang(`please send this message to the owner
***the channel of product logs not found***`, `الرجاء إرسال هذه الرسالة إلى المالك
*** لم يتم العثور على روم سجلات المنتج ***`),
            model:{
                title:lang('Check Out', `الذفع`),
                emailLabe:lang('Email', `البريد الإلكتروني`),
            },
            embtyBasket:lang('your basket is empty', `سلتك فارغة`),
            okayMsg:{
                title:lang('Invoice Link', `رابط الفاتورة`),
                button:lang('Link', `الرابط`)
            },
            adminMsg:{
                embid:{
                    title:lang('Invoice for', `فاتورة ل`),
                    //here!!!
                    description:{
                        _1:lang(
`this invoice **does not paid yet**
the user **`, `هذه الفاتورة **لم يتم دفعها بعد**
للسمتخدم **`),
                        _2:lang(
`** checked out of his product
But he hasn't paid anything yet.
so to check if this invoice get paid
please clicke **Is This Invoice Paid ?** Buuton`,
`** الذي قام بتجميع منتجاته
لكنه لم يدفع اي شيء بعد
لذا للتأكد اذا ما تم دفع الفاتورة ام لا
قم بالضغط على ***هل تم دفع الفاتورة ؟***`),
                    }
                },
                fealds:{
                    username:lang('Username', `إسم المستخدم`),
                    userId:lang('User Id', `آي دي المستخدم`)
                },
                buttons:{
                    _1:lang('Is This Invoice Paid ?', `هل تم دفع الفاتورة ؟`),
                    _2:lang(`Invoice Link`, `رابط الفاتورة`)
                }
            },
        },
        //custom_id !== 8 create_Product__model
        create_Product__model:{
            badMsgs:{
                _1:lang('somthing is wrong connot find the section', `حدث خطأ ما لا يمكنني إجاد القسم`),
                productNameHighLen:lang(`product name should be shorter`, `إسم النتج يجب ان يكون اقصر`),
                priceMustNumper:lang(`the product ***dose not added !!!***
price must be a number !!!`, `***لم يتم*** إضافة منتج بعد
السعر يجب ان يكون رقماً`),
                priceToHigh:lang(`the product ***dose not added !!!***
the price is too high`, `***لم يتم*** إضافة منتج بعد
السعر جداُ مرتفع`),
                sectionNotFoundMsg:{
                    _1:lang(`section ***`, `القسم ***`),
                    _2:lang(`*** it does not exist or has been deleted`, `*** غير موجود او تم حذفه`),
                },
                only25:lang(`you can add 25 product on every section`, `يمكنك إضافة 25 منتج فقط في كل قسم`),
                productFound:{
                    _1:lang(`the product `, `المنتج`),
                    _2:lang(` is already in this section`, ` موجود بالفعل في هذا القسم`)
                }
            },
            finalMsg:{
                mag:lang('new product added in section', `تم إضافة منتج جديد في هذا القسم`),
                priceWord:lang(`Price`, `السعر`),
                buttons:{
                    addProduct:lang('Add product to this section', `إضافة منتج للقسم`),
                    updateProduct:lang('Update product in this section', `تعديل منتج من القسم`),
                    deleteBroduct:lang('Delete product in this section', `حذف منتج من القسم`)
                }
            },
        },
        //custom_id !== 9 create_product
        create_product:{
            model:{
                title:lang('Create Products Section', `إنشاء منتج جديد داخل القسم`),
                productNameLable:lang("Product Name", `إسم المنتج`),
                productPrice:lang("Product Price", `سعر المنتج`)
            }
        },
        //custom_id !== 10 create_Section__model
        create_Section__model:{
            badMsg:{
                alredyHavProduct:lang('you already have a section with name', `لدبك بالفعل قسم بالإسم`),
                highNameSection:lang(`the name is to long of this Section`, `الإسم غير مناسب لهذا القسم`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`section`, 'تم إضافة قسم جديد بإسم'),
                    _2:lang(`added do you want to add a product on it`, `هل تريد إضافة منتجات عليه`)
                },
                selector:{
                    placeHolder:lang('there is no product', `لا يوجد منتج`),
                    option:{
                        lable:lang('no prodcuts yet', `لا يوجد منتج بعد`),
                        description:lang('This is not a product', `هذا ليس منتجاَ`)
                    }
                },
                buttons:{
                    addProduct:lang('Add product to this section', `إنشاء منتج جديد داخل القسم`),
                }
            }
        },
        //custom_id !== 11 create_section
        create_section:{
            model:{
                title:lang(`Create Products Section`, `إنشاء قسم جديد`),
                sectionNameLable:lang('Section Name', `إسم القسم`)
            }
        },
        //custom_id !== 12 create_single_product__model
        create_single_product__model:{
            bsdMsg:{
                badImagURL:lang('img url is invalid', `رابط الصورة غير صالح`),
                priceMustBeNumber:lang(`the product ***dose not added !!!***
price must be a number !!!`, `***لم يتم*** إضافة منتج بعد
السعر يجب ان يكون رقماً`),
                priceToHigh:lang(`the product ***dose not added !!!***
the price is too high`, `***لم يتم*** إضافة منتج بعد
السعر جداُ مرتفع`),
                productNameIsToLong:lang(`product name is too long`, `اسم المنتج طويل جداَ`),
                productFound:lang('You already have a prodcut with name', `لديك بالفعل منتج فردي بإسم`),
            },
            finalMsg:{
                msg:{
                    _1:lang('prodcut', `تم إنشاء منتج جديد بإسم`),
                    _2:lang('has been created', `بنجاح`),
                },
                price:lang('Price', `السعر`),
                productName:lang('Product Name', `إسم المنتج`),
                buttons:{
                    createAnotherProduct:lang('Create Another single product', `إنشاء منتج فردي آخر`),
                    updateThisProduct:lang('Update this product', `تعديل هذا المنتج الفردي`),
                    deleteThisProduct:lang('Delete this product', `حذف هذا المنتج الفردي`),
                    showAllProducts:lang('Show all single product', `إضهار جميع المنتجات الفردية`)
                }
            }
        },
        //custom_id !== 13 create_single_product
        create_single_product:{
            model:{
                title:lang('Create Single Product', `إنشاء منتج فردي جديد`),
                lables:{
                    productName:lang("Product Name", `اسم المنتج`),
                    productPrice:lang("Product Price", `سعر المنتج`),
                    productDisc:lang('Product Description (optional)', `وصف المنتج (إختياري)`),
                    productImgURL:lang("Product Image URL (optional)",`رابط صورة للمنتج (إختياري)`),
                }
            }
        },
        //custom_id !== 14 delete_msg_with_id
        delete_msg_with_id:{
            badMsg:{
                noMsgs:lang('this channel have no massges', ` عذرا لكن لا يمكنني إجاد رسائل في هذه القناه لحذفها`),
            },
            finalMsg:{
                ok:lang('Log deleted', `تم حذف السجل`),
                ok2:lang('Log deleted', `تم حذف السجل`),
                notOK:lang('message not found', `عذرا لكن لا يمكنني إجاد السجل المقصود`)
            }
        },
        //custom_id !== 15 delete_msg
        delete_msg:{
            loding:lang('...Laoding', `جار التحميل...`)
        },
        //custom_id !== 16 delete_product__model
        delete_product__model:{
            badMsg:{
                sectionNotFound:lang('somthing is wrong connot find the section', `هناك خطأ ما لا يمكنني إجاد القسم`),
                productNotFoundsMsg:{
                    _1:lang(`you don't have a product with name`, `عذراً ليس لديك منتج بإسم`),
                    _2:lang('in section', `في القسم`),
                },
            },
            finalMsg:{
                msg:{
                    _1:lang('are you sure that you want to delete prodcut', `هل أنت متأكد من حذف منتج`),
                    _2:lang(`in section`, `في القسم`)
                },
                buttons:{
                    yesDelete:lang('Yes', `نعم`)
                }
            }
        },
        //custom_id !== 17 delete_product_yes
        delete_product_yes:{
            badMsgs:{
                productNotFound:{
                    _1:lang(`there is no prodcut with name`, `لا يوجد منتج بالإسم`),
                    _2:lang('in section', `في القسم`)
                }
            },
            finalMsg:{
                msg:{
                    _1:lang('product', `تم حذف المنتج`),
                    _2:lang('has been deleted in section', `بنجاح داخل القسم`)
                }
            }
        },
        //custom_id !== 18 delete_product
        delete_product:{
            model:{
                title:lang('delete Product', `حذف منتج`),
                productNameLable:lang("Product Name", `إسم المنتج`)
            }
        },
        //custom_id !== 19 delete_Section__model
        delete_Section__model:{
            badMsgs:{
                sectionNotFound:lang('there is no section with name', `لا يوجد قسم بإسم`)
            },
            finalMag:{
                msg:{
                    _1:lang('are you sure that you want to delete section', 'هل انت متأكد من حذف القسم'),
                    _2:lang('with all it products', 'ب جميع منتجاته'),
                },
                buttons:{
                    yesDelete:lang('Yes', `نعم`)
                }
            }
        },
        //custom_id !== 20 delete_Section__model
        delete_section_yes:{
            badMsgs:{
                sectionNotFound:lang('there is no section with name' , 'لا يوجد قسم بإسم')
            },
            finalMag:{
                msg:{
                    _1:lang('section', `تم حذف القسم`),
                    _2:lang('deleted.', `بنجاح`)
                }
            }
        },
         //custom_id !== 21 delete_Section__model
        delete_section:{
            model:{
                title:lang('Delete Products Section', `حذف منتج داخل القسم`),
                productNameLable:lang(`Section Name`, `إسم المنتج`)
            }
        },
        //custom_id !== 22 delete_single_product__model
        delete_single_product__model:{
            badMsgd:{
                productNotFound:lang(`you don't have a product with name`, `ليس لديك منتج بإسم`),
            },
            finalMsg:{
                msg:{
                    _1:lang('are you sure that you want to delete prodcut', `هل انت متأكد من حذف المنتج`)
                },
                buttons:{
                    yesDelete:lang('Yes', 'نعم')
                }
            }
        },
        //custom_id !== 23 delete_single_product_yes
        delete_single_product_yes:{
            badMsgs:{
                productNotFound:lang('there is no product with name', `لا سوجد منتج بإسم`)
            },
            finalMsg:{
                msg:{
                    _1:lang('product', `تم حذف المنتج`),
                    _2:lang('deleted.', `بنجاح`),
                }
            }
        },
        //custom_id !== 24 delete_single_product
        delete_single_product:{
            model:{
                title:lang('Delete Single Products', `حذف منتج فردي`),
                productNameLable:lang("Single Product Name", `إسم المنتج`)
            }
        },
        //custom_id !== 25 delete_this_single_product
        delete_this_single_product:{
            finalMsg:{
                msg:{
                    _1:lang(`are you sure that you want to delete prodcut`, `هل أنت متأكد من حذف المنتج`)
                },
                buttons:{
                    yesDeleteButton:lang(`Yes`, `نعم`)
                },
            }
        },
        //custom_id !== 26 is_invoice_payed
        is_invoice_payed:{
            invoiceHasCanceled:{
                embid:{
                    title:lang('Cancelled Invoice', `إلغاء الفاتورة`),
                    description:lang(`This invoice ***has been cancelled*** Do you want to delete the above log?`, `***لقد تمت إلغاء الفاتورة*** هل تريد حذف السجل الخاص بها`),
                    fealds:{
                        username:lang('Username', `إسم المستخدم`),
                        userId:lang(`User Id`, `آي دي المستخدم`),
                        msgId:lang(`Message Id`, `آي دي رسالة السجل`)
                    }
                },
                buttons:{
                    yesDelete:lang(`Yes`, `نعم`),
                },
                finalMsg:{
                    msg:{
                        _1:lang('this invoice has been canceled', `تم إلغاء هذه الفاتورة`)
                    }
                }
            },
            notPaidInvoice:{
                embid:{
                    title:lang('this invoice does not paid yet', `لم يتم دفع الفاتورة بعد`)
                },
                buttons:{
                    pay:lang('Invoice Link', `رابط الفاتورة`)
                }
            },
            badMsgs:{
                noInvoiceYet:lang('you dont have an invoice yet', `ليس لديك أي فواتير بعد`),
                iCantFindInvoice:lang('i cant find your invoice', `عذراَ لا يمكنني إيجاد فاتورتك`)
            },
            paidInvoice:{
                embid:{
                    title:lang('This invoice has been paid ($$$)', `تم دفع هذه الفاتورة ($$$)`),
                    description:{
                        congrat:{
                            _1:lang(`congrats 🎆🎈
the customer`, `هنيئاَ العميل`
                            ),
                            _2:lang(`***has paid his invoice***`, `***قام ب دفع فاتورته***`)
                        },
                        words:{
                            User:lang(`User`, `المستخدم`),
                            Total_Price:lang(`Total Price`, `السعر الكامل`),
                            invoice_created_at:lang(`invoice created at`, `تم إنشاء الفاتورة في`),
                            invoice_paid_at:lang(`invoice paid at`, `تم دفع الفاتورة في`),
                            By_UTC_Time:lang(`By UTC Time`, `حسب توقيت UTC`),
                            products:lang(`products`, `المنتجات`),
                            product_name:lang(`product name`, `إسم المنتج`),
                            quantity:lang(`quantity`, `الكمية`),
                            single_prodcut_price:lang(`single prodcut price`, `سعر المنتج الواحد`),
                            total_product_price:lang(`total product price`, `سعر المنتج مع الكميات`)
                        }
                    }
                },
            },
            finalUserMsg:{
                embid:{
                    title:lang('Your paypemt has been completed', `تم إكمال عملية ادفع ب نجاح`),
                    description:lang('Thank you', `شكراً لك`)
                },
                buttons:{
                    invoiceLink:lang(`Invoice Link`, `رابط الفاتورة`)
                }
            }
        },
        //custom_id !== 27 remove_basket_product_yes
        remove_basket_product_yes:{
            badMsgs:{
                emptyBasket:lang('your basket is empty', `سلتك فارة`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`product`, `تم إزالة المنتج`),
                    _2:lang(`removed.`, `بنجاح`)
                }
            }
        },
        //custom_id !== 28 remove_basket_product
        remove_basket_product:{
            finalMsg:{
                msg:{
                    _1:lang(`are you sure that you want to remove`, `هل انت متأكد من إزالة المنتج`)
                },
                buttons:{
                    yesRemove:lang('Yes', `نعم`)
                }
            }
        },
        //custom_id !== 29 remove_from_basket__model
        remove_from_basket__model:{
            badMsgs:{
                qunttyMustNumber:lang('quantity must be a number', `الكمية يجب ان تكون رقماً`),
                emptyBasket:lang(`your basket is empty`, `سلتك فارغة`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`removed from your basket with quantity`, `تمت إزالة المنتج بنجاح بالكمية`)
                }
            }
        },
        //custom_id !== 30 remove_from_basket
        remove_from_basket:{
            model:{
                title:lang('Remove Products From Basket', `إزالة منتج من السله`),
                quantityLable:lang(`Quantity`, `الكمية`)
            }
        },
        //custom_id !== 31 remove_from_my_basket
        remove_from_my_basket:{
            badMsgs:{
                emptyBasket:lang('your basket is empty', `سلتك فارغة`),
            },
            selector:{
                words:{
                    basket:lang(`basket`, `سلة`),
                    price:lang(`price`, `السعر`)
                }
            }
        },
        //custom_id !== 32 remove_from_my_basket
        show_all_section:{
            badMsgs:{
                noSections:lang('you dont have any section yet', `ليس لديك أي قسم بعد`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`all the name of the sections you have`, `جميع أسماء الأقسام التي لديك`)
                }
            }
        },
        //custom_id !== 33 remove_from_my_basket
        show_all_single_product:{
            badMsgs:{
                noProducts:lang('you dont have any ***Single products*** yet', `ليس لديك أي ***منتج فردي*** بعد`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`all single products found`, `تم إجاد جميع أسماء منتجاتك الفردية`)
                }
            }
        },
        //custom_id !== 34 show_me_my_basket
        show_me_my_basket:{
            badMsgs:{
                emptyBasket:lang('your basket is empty', `سلتك فارغة`)
            },
            selector:{
                basket:lang(`basket`, `سلة`),
                price:lang(`price`, `السعر`)
            }
        },
        //custom_id !== 35 show_one_single_product__model
        show_one_single_product__model:{
            badMsgs:{
                productNotFound:lang(`You don't have a prodcut with name`, `ليس لديك منتج فردي ب إسم`)
            },
            finalMsg:{
                msg:{
                    _1:lang(`prodcut`, `تم إيجاد المنتج`),
                    _2:lang(`found`, `بنجاح`)
                }
            }
        },
        //custom_id !== 36 show_one_single_product
        show_one_single_product:{
            model:{
                title:lang('Show One Single Product', `إضهار منتج فردي`),
                productNameLable:lang("Product Name", `إسم المنتج`)
            }
        },
        //custom_id !== 37 show_product_basket
        show_product_basket:{
            embid:{
                title:lang('product basket', `منتجات السلة`),
                words:{
                    Price:lang('Price', `السعر`),
                    Product_Name:lang(`Product Name`, `إسم المنتج`)
                },
            }
        },
        //custom_id !== 38 submit_my_invoice
        submit_my_invoice:{
            badMsgs:{
                noInvoice:lang(`you dont have any invoice to pay yet`, `ليس لديك أي منتج لتدفعه بعد`)
            },
            finalMsg:{
                embid:{
                    title:{
                        _1:lang(`Invoice for`, `فالورة للمستخدم`)
                    },
                    // here
                    description:lang(`this invoice **does not paid yet**

**why is my basket is locked?**
your basket locked because you haven't paid your invoice yet
if you paid your invoice, press **I Pide The Invoice** Button
and your basket will unlock dynamically

**what do I do to unlock my basket with out paying?**
press **Cancel invoice** Button
to cancel the invoice you created
and invoice will get canceled then
your basket will get unlocked`, 
`**لم يتم** دفع الفاتورة بعد

**لماذا لا يمكنني التحكم ب سلتي**
تم إقفال سلتك لعدم إكمال إجرائات الدفع بعد
في حال تم دفع الفاتروة قم بالغط على **لقد دفعت فاتورتي**
و ستم فك قفل سلتك بعد ذالك

كيف يمكنني فتح قفل سلتي دون الدفع
إضغط على **إلغاء الفاتورة**
لإلغاء فاتورتك
و سيتم الغاء فاتورتم و يعد ذالك
سيتم فتح قفل سلتك`
                    ),
                    filds:{
                        username:lang(`Username`, `إسم المستخدم`),
                        userId:lang('User Id', `آي دي المستخدم`)
                    }
                },
                buttons:{
                    invouceLink:lang(`Invoice Link`, `رابط الفاتورة`),
                    iPaidInvoice:lang(`I Pide The Invoice`, `لقد دفعت فاتورتي`),
                    cancelInvoice:lang(`Cancel invoice`, `إلغاء الفاتورة`)
                }
            }
        },
        //custom_id !== 39 update_product__model
        update_product__model:{
            badMsgs:{
                productNameTooLong:lang(`new product name is to long`, `اسم المنتج الجديد طويل جداً`),
                noSection:lang(`somthing is wrong connot find the section`, `هناك خطأ ما لا يمكنني إيجاد القسم المطلوب`),
                priceMustNuber:lang(`the product ***dose not added !!!***
price must be a number !!!`, `***لم يتم*** إضافة منتج بعد
السعر يجب ان يكون رقماً`),
                priceToHigh:lang(`the product ***dose not added !!!***
the price is too high`, `***لم يتم*** إضافة منتج بعد
السعر جداُ مرتفع`),
                productNotFound:{
                    _1:lang(`there is no product with name`, `ليس لديك منتج بالإسم`),
                    _2:lang(`in section`, `في القسم`),
                },
                thereAnotherProduct:{
                    _1:lang(`the product`, `لديك بالفعل منتج`),
                    _2:lang(`is already in section`, `داخل القسم`),
                }
            },
            finalMsg:{
                _1:lang(`product`, `تم تحديث المنتج`),
                _2:lang(`updated in section`, `في القسم`),
                _3:lang(`Old Product Name`, `الإسم القديم`),
                _4:lang(`New Product Name`, `الإسم الجديد`),
                _5:lang(`price`, `السعر`)
            }
        },
        //custom_id !== 40 update_product
        update_product:{
            model:{
                title:lang('Update Products Section', `تحديث منتج داخل قسم`),
                lables:{
                    oldName:lang("old Product Name", `الإسم القديم للمنتج`),
                    newName:lang("new Product Price", `الإسم الجديد للمنتج`),
                    productPrice:lang("Product Price", `سعر المنتج`)
                }
            }
        },
        //custom_id !== 41 update_Section__model
        update_Section__model:{
            basMsgs:{
                sectionNotFound:lang(`there is no section called`, `لا يوجد قسم يدعى`)
            },
            finalMsg:{
                _1:lang(`section`, `تم إيجاد القسم`),
                _2:lang(`has found you can edit it`, `و يمكنك التعديل عليه`)
            }
        },
        //custom_id !== 42 update_Section__model
        update_section:{
            model:{
                title:lang('Update Products Section', `تحديث قسم`),
                sectionNameLable:lang("Section Name", `إسم القسم`)
            }
        },
        //custom_id !== 43 update_single_product__model
        update_single_product__model:{
            badMsgs:{
                productToLoong:lang(`product name is too long`, `إسم المنتج طويل جداَ`),
                priceMustBeANumber:lang(`the product ***dose not added !!!***
price must be a number !!!`, `***لم يتم*** إضافة منتج بعد
السعر يجب ان يكون رقماً`
                ),
                priceToHigh:lang(`the product ***dose not added !!!***
the price is too high`, `***لم يتم*** إضافة منتج بعد
السعر جداُ مرتفع`
                ),
                productNotFound:lang(`You don't have a prodcut with name`, `ليس لديك منتج  فردي بالإسم`),
                thereIsAnotherProduct:lang(`You already have a prodcut with name`, `لديك باللإعل منج بالإسم`)
            },
            finaMsg:{
                msg:{
                    _1:lang(`prodcut`, `تم تحديث المنتج `),
                    _2:lang(`has been Updated`, `بنجاح`),
                    _3:lang(`Old Name`, `إسم المنتج القديم`),
                    _4:lang(`New Name`, `إسم المنتج الجديد`),
                    _5:lang(`price`, `السعر`),
                }
            },
        },
         //custom_id !== 44 update_single_product
        update_single_product:{
            model:{
                title:lang(`Update Single Product`, `تحديث منتج فردي`), 
                lables:{
                    oldName:lang("Product Old Name", `إسم المنتج القديم`),
                    newName:lang("Product New Name", `إسم المنتج الجديد`),
                    price:lang("Product Price", `سعر المنتج`),
                    disc:lang("Product Description (optional)", `وصف المنتج (إختياري)`),
                    imageURL:lang("Product Image URL (optional)", `رابط صورة للمنتج (إختياري)`),
                }
            }
        },
        //custom_id !== 45 update_this_single_product__model
        update_this_single_product__model:{
            badMsgs:{
                productNameToLoog:lang(`product name is too long`, `إسم المنتج طويل جداَ`),
                productNotFoundError:lang('somthing is wrong connot find the product', ``),
                priceMusetBeANumber:lang(`the product ***dose not added !!!***
price must be a number !!!`, `***لم يتم*** إضافة منتج بعد
السعر يجب ان يكون رقماً`
                ),
                priceToHigh:lang(`the product ***dose not added !!!***
the price is too high`, `***لم يتم*** إضافة منتج بعد
السعر جداُ مرتفع`
                ),
                productNotFound:lang(`You don't have a prodcut with name`, `ليس لديك منتج فردي بالإسم`),
                anotherProduct:lang(`You already have a prodcut with name`, `لديك بالفعل منتج فردي بالإسم `)
            },
            finalMsg:{
                msg:{
                    _1:lang(`prodcut`, `تم تحديث المنتج`),
                    _2:lang(`has been Updated`, `بنجاح`),
                    _3:lang(`Old Name`, `إسم المنتج القديم`),
                    _4:lang(`New Name`, `إسم المنتج الجديد`),
                    _5:lang(`price`, `السعر`),
                }
            }
        },
        //custom_id !== 46 update_this_single_product__model
        update_this_single_product:{
            model:{
                title:lang('Update Single Product', `تحديث منتج فردي`),
                lables:{
                    newName:lang("New Product Name", `إسم المنتج الجديد`),
                    price:lang(`Product Price`, `سعر المنتج`),
                    disc:lang("Product Description (optional)", `وصف المنتج (إختياري)`),
                    imageURL:lang("Product Image URL (optional)", `رابط صورة للمنتج (إختياري)`)
                }
            }
        }
    },
    // main !== 4 paypal
    payPal:{
        canceled_invoice_unlocked_basket:lang('Invoice Canceled And Your Basket Is Unlocked', `تم إلغاء فاتورتك و تم فتح قفل سلتك`),
        invoice_notfound_unlocked_basket:lang('Invoice is not found or has been canceled', `لم يتم العثور على الفاتورة او قد تم إلغائها`)
    }
}
