var div:YoFiElement
// var connectPaypalButton:YoFiElement
// var connectOkButton:YoFiElement
// var connectNoButton:YoFiElement
// var paypal_puppElm:YoFiElement
const fackImgSrc = "https://cdn.discordapp.com/icons/938140512647520306/5902f3b9494911ee2dcf8ffb976b02fa.webp?size=96"
const renderIndex = async() => {
   var is_api_render_error = false
    var renderData:any;
    if(localStorage.getItem("user_data")){
        renderData = JSON.parse(atob(localStorage.getItem("user_data")!))
    } else {
        const get_render_data = await fetch("/api/v1/dashbord/all/get_user_data", {
            method:"get"
        })
        renderData = await get_render_data.json()
        if(is_respons_error(renderData)){
            is_api_render_error = true
        }
        localStorage.setItem("user_data", btoa(JSON.stringify(renderData)))
    }
    
    const getLogs =  await fetch("/api/v1/dashbord/user/render_log", {
        method:"get"
    })
    const logs_data = await getLogs.json()
    if(is_respons_error(logs_data)){
        is_api_render_error = true
    }
    user_user = logs_data.try
    _page(
        is_api_render_error ? _div({classes:"inint_page"}) : 
        _div(
            {
                classes:"inint_page"
            },
            my_Store_Payments_filtter_pubb_input(),
            privte_donations_filtter_pubb_input(),
            My_Servers_Donations_filtter_pubb_input(),
            _paypalInput(),
            _div(
                {
                    classes:"cards"
                },
                UserSide(renderData.username, renderData.user_image, renderData.tag, renderData.pay_pal_email ? true : false), pagePathSide("Logs", "/images/log_img.png", "in this page you can see all your moves", "fff"),
                renderData.pay_pal_email ? PayPalSide(renderData.pay_pal_email) : PayPalSide(),
                // paypal_pubb()
            ),
            _div(
                {
                    classes:"logs"
                },
                _donation_logs({
                    title:"My Servers Donations",
                    logs_cards:Render_Log.My_Servers_Donations(logs_data.servers_donations)
                }),
                _donation_logs({
                    title:"Private Donations",
                    logs_cards:Render_Log.Private_Donations(logs_data.privte_donations, renderData)
                }),
                _donation_logs({
                    title:"Store Payments",
                    logs_cards:Render_Log.Store_Payments(logs_data.my_payments, renderData)
                }),
            )
        )
    )

}

renderIndex()
