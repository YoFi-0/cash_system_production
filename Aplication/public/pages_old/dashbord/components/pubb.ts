const _filtter_pupp = ({input,title, id, styles, onSbmit}:{input:YoFiElement[], title:string, id:string, styles?:YoFiStyles, onSbmit?:((elm: YoFiElement) => Promise<{
    on_done: () => {
        mag: string;
        is_error: boolean;
    };
}>) | undefined}) => {
    var thisFather:YoFiElement
    const hidePubb = async() => {
        thisFather.changeStyles({
            opacity:"0",
        })
        await Sleep.sleepByMelSuc(500)
        thisFather.changeStyles({
            display:"none",
        })
    }
    return _div(
        {
            classes:"filtter_pupp",
            id:id,
        },
        (elm) => {
            elm.onClick(async(e) => {
                if((e.target as HTMLDivElement).id == elm.attrs?.id){
                    await hidePubb()
                }
            })
            thisFather = elm
        },
        _div(
            {
                classes:"mid",
                style:styles
            },
            _inputsHolder({
                args:input,
                title:title,
                onClose:async() => {
                    await hidePubb()
                },
                onEveryThingDone:async() => {
                    await hidePubb()
                },
                onSbmit:onSbmit
            })
        )
    )
}

class Filtter_Pubb {
    elm:(styles?:YoFiStyles, onSubmit?:(elm: YoFiElement) => Promise<{
        on_done: () => {
            mag: string;
            is_error: boolean;
        };
    }>) => YoFiElement;
    id:string
    constructor(elm: (styles?:YoFiStyles, onSubmit?:((elm: YoFiElement) => Promise<{
        on_done: () => {
            mag: string;
            is_error: boolean;
        };
    }>) | undefined) =>YoFiElement, id:string){
        this.elm = elm
        this.id = id
    }
    public async show (fill?:{input_name:string, value:string}[]) {
        _(`#${this.id}`).changeStyles({
            display:"flex"
        })
        await Sleep.sleepByMelSuc(500)
        _(`#${this.id}`).changeStyles({
            opacity:"1"
        })
        if(fill?.length){
            Array.from(_(`#${this.id}`).element.children![0].querySelector(".linyer")!.querySelectorAll("label")).forEach((inputName) => {
                for(let fliiVlue of fill){
                    if(fliiVlue.input_name == inputName.textContent){
                        inputName.parentElement!.querySelector("input")!.value = fliiVlue.value
                    }
                }

            })
        }
    }
}

const _thisStore_filtter_PaymentsPupp = new Filtter_Pubb((style, onSbmit) => _filtter_pupp({
    id:"this_Store_payments",
    title:"Store Payments Filter",
    input:[
        _input_with_label("", "number", "Request lifter User ID", "none"),
        _input_with_label("", "text", "Request lifter Username", "none"),
        _input_with_label("", "number", "Payeer User ID", "none"),
        _input_with_label("", "text", "Payeer  Username", "none"),
        _input_with_label("", "number", "Total amount", "none"),
        _input_with_label("", "from_to", "Date", "none")
    ],
    onSbmit:onSbmit
}), "this_Store_payments")

const _donations_filtter_Pubb = new Filtter_Pubb((style, onSbmit) =>  _filtter_pupp({
    id:"donations_filter",
    title:"Donation Filter",
    input:[
        _input_with_label("", "number", "Donater User Id", "none"),
        _input_with_label("", "text", "Donater  Username", "none"),
        _input_with_label("", "number", "amount", "none"),
        _input_with_label("", "from_to", "Date", "none"),
    ],
    onSbmit:onSbmit
}),"donations_filter")

const my_Store_Payments_filtter_pubb = new Filtter_Pubb((style, onSbmit) => _filtter_pupp({
    id:"my_Store_Payments_filtter",
    title:"Server Payments Filter",
    input:[
        _input_with_label("", "number", "Request lifter User ID", "none"),
        _input_with_label("", "text", "Request lifter Username", "none"),
        _input_with_label("", "number", "Payeer User ID", "none"),
        _input_with_label("", "text", "Payeer  Username", "none"),
        _input_with_label("", "number", "Store Server ID", "none"),
        _input_with_label("", "text", "Store Server Name", "none"),
        _input_with_label("", "number", "Total amount", "none"),
        _input_with_label("", "from_to", "Date", "none"),
    ],
    onSbmit:onSbmit
}), "my_Store_Payments_filtter")

