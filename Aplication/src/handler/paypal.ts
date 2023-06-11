import axios, { Method } from "axios";
import paypal from "@paypal/checkout-server-sdk";
import Crypto from "crypto"
import { PaypalItme } from "../types";
import { Item } from "@paypal/checkout-server-sdk/lib/orders/lib";
const isDevelopment = process.env.PRODUCTION == "true" ? false : true
let paypalCore = isDevelopment ?
new paypal.core.SandboxEnvironment(process.env.PAY_PAL_CLIENT_ID!, process.env.PAY_PAL_CLIENT_SECRET!) :
new paypal.core.LiveEnvironment(process.env.PRODUCTION_PAY_PAL_CLIENT_ID!, process.env.PRODUCTION_PAY_PAL_CLIENT_SECRET!) ;
export const payPalClient = new paypal.core.PayPalHttpClient(paypalCore);
class PaypalApi {
    private client_id:string = isDevelopment ? process.env.PAY_PAL_CLIENT_ID! :  process.env.PRODUCTION_PAY_PAL_CLIENT_ID!
    private client_secrit:string = isDevelopment ? process.env.PAY_PAL_CLIENT_SECRET! :  process.env.PRODUCTION_PAY_PAL_CLIENT_SECRET!
    private isSandBox:boolean = isDevelopment
    private client_email = isDevelopment ? process.env.PAY_PAL_ACOUNT_EMAIL! :  process.env.PRODUCTION_PAY_PAL_ACOUNT_EMAIL!
    private baseURL = {
        sandbox: "https://api-m.sandbox.paypal.com",
        production: "https://api-m.paypal.com"
    };

    public our_prcent = {
        payment:3,
        donation:3
    };
    private async sendReq({path, method = "post", body, headers, v}:{path:string, method?:Method, body?:any, headers?:any, v:"v1" | "v2"}){
        if(!path.startsWith("/")){
            const msg ="path must start with (/)"
            throw Error(msg)
        }
        const apiClientCredentials = Buffer.from(this.client_id + ":" + this.client_secrit).toString("base64")
        const req = await axios({
            url:`${this.isSandBox ? this.baseURL.sandbox : this.baseURL.production}/${v}${path}`,
            method:method,
            headers:{
                Authorization: `Basic ${apiClientCredentials}`,
                ...headers
            },
            data:body
        })
        return req
    }
    public async auth(){
        try{
            const req = await this.sendReq({
                path:"/oauth2/token",
                v:"v1",
                body:"grant_type=client_credentials"
            })
            if(req.status == 200){
                return true
            } else {
                return false
            }
        } catch(err){
            console.log(err)
            return false
        }
    }
    public async getAccessToken(){
        const req = await this.sendReq({
            path:"/oauth2/token",
            v:"v1",
            body:"grant_type=client_credentials"
        })
        return req.data.access_token
    }
    public getPrsent(total:number, prcent:number){
        let finalPrcent = Number(`0.${`${prcent}`.length == 1 ? `0${prcent}` : `${prcent}`}`)
        const get_our = total * finalPrcent
        const them = total - get_our
        return {
            our:`${get_our}`.includes(".") ? Number(get_our.toFixed(2)) : get_our,
            them:`${them}`.includes(".") ? Number(them.toFixed(2)) : them
        }
    }
    public pars_prcent(theamount:number){
        return `${theamount}`.includes(".") ? `${theamount}`.split(".")[1].length == 1 ? `${`${theamount}`.split(".")[0]}.${`${theamount}`.split(".")[1]}0` : `${theamount}` : `${theamount}`
    }
    public async create_Pay({email, itmes, user_id, server_id, logs_channel_id}:{
        user_id:string
        itmes:{
            items:PaypalItme[],
            total:number
        },
        server_id:string
        email:string,
        logs_channel_id:string
    }){
        let request = new paypal.orders.OrdersCreateRequest();
        const getFinalDivision = () => {
            return {
                store_commission:`${itmes.total}`,
                our_commission:`${this.getPrsent(itmes.total, this.our_prcent.payment).our}`,
            }
        }
        const finalDivision = getFinalDivision()
        const getRandomString = () => Crypto.randomBytes(20).toString("base64").replace(/[\=\+\/\\]/g, "")
        request.requestBody({
            intent: "CAPTURE",
            application_context:{
                shipping_preference:"NO_SHIPPING",
            },
            purchase_units: [
                {
                    items:itmes.items as Item[],
                    reference_id:`${getRandomString()}/${user_id}/${server_id}/${logs_channel_id}`,
                    payee:{
                        email_address:email,
                    },
                    amount: {
                        currency_code: "USD",
                        value: finalDivision.store_commission,
                        breakdown:{
                            item_total:{
                                currency_code:"USD",
                                value:finalDivision.store_commission
                            }
                        } as any
                    },
                },
                {
                    items:[
                        {
                            name:"Transaction Fees",
                            quantity:`1`,
                            category: "DIGITAL_GOODS",
                            unit_amount:{
                                value:finalDivision.our_commission,
                                currency_code:"USD"
                            },
                        
                        }
                    ],
                    reference_id:`${getRandomString()}/${user_id}/${server_id}/${logs_channel_id}`,
                    amount: {
                        currency_code: "USD",
                        value:finalDivision.our_commission,
                        breakdown:{
                            item_total:{
                                currency_code:"USD",
                                value:finalDivision.our_commission
                            }
                        } as any
                    },
                }
            ],
        });
        request.headers["Prefer"] = "return=representation"
        let response = await payPalClient.execute(request);
        return response.result
    }

