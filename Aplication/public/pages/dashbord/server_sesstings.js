"use strict";
var div;
// var connectPaypalButton:YoFiElement
// var connectOkButton:YoFiElement
// var connectNoButton:YoFiElement
const renderServerConfig = async () => {
    // var paypal_puppElm:YoFiElement
    var renderData;
    var is_api_render_error = false;
    if (localStorage.getItem("user_data")) {
        renderData = JSON.parse(atob(localStorage.getItem("user_data")));
    }
    else {
        const get_render_data = await fetch("/api/v1/dashbord/all/get_user_data", {
            method: "get"
        });
        renderData = await get_render_data.json();
        if (is_respons_error(renderData)) {
            is_api_render_error = true;
        }
        localStorage.setItem("user_data", btoa(JSON.stringify(renderData)));
    }
    var target_server_id = "";
    window.location.href.split("?")[1].split("&").forEach(value => {
        if (value.startsWith("server_id")) {
            target_server_id = value.split("=")[1];
        }
    });
    const get_serverData = await fetch(`/api/v1/dashbord/server/render_log?server_id=${target_server_id}`, {
        method: "get"
    });
    const server_data = await get_serverData.json();
    if (is_respons_error(server_data)) {
        is_api_render_error = true;
    }
    user_user = server_data.try;
    _page(is_api_render_error ? _div({ classes: "inint_page" }) :
        _div({
            classes: "inint_page"
        }, _thisStore_filtter_PaymentsPupp_input(), _donations_filtter_Pubb_input(), _paypalInput(), _div({
            classes: "cards"
        }, UserSide(renderData.username, renderData.user_image, renderData.tag, renderData.pay_pal_email ? true : false), pagePathSide(server_data.server_data.server_name, server_data.server_data.server_img.endsWith("/null") ? "/images/store.jpg" : server_data.server_data.server_img, server_data.server_data.id ? "configaration added" : "no configaration yet", server_data.server_data.id ? "greeen" : 'red', server_data.server_data.rate ? `${server_data.server_data.rate}` : ""), renderData.pay_pal_email ? PayPalSide(renderData.pay_pal_email) : PayPalSide()), !server_data.is_bot_added ?
            _div({
                classes: "no_bot"
            }, _h1("The bot is not in your server"), _p("please add the bot in your server and come back to create your own digital store"), _a("Add The Bot ", {
                href: "https://discord.com/api/oauth2/authorize?client_id=1097245926453690389&permissions=2048&scope=bot%20applications.commands",
                target: "_blank"
            }))
            :
                _div({
                    classes: "logs"
                }, _div({
                    classes: "server_config"
                }, _inputsHolder({
                    args: [
                        _input_with_label(server_data.server_data.pay_pal_email, "text", "paypal Email", true),
                        _input_with_label(server_data.server_data.lang, "select", "language", true, [
                            {
                                name: "English",
                                value: "English"
                            },
                            {
                                name: "Arabic",
                                value: "Arabic"
                            },
                        ]),
                        _input_with_label(server_data.server_data.logs_channel, "number", "Logs channel ID", true),
                        _input_with_label(server_data.server_data.basket_embed_imageURL || "/images/bascket.svg", "image", "Basket Image", true),
                        _input_with_label(server_data.server_data.basket_embed_description, "textarea", "Basket Description", false),
                        _input_with_label(server_data.server_data.invite_link, "text", "Server Invite Link", false),
                        _input_with_label(server_data.server_data.disc, "textarea", "Server Description", false),
                        _input_with_label(server_data.server_data.products_mangers ? JSON.parse(server_data.server_data.products_mangers) : [], "multy number", "Store Mangers Users ID", false),
                    ],
                    title: "server config",
                    onSbmit: async (elm) => {
                        elm.element.id = "config_form";
                        const input_holder = elm.element.children[0].querySelectorAll(".input_lable");
                        const formData = new FormData();
                        formData.append("user_user", user_user);
                        formData.append("pay_pal", input_holder[0].children[1].value.trim());
                        formData.append("target_lang", input_holder[1].children[1].value.trim());
                        formData.append("target_logs_channel_id", input_holder[2].children[1].value.trim());
                        if (input_holder[3].children[1].children[2]?.files) {
                            formData.append("img", input_holder[3].children[1].children[2].files[0]);
                        }
                        formData.append("target_basket_embed_description", input_holder[4].children[1].value.trim());
                        formData.append("target_invite_link", input_holder[5].children[1].value.trim());
                        formData.append("target_discrption", input_holder[6].children[1].value.trim());
                        formData.append("target_products_mangers", JSON.stringify(Array.from(input_holder[7].children[1].children[0].children).map(input => input.value.trim())));
                        formData.append("target_server_id", target_server_id);
                        let on_done = () => {
                            return {
                                is_error: true,
                                mag: "Somthing Is Wrong"
                            };
                        };
                        try {
                            await $.ajax({
                                url: "/api/v1/dashbord/server/create_config",
                                type: 'POST',
                                data: formData,
                                success: function (data) {
                                    if (data == "missing fields") {
                                        on_done = () => {
                                            return {
                                                is_error: true,
                                                mag: "You Need To Fill The Required Inputs"
                                            };
                                        };
                                    }
                                    else if (data == "config updated" || data == "config created") {
                                        on_done = () => {
                                            _("#crad_info_2 .target_text").setText("configaration added").addStyles({
                                                color: "#05FF00"
                                            });
                                            return {
                                                is_error: false,
                                                mag: "Your Store Configration Has Been Updated"
                                            };
                                        };
                                    }
                                    else if (data == "server error" || data == "server err") {
                                        on_done = () => {
                                            return {
                                                is_error: true,
                                                mag: "server Error Somthin Is Worng"
                                            };
                                        };
                                    }
                                    else if (data == "invalid server id") {
                                        on_done = () => {
                                            return {
                                                is_error: true,
                                                mag: "The Cash System Bot Must Be On Your Server"
                                            };
                                        };
                                    }
                                    else {
                                        on_done = () => {
                                            return {
                                                is_error: true,
                                                mag: data
                                            };
                                        };
                                    }
                                },
                                cache: false,
                                contentType: false,
                                processData: false
                            });
                        }
                        catch (err) {
                            on_done = () => {
                                return {
                                    is_error: true,
                                    mag: "server error"
                                };
                            };
                        }
                        return {
                            on_done: on_done
                        };
                    }
                })), _donation_logs({
                    title: "This Store Payments",
                    logs_cards: Render_Log.This_Store_Payments(server_data.server_payments)
                }), _donation_logs({
                    title: "Donations",
                    logs_cards: Render_Log.Donations(server_data.server_donations)
                }))));
};
renderServerConfig();