const privte_donations_filtter_pubb = new Filtter_Pubb((style, onSbmit) => _filtter_pupp({
    id:"privte_donations_filtter",
    title:"Privte Donation Filter",
    input:[
        _input_with_label("", "number", "Donater User Id", "none"),
        _input_with_label("", "text", "Donater Username", "none"),
        _input_with_label("", "number", "Donatet User Id", "none"),
        _input_with_label("", "text", "Donatet  Username", "none"),
        _input_with_label("", "number", "amount", "none"),
        _input_with_label("none", "select", "Donation Type", "none", [
            {
                name:"From me",
                value:"from_me"
            },
            {
                name:"To me",
                value:"to_me"
            },
            {
                name:"Both",
                value:"both"
            },
        ]),
        _input_with_label("", "from_to", "Date", "none"),
    ],
    onSbmit:onSbmit
}),"privte_donations_filtter")
const My_Servers_Donations_filtter_pubb = new Filtter_Pubb((styles, onSbmit) =>  _filtter_pupp({
        id:"my_servers_donations_filtter",
        title:"Servers Donations Filter",
        input:[
            _input_with_label("", "number", "Donatet Server Id", "none"),
            _input_with_label("", "text", "Donatet  Server Name", "none"),
            _input_with_label("", "number", "amount", "none"),
            _input_with_label("", "from_to", "Date", "none"),
        ],
        onSbmit:onSbmit
    }),
    "my_servers_donations_filtter"
)
const _paypal_pubb = new Filtter_Pubb((styles, onSbmit) =>  _filtter_pupp({
    id:"pay_pal_email",
    styles:styles,
    title:"Servers Donations Filter",
    input:[
        _input_with_label("", "email", "Paypal Email", "none"),
    ],
    onSbmit:onSbmit
}),
    "pay_pal_email"
)