    public async create_checkOut({id}:{id:string}){
        const request = new paypal.orders.OrdersCaptureRequest(id);
        request.requestBody(({} as any))
        // Call API with your client and get a response for your call
        let response = await payPalClient.execute(request);
        return response.result
    }

    public createAuthAssertion({seller_email}:{seller_email:string}){
        const clientID = this.client_id;
        const merchantIDOrEmail = seller_email;
        const auth1 = Buffer.from(JSON.stringify({alg:"none"})).toString("base64").replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        const auth2 = Buffer.from(JSON.stringify({
            iss:clientID,
            payer_id:merchantIDOrEmail
        })).toString("base64").replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        return `${auth1}.${auth2}.`
    }

    public async create_seller_reafound({capturesID, seller_email}:{capturesID:string, seller_email:string}){
        //https://api.sandbox.paypal.com/v2/payments/captures/1YC26845Y67315828/refund
        const refoundRequst = new paypal.payments.CapturesRefundRequest(capturesID)
        const authAssertion = this.createAuthAssertion({seller_email})
        refoundRequst.headers["PayPal-Auth-Assertion"] = authAssertion
        let response = await payPalClient.execute(refoundRequst);
        return response.result
    }
    public async create_my_refound({capturesID}:{capturesID:string}){
        const refoundRequst = new paypal.payments.CapturesRefundRequest(capturesID)
        let response = await payPalClient.execute(refoundRequst);
        return response.result
    }


    public async get_ivcoice_by_order_id({orderID}:{
        orderID:string
    }){
        const req = await this.sendReq({
            path:`/checkout/orders/${orderID}`,
            v:"v2",
            method:"GET"
        })
        const referId = req.data.purchase_units[0].reference_id.split("/")
        return {
            server_id:referId[2],
            user_id:referId[1],
            logs_channel_id:referId[3],
            products:req.data.purchase_units[0].items || req.data.purchase_units[1].items,
            created_at:req.data.create_time || req.data.update_time,
            all_data:req.data,
            total:isNaN(Number(req.data.purchase_units[0]?.amount?.breakdown?.item_total?.value)) ||
            isNaN(Number(req.data.purchase_units[1]?.amount?.value)) ? 
            Number(req.data.purchase_units[0].amount.value) + Number(req.data.purchase_units[1].amount.value) : 
            Number(req.data.purchase_units[0]?.amount?.breakdown?.item_total?.value) +
            Number(req.data.purchase_units[1]?.amount?.value),
            them_total:isNaN(Number(req.data.purchase_units[0]?.amount?.breakdown?.item_total?.value)) ?
            Number(req.data.purchase_units[0].amount.value) : 
            Number(req.data.purchase_units[0]?.amount?.breakdown?.item_total?.value),
        }
    }
    public async sendMony({
        sender_user_id,
        resiver_user_id,
        amount,
        email
    }: {
        sender_user_id:string,
        resiver_user_id:string,
        amount:number,
        email:string
    }){
        let request = new paypal.orders.OrdersCreateRequest();
        const getFinalDivision = () => {
            return {
                store_commission:`${this.getPrsent(amount, this.our_prcent.donation).them}`,
                our_commission:`${this.getPrsent(amount, this.our_prcent.donation).our}`
            }
        }
        const finalDivision = getFinalDivision()
        const getRandomString = () => Crypto.randomBytes(20).toString("base64").replace(/[\=\+\/\\]/g, "")
        request.requestBody({
            intent: "CAPTURE",
            application_context:{
                shipping_preference:"NO_SHIPPING"
            },
            purchase_units: [
                {
                    items:[
                        {
                            name:"Donation Amount",
                            quantity:`1`,
                            category: "DIGITAL_GOODS",
                            unit_amount:{
                                value:finalDivision.store_commission,
                                currency_code:"USD"
                            },
                        }
                    ],
                    reference_id:`${getRandomString()}/${sender_user_id}/${resiver_user_id}/donation`,
                    payee:{
                        email_address:email,
                    },
                    amount: {
                        currency_code: "USD",
                        value: finalDivision.store_commission,
                        breakdown:{
                            item_total:{
                                currency_code:"USD",
                                value:finalDivision.store_commission
                            }
                        } as any
                    },
                },
                {
                    items:[
                        {
                            name:"Transaction Fees",
                            quantity:`1`,
                            category: "DIGITAL_GOODS",
                            unit_amount:{
                                value:finalDivision.our_commission,
                                currency_code:"USD"
                            },
                        }
                    ],
                    reference_id:`${getRandomString()}/${sender_user_id}/${resiver_user_id}/donation`,
                    amount: {
                        currency_code: "USD",
                        value: finalDivision.our_commission,
                        breakdown:{
                            item_total:{
                                currency_code:"USD",
                                value:finalDivision.our_commission
                            }
                        } as any
                    },
                }
            ],
        });
        request.headers["Prefer"] = "return=representation"
        let response = await payPalClient.execute(request);
        return response.result
    }
}
 
export const YoFi_PayPalClient = new PaypalApi()