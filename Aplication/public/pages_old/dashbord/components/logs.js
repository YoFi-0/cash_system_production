"use strict";
var i = 0;
const out_of_amo = "this is all the logs you have";
const _donation_logs = ({ title, logs_cards }) => {
    i++;
    let midElm;
    let clear_filter;
    let more_button_elm;
    return _div({
        classes: "log_card",
        id: `log_card${i}`
    }, _div({
        classes: "head"
    }, _h1(title), _div({
        style: {
            textAlign: "center"
        }
    }, _button("Filter", { classes: "fillter_button" }).onClick(e => {
        if (title == "My Servers Donations") {
            My_Servers_Donations_filtter_pubb.show();
            return;
        }
        if (title == "Store Payments") {
            my_Store_Payments_filtter_pubb.show();
            return;
        }
        if (title == "Private Donations") {
            privte_donations_filtter_pubb.show();
            return;
        }
        if (title == "Donations") {
            _donations_filtter_Pubb.show();
            return;
        }
        if (title == "This Store Payments") {
            _thisStore_filtter_PaymentsPupp.show();
        }
    }), _button("Clear Filter", {
        classes: "fillter_button clear_filter",
        style: {
            marginTop: "max(0.6vw, 0.6rem)",
            display: "none"
        }
    }, (elm) => {
        clear_filter = elm;
    }).onClick(async (e) => {
        more_button_elm.addStyles({
            display: "block"
        });
        clear_filter.addStyles({
            display: "none"
        });
        if (title == "My Servers Donations") {
            localStorage.removeItem(`log_card_1`);
            Array.from(_("#log_card_1").element.children).forEach(elm => {
                elm.remove();
            });
            from_user_logs_start.my_servers_donations = 0;
            myServerDonationCreateLogsElm(midElm, {}, more_button_elm);
            return;
        }
        if (title == "Store Payments") {
            localStorage.removeItem(`log_card_3`);
            Array.from(_("#log_card_3").element.children).forEach(elm => {
                elm.remove();
            });
            from_user_logs_start.store_payments = 0;
            store_PaymentsCreateLogsElm(midElm, {}, more_button_elm);
            return;
        }
        if (title == "Private Donations") {
            localStorage.removeItem(`log_card_2`);
            Array.from(_("#log_card_2").element.children).forEach(elm => {
                elm.remove();
            });
            from_user_logs_start.private_donations = 0;
            private_DonationsCreateLogsElm(midElm, {}, more_button_elm);
            return;
        }
        if (title == "Donations") {
            localStorage.removeItem(`log_card_2`);
            Array.from(_("#log_card_2").element.children).forEach(elm => {
                elm.remove();
            });
            from_server_logs_start.donation = 0;
            DonationsCreateLogsElm(midElm, {}, more_button_elm);
            return;
        }
        if (title == "This Store Payments") {
            localStorage.removeItem(`log_card_1`);
            Array.from(_("#log_card_1").element.children).forEach(elm => {
                elm.remove();
            });
            from_server_logs_start.this_store_payments = 0;
            this_Store_Payments(midElm, {}, more_button_elm);
        }
    }))), _div({
        classes: `mid`,
        id: `log_card_${i}`
    }, (elm) => {
        midElm = elm;
    }, ...logs_cards), _div({
        classes: "foot"
    }, _button("More", { classes: "More_Button" }, (elm) => more_button_elm = elm).onClick((e) => {
        if (title == "My Servers Donations") {
            const flters = localStorage_get(`log_card_1`);
            myServerDonationCreateLogsElm(midElm, flters, more_button_elm);
            return;
        }
        if (title == "Store Payments") {
            const flters = localStorage_get(`log_card_3`);
            store_PaymentsCreateLogsElm(midElm, flters, more_button_elm);
            return;
        }
        if (title == "Private Donations") {
            const flters = localStorage_get(`log_card_2`);
            private_DonationsCreateLogsElm(midElm, flters, more_button_elm);
            return;
        }
        if (title == "Donations") {
            const flters = localStorage_get(`log_card_2`);
            DonationsCreateLogsElm(midElm, flters, more_button_elm);
            return;
        }
        if (title == "This Store Payments") {
            const flters = localStorage_get(`log_card_1`);
            this_Store_Payments(midElm, flters, more_button_elm);
        }
    })), (elm) => {
        // elm.jQElement.draggable({
        //     scroll:false,
        // })
    });
};
const _payment_log = ({ is_to_me, name, from_img_src, to_img_src, amount, is_it_payment, log_msg, invoice_id, is_it_server }) => {
    // "https://cdn.discordapp.com/icons/938140512647520306/5902f3b9494911ee2dcf8ffb976b02fa.webp?size=96"
    let donElm;
    let loading_elm;
    let isClicked = false;
    let productsHolder;
    let isProducts_registerd = false;
    let user_invoice_id = invoice_id;
    const hideDonwStyles = {
        height: "0",
        paddingBottom: "0"
    };
    const get_final_amount = (theamount) => {
        return `${theamount}`.includes(".") ? `${theamount}`.split(".")[1].length == 1 ? `${`${theamount}`.split(".")[0]}.${`${theamount}`.split(".")[1]}0` : theamount : theamount;
    };
    amount = `${amount}`.includes(".") ? `${amount}`.split(".")[1].length == 1 ? `${`${amount}`.split(".")[0]}.${`${amount}`.split(".")[1]}0` : amount : amount;
    const _from = ({ img_src, name }) => _div({
        classes: "from"
    }, _p("From: ", { classes: "bold", style: { marginRight: "max(0.5vw, 0.5rem)" } }), 
    // _img({
    //     src:img_src
    // }),
    _p(is_to_me ? name : "Me", { classes: "not_bold" }, (elm) => { elm.element.title = name; }));
    const _to = ({ img_src, name }) => _div({
        classes: "to"
    }, _p("To: ", { classes: "bold" }), _p(is_to_me ? "Me" : name, { classes: "not_bold" }, (elm) => { elm.element.title = name; }));
    return _div({
        classes: "payment_log",
        style: {
            background: is_to_me ? "linear-gradient(90deg, #227DD1, #22D1B2)" : undefined
        }
    }, _div({
        classes: "up",
        style: {
            position: "relative"
        }
    }, _from({
        img_src: from_img_src,
        name: name
    }), _div({
        style: {
            width: "100%",
            height: "100%",
            background: "#0000006b",
            position: "absolute",
            left: "0",
            top: "0",
            borderRadius: "max(0.3vw, 0.3rem)",
            opacity: "0",
            transition: "0.3s",
            display: "none",
            justifyContent: "center",
            alignItems: "center",
        }
    }, (elm) => {
        loading_elm = elm;
    }, _p("loading...", {
        style: {
            fontSize: "max(0.9vw, 0.8rem)"
        }
    })), _p(`${get_final_amount(amount)}`, {
        classes: "amount"
    }), _to({
        img_src: to_img_src,
        name: name
    })), _div((elm) => {
        donElm = elm;
    }, {
        classes: "down",
        style: hideDonwStyles
    }, is_it_payment ? _div(_div({
        classes: "log_info"
    }, ...log_msg.split("\n").map(line => {
        return _p(line.split(":")[0] + ":", _span(line.split(":")[1]));
    })), _div({
        classes: "log_info",
        style: {
            marginTop: "1.5vh"
        }
    }, _h1("Products"), _div((elm) => {
        productsHolder = elm;
    }), _p("--------------------------------"), _p(`total : ${get_final_amount(amount)}$`))) :
        _div({
            classes: "log_info"
        }, ...log_msg.split("\n").map(line => {
            return _p(line.split(":")[0] + ":", _span(line.split(":")[1]));
        })))).onClick(async (e) => {
        if (isClicked) {
            isClicked = false;
            donElm.addStyles(hideDonwStyles);
        }
        else {
            if (!isProducts_registerd && productsHolder) {
                isProducts_registerd = true;
                loading_elm.addStyles({
                    display: "flex"
                });
                await Sleep.sleepByMelSuc(500);
                loading_elm.addStyles({
                    opacity: "1"
                });
                const getInvoiceProduct = await fetch(`/api/v1/dashbord/all/invoice_payment_product_logs?hide_user=${user_user}&invoice=${user_invoice_id}${is_it_server ? `&server_id=${this_target_server_id}` : ""}`, {
                    method: "POST",
                });
                const invoiceProduct = await getInvoiceProduct.json();
                if (is_respons_error(invoiceProduct)) {
                    return;
                }
                productsHolder.addChilds(...invoiceProduct.map((value) => {
                    return _p(`${value.name} x ${value.quantity} : ${value.unit_amount.value}$ total ${get_final_amount(value.unit_amount.value * value.quantity)}$`);
                }));
                loading_elm.addStyles({
                    opacity: "0"
                });
                await Sleep.sleepByMelSuc(500);
                loading_elm.addStyles({
                    display: "none"
                });
            }
            donElm.setStyles({});
            isClicked = true;
        }
    });
};
//----------------------------------------------------------------------------------------------
const myServerDonationCreateLogsElm = async (midElm, flters, more_button_elm) => {
    const formData = new FormData();
    formData.append("donated_server_id", flters.donated_server_id || "");
    formData.append("donated_server_name", flters.donated_server_name || "");
    formData.append("amount", flters.amount || "");
    formData.append("from_date", flters.from_date || "");
    formData.append("to_date", flters.to_date || "");
    const HTTP_data = await send_HTTP_Requist({
        url: `/api/v1/dashbord/user/server_donations?from=${from_user_logs_start.my_servers_donations}&limit=6`,
        formData
    });
    if (!HTTP_data) {
        return;
    }
    if (HTTP_data.length < 6) {
        if (more_button_elm) {
            more_button_elm.addStyles({
                display: "none"
            });
        }
    }
    if (!HTTP_data.length) {
        send_YoFi_alert(out_of_amo);
        return;
    }
    midElm.addChilds(...Render_Log.My_Servers_Donations(HTTP_data));
};
const this_Store_Payments = async (midElm, flters, more_button_elm) => {
    const formData = new FormData();
    formData.append("request_lifter_user_id", flters.request_lifter_user_id || "");
    formData.append("request_lifter_user_name", flters.request_lifter_user_name || "");
    formData.append("payeer_user_id", flters.payeer_user_id || "");
    formData.append("payeer_user_name", flters.payeer_user_name || "");
    formData.append("total_amount", flters.total_amount || "");
    formData.append("from_date", flters.from_date || "");
    formData.append("to_date", flters.to_date || "");
    const HTTP_data = await send_HTTP_Requist({
        url: `/api/v1/dashbord/server/server_payments?from=${from_server_logs_start.this_store_payments}&limit=6&server_id=${this_target_server_id}`,
        formData
    });
    if (!HTTP_data) {
        return;
    }
    if (HTTP_data.length < 6) {
        if (more_button_elm) {
            more_button_elm.addStyles({
                display: "none"
            });
        }
    }
    if (!HTTP_data.length) {
        send_YoFi_alert(out_of_amo);
        return;
    }
    midElm.addChilds(...Render_Log.This_Store_Payments(HTTP_data));
};
const DonationsCreateLogsElm = async (midElm, flters, more_button_elm) => {
    const formData = new FormData();
    formData.append("donater_user_id", flters.donater_user_id || "");
    formData.append("donater_user_name", flters.donater_user_name || "");
    formData.append("amount", flters.amount || "");
    formData.append("from_date", flters.from_date || "");
    formData.append("to_date", flters.to_date || "");
    const HTTP_data = await send_HTTP_Requist({
        formData,
        url: `/api/v1/dashbord/server/server_donations?from=${from_server_logs_start.donation}&limit=6&server_id=${this_target_server_id}`
    });
    if (!HTTP_data) {
        return;
    }
    if (HTTP_data.length < 6) {
        if (more_button_elm) {
            more_button_elm.addStyles({
                display: "none"
            });
        }
    }
    if (!HTTP_data.length) {
        send_YoFi_alert(out_of_amo);
        return;
    }
    midElm.addChilds(...Render_Log.Donations(HTTP_data));
};
const private_DonationsCreateLogsElm = async (midElm, flters, more_button_elm) => {
    const formData = new FormData();
    formData.append("donater_user_id", flters.donater_user_id || "");
    formData.append("donater_user_name", flters.donater_user_name || "");
    formData.append("donated_user_id", flters.donated_user_id || "");
    formData.append("donated_user_name", flters.donated_user_name || "");
    formData.append("amount", flters.amount || "");
    formData.append("donationType", flters.donationType || "");
    formData.append("from_date", flters.from_date || "");
    formData.append("to_date", flters.to_date || "");
    const HTTP_data = await send_HTTP_Requist({
        url: `/api/v1/dashbord/user/private_donations?from=${from_user_logs_start.private_donations}&limit=6`,
        formData
    });
    if (!HTTP_data) {
        return;
    }
    if (HTTP_data.length < 6) {
        if (more_button_elm) {
            more_button_elm.addStyles({
                display: "none"
            });
        }
    }
    if (!HTTP_data.length) {
        send_YoFi_alert(out_of_amo);
        return;
    }
    midElm.addChilds(...Render_Log.Private_Donations(HTTP_data));
};
const store_PaymentsCreateLogsElm = async (midElm, flters, more_button_elm) => {
    const formData = new FormData();
    formData.append("request_lifter_user_id", flters.request_lifter_user_id || "");
    formData.append("request_lifter_user_name", flters.request_lifter_user_name || "");
    formData.append("payeer_user_id", flters.payeer_user_id || "");
    formData.append("payeer_user_name", flters.payeer_user_name || "");
    formData.append("store_server_id", flters.store_server_id || "");
    formData.append("store_server_name", flters.store_server_name || "");
    formData.append("total_amount", flters.total_amount || "");
    formData.append("from_date", flters.from_date || "");
    formData.append("to_date", flters.to_date || "");
    const HTTP_data = await send_HTTP_Requist({
        url: `/api/v1/dashbord/user/store_payments?from=${from_user_logs_start.store_payments}&limit=6`,
        formData
    });
    if (!HTTP_data) {
        return;
    }
    if (HTTP_data.length < 6) {
        if (more_button_elm) {
            more_button_elm.addStyles({
                display: "none"
            });
        }
    }
    if (!HTTP_data.length) {
        send_YoFi_alert(out_of_amo);
        return;
    }
    midElm.addChilds(...Render_Log.Store_Payments(HTTP_data));
};