const _thisStore_filtter_PaymentsPupp_input = () => _thisStore_filtter_PaymentsPupp.elm({}, async(elm) => {
    const inputHolder = elm.element.children[0].querySelectorAll(".input_lable")
    const request_lifter_user_id = (inputHolder[0].children[1] as HTMLInputElement).value.trim()
    const request_lifter_user_name = (inputHolder[1].children[1] as HTMLInputElement).value.trim()
    const payeer_user_id = (inputHolder[2].children[1] as HTMLInputElement).value.trim()
    const payeer_user_name = (inputHolder[3].children[1] as HTMLInputElement).value.trim()
    const total_amount = (inputHolder[4].children[1] as HTMLInputElement).value.trim()
    const from_date = (inputHolder[5].children[1].children[0].children[1] as HTMLInputElement).value.trim()
    const to_date = (inputHolder[5].children[1].children[1].children[1] as HTMLInputElement).value.trim()
    
    localStorage_create("log_card_1", {
        request_lifter_user_id:request_lifter_user_id,
        request_lifter_user_name:request_lifter_user_name,
        payeer_user_id:payeer_user_id,
        payeer_user_name:payeer_user_name,
        total_amount:total_amount,
        from_date:from_date,
        to_date:to_date,
    })
    const formData =  new FormData()
    formData.append("request_lifter_user_id", request_lifter_user_id || "")
    formData.append("request_lifter_user_name", request_lifter_user_name || "")
    formData.append("payeer_user_id", payeer_user_id || "")
    formData.append("payeer_user_name", payeer_user_name || "")
    formData.append("total_amount", total_amount || "")
    formData.append("from_date", from_date || "")
    formData.append("to_date", to_date || "")
    const HTTP_data = await send_HTTP_Requist({
        url:`/api/v1/dashbord/server/server_payments?from=0&limit=6&server_id=${this_target_server_id}`,
        formData
    })
    if(!HTTP_data){
        return {
            on_done:() => {
                return {
                    is_error:false,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    from_server_logs_start.this_store_payments = 0
    Array.from(_("#log_card_1").element.children).forEach(elm => {
        elm.remove()
    })
    _("#log_card_1").addChilds(...Render_Log.This_Store_Payments(HTTP_data))
    _("#log_card1").getSlector(".clear_filter").addStyles({
        display:"block"
    })
    if(HTTP_data.length >= 6){
        _("#log_card1 .More_Button").addStyles({
            display:"block"
        })
    } else {
        _("#log_card1 .More_Button").addStyles({
            display:"none"
        })
    }

    return {
        on_done:() => {
            return {
                is_error:false,
                mag:"done"
            }
        }
    }
});

const _donations_filtter_Pubb_input = () => _donations_filtter_Pubb.elm({}, async (elm) => {
    const inputHolder = elm.element.children[0].querySelectorAll(".input_lable")
    const donater_user_id = (inputHolder[0].children[1] as HTMLInputElement).value.trim()
    const donater_user_name = (inputHolder[1].children[1] as HTMLInputElement).value.trim()
    const amount = (inputHolder[2].children[1] as HTMLInputElement).value.trim()
    const from_date = (inputHolder[3].children[1].children[0].children[1] as HTMLInputElement).value.trim()
    const to_date = (inputHolder[3].children[1].children[1].children[1] as HTMLInputElement).value.trim()
    localStorage_create("log_card_2", {
        donater_user_id:donater_user_id,
        donater_user_name:donater_user_name,
        amount:amount,
        from_date:from_date,
        to_date:to_date,
    })
    const formData =  new FormData()
    formData.append("donater_user_id", donater_user_id || "")
    formData.append("donater_user_name", donater_user_name || "")
    formData.append("amount", amount || "")
    formData.append("from_date", from_date || "")
    formData.append("to_date", to_date || "")
    
    const HTTP_data = await send_HTTP_Requist({
        formData,
        url:`/api/v1/dashbord/server/server_donations?from=0&limit=6&server_id=${this_target_server_id}`
    })
    if(!HTTP_data){
        return {
            on_done:() => {
                return {
                    is_error:false,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    _("#log_card2").getSlector(".clear_filter").addStyles({
        display:"block"
    })
    if(HTTP_data.length >= 6){
        _("#log_card2 .More_Button").addStyles({
            display:"block"
        })
    } else {
        _("#log_card2 .More_Button").addStyles({
            display:"none"
        })
    }
    Array.from(_("#log_card_2").element.children).forEach(elm => {
        elm.remove()
    })
    from_server_logs_start.donation = 0
    _("#log_card_2").addChilds(...Render_Log.Donations(HTTP_data))
    return {
        on_done:() => {
            return {
                is_error:false,
                mag:"done"
            }
        }
    }
})

const my_Store_Payments_filtter_pubb_input = () => my_Store_Payments_filtter_pubb.elm({}, async (elm) => {
    const inputHolder = elm.element.children[0].querySelectorAll(".input_lable")
    const request_lifter_user_id = (inputHolder[0].children[1] as HTMLInputElement).value.trim()
    const request_lifter_user_name = (inputHolder[1].children[1] as HTMLInputElement).value.trim()
    const payeer_user_id = (inputHolder[2].children[1] as HTMLInputElement).value.trim()
    const payeer_user_name = (inputHolder[3].children[1] as HTMLInputElement).value.trim()
    const store_server_id = (inputHolder[4].children[1] as HTMLInputElement).value.trim()
    const store_server_name = (inputHolder[5].children[1] as HTMLInputElement).value.trim()
    const total_amount = (inputHolder[6].children[1] as HTMLInputElement).value.trim()
    const from_date = (inputHolder[7].children[1].children[0].children[1] as HTMLInputElement).value.trim()
    const to_date = (inputHolder[7].children[1].children[1].children[1] as HTMLInputElement).value.trim()
    localStorage_create("log_card_3", {
        request_lifter_user_id:request_lifter_user_id,
        request_lifter_user_name:request_lifter_user_name,
        payeer_user_id:payeer_user_id,
        payeer_user_name:payeer_user_name,
        store_server_id:store_server_id,
        store_server_name:store_server_name,
        total_amount:total_amount,
        from_date:from_date,
        to_date:to_date,
    })
    const formData =  new FormData()
    formData.append("request_lifter_user_id", request_lifter_user_id || "")
    formData.append("request_lifter_user_name", request_lifter_user_name || "")
    formData.append("payeer_user_id", payeer_user_id || "")
    formData.append("payeer_user_name", payeer_user_name || "")
    formData.append("store_server_id", store_server_id || "")
    formData.append("store_server_name", store_server_name || "")
    formData.append("total_amount", total_amount || "")
    formData.append("from_date", from_date || "")
    formData.append("to_date", to_date || "")
    const HTTP_data = await send_HTTP_Requist({
        url:"/api/v1/dashbord/user/store_payments?from=0&limit=6",
        formData
    })
    if(!HTTP_data){
        return {
            on_done:() => {
                return {
                    is_error:false,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    Array.from(_("#log_card_3").element.children).forEach(elm => {
        elm.remove()
    })
    from_user_logs_start.my_servers_donations = 0
    _("#log_card_3").addChilds(...Render_Log.Store_Payments(HTTP_data))
    _("#log_card3").getSlector(".clear_filter").addStyles({
        display:"block"
    })
    if(HTTP_data.length >= 6){
        _("#log_card3 .More_Button").addStyles({
            display:"block"
        })
    }  else {
        _("#log_card3 .More_Button").addStyles({
            display:"none"
        })
    }
    return {
        on_done:() => {
            return {
                is_error:false,
                mag:"done"
            }
        }
    }
})

const privte_donations_filtter_pubb_input = () => privte_donations_filtter_pubb.elm({}, async(elm) => {
    const inputHolder = elm.element.children[0].querySelectorAll(".input_lable")
    const donater_user_id = (inputHolder[0].children[1] as HTMLInputElement).value.trim()
    const donater_user_name = (inputHolder[1].children[1] as HTMLInputElement).value.trim()
    const donated_user_id = (inputHolder[2].children[1] as HTMLInputElement).value.trim()
    const donated_user_name = (inputHolder[3].children[1] as HTMLInputElement).value.trim()
    const amount = (inputHolder[4].children[1] as HTMLInputElement).value.trim()
    const donationType = (inputHolder[5].children[1] as HTMLInputElement).value.trim()
    const from_date = (inputHolder[6].children[1].children[0].children[1] as HTMLInputElement).value.trim()
    const to_date = (inputHolder[6].children[1].children[1].children[1] as HTMLInputElement).value.trim()
    localStorage_create("log_card_2", {
        donater_user_id:donater_user_id,
        donater_user_name:donater_user_name,
        donated_user_id:donated_user_id,
        donated_user_name:donated_user_name,
        amount:amount,
        donationType:donationType,
        from_date:from_date,
        to_date:to_date,
    })
    const formData =  new FormData()
    formData.append("donater_user_id", donater_user_id || "")
    formData.append("donater_user_name", donater_user_name || "")
    formData.append("donated_user_id", donated_user_id || "")
    formData.append("donated_user_name", donated_user_name || "")
    formData.append("amount", amount || "")
    formData.append("donationType", donationType || "")
    formData.append("from_date", from_date || "")
    formData.append("to_date", to_date || "")
    const HTTP_data = await send_HTTP_Requist({
        url:"/api/v1/dashbord/user/private_donations?from=0&limit=6",
        formData
    })
    
    if(!HTTP_data){
        return {
            on_done:() => {
                return {
                    is_error:false,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    _("#log_card2").getSlector(".clear_filter").addStyles({
        display:"block"
    })
    if(HTTP_data.length >= 6){
        _("#log_card2 .More_Button").addStyles({
            display:"block"
        })
    } else {
        _("#log_card2 .More_Button").addStyles({
            display:"none"
        })
    }
    Array.from(_("#log_card_2").element.children).forEach(elm => {
        elm.remove()
    })
    from_user_logs_start.private_donations = 0
     _("#log_card_2").addChilds(...Render_Log.Private_Donations(HTTP_data))
    return {
        on_done:() => {
            return {
                is_error:false,
                mag:"done"
            }
        }
    }
})

const My_Servers_Donations_filtter_pubb_input = () => My_Servers_Donations_filtter_pubb.elm({}, async(elm) => {
    const inputHolder = elm.element.children[0].querySelectorAll(".input_lable")
    const donated_server_id = (inputHolder[0].children[1] as HTMLInputElement).value.trim()
    const donated_server_name = (inputHolder[1].children[1] as HTMLInputElement).value.trim()
    const amount = (inputHolder[2].children[1] as HTMLInputElement).value.trim()
    const from_date = (inputHolder[3].children[1].children[0].children[1] as HTMLInputElement).value.trim()
    const to_date = (inputHolder[3].children[1].children[1].children[1] as HTMLInputElement).value.trim()
    localStorage_create("log_card_1", {
        donated_server_id:donated_server_id,
        donated_server_name:donated_server_name,
        amount:amount,
        from_date:from_date,
        to_date:to_date,
    })
    const formData =  new FormData()
    formData.append("user_user", user_user)
    formData.append("donated_server_id", donated_server_id)
    formData.append("donated_server_name", donated_server_name)
    formData.append("amount", amount)
    formData.append("from_date", from_date)
    formData.append("to_date", to_date)
    var reqData:any[] | null = null;
   
    try{
        await $.ajax({
            url: `/api/v1/dashbord/user/server_donations?from=0&limit=6`,
            type: 'POST',
            data: formData,
            success: function (data) {
                reqData = data
            },
            cache: false,
            contentType: false,
            processData: false
        });
    } catch(err){
        return {
            on_done:() => {
                return {
                    is_error:true,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    if(is_respons_error(reqData)){
        return {
            on_done:() => {
                return {
                    is_error:true,
                    mag:"somthing is wrong"
                }
            }
        }
    }
    if(reqData == null){
        return {
            on_done:() => {
                return {
                    is_error:true,
                    mag:"somthing is wrong"
                }
            }
        }
    }
     _("#log_card1").getSlector(".clear_filter").addStyles({
        display:"block"
    })
    if((reqData as any[]).length >= 6){
        _("#log_card1 .More_Button").addStyles({
            display:"block"
        })
    } else {
        _("#log_card1 .More_Button").addStyles({
            display:"none"
        })
    }
    Array.from(_("#log_card_1").element.children).forEach(elm => {
        elm.remove()
    })
    from_user_logs_start.my_servers_donations = 0
    _("#log_card_1").addChilds(...Render_Log.My_Servers_Donations((reqData as any[])))
    
    return {
        on_done:() => {
            return {
                is_error:false,
                mag:"done"
            }
        }
    }
})

const _paypalInput = () => {
    return _paypal_pubb.elm({
        height:"auto"
    }, async (elm) => {
        elm.element.id = "config_form";
        const email = elm.element.children[0].querySelectorAll(".input_lable")[0].children[1] as HTMLInputElement
        const formData =  new FormData()
        let on_done:() => {
            mag:string,
            is_error:boolean
        } = () => {
            return {
                is_error:true,
                mag:"Somthing Is Wrong"
            }
        }
        formData.append("user_user", user_user)
        formData.append("pay_pal_email", email.value.trim())
        await $.ajax({
            url: "/api/v1/dashbord/user/create_config",
            type: 'POST',
            data: formData,
            success: function (data) {
                if(is_respons_error(data)){
                    return {
                        on_done:() => {
                            return {
                                is_error:true,
                                mag:"somthing is wrong"
                            }
                        }
                    }
                }
                if(data == "missing fields"){
                    on_done = () => {
                        return {
                            is_error:true,
                            mag:"You Need To Add Your Paypal Email"
                        }
                    }
                } else if (data == "paypal updated"){
                    on_done = () => {
                        return {
                            is_error:false,
                            mag:"You your paypal has Been Updated"
                        }
                    }
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
        if(!on_done().is_error){
            if(localStorage.getItem("user_data")){
                const userData = JSON.parse(atob(localStorage.getItem("user_data")!))
                userData.pay_pal_email = email.value
                localStorage.setItem("user_data", btoa(JSON.stringify(userData)))
            }
            // _("#paypel_user_email").setText(`Paypal:${email.value}`)
            location.reload()
        }
        return {
            on_done:on_done
        } 
    })
}