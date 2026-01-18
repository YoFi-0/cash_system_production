"use strict";
var i = 0;
var connectPaypalButton;
var connectOkButton;
var connectNoButton;
var paypal_puppElm;
var crad_info_id = 0;
const cardInfo = ({ isHaveSpan, textColr, img_src, text, isHaveStars, isMoveWrite, isHaveBorder, titleName }) => {
    crad_info_id++;
    const title = () => isHaveSpan ? _h1(titleName) : _h1(titleName);
    const isStras = () => isHaveStars ? _img({ classes: "stars_image", style: {
            border: "none",
            boxShadow: "none"
        }, src: `/images/stars/${isHaveStars.includes(".") ? `${isHaveStars.split(".")[0]}h.svg` : `${isHaveStars}.svg`}` }) : undefined;
    return _div({
        classes: "user_info",
        id: `crad_info_${crad_info_id}`
    }, _img({ src: img_src.endsWith("/null") ? "/images/user.jpg" : img_src, style: { border: isHaveBorder ? "solid #FFF max(0.2vw, 0.2em)" : undefined } }), _div({
        classes: "content",
        style: {
            alignItems: isMoveWrite ? "start" : "center",
        }
    }, title(), _p(text, {
        classes: "target_text",
        style: {
            color: textColr == "greeen" ? "#55b150" : textColr == "red" ? "#870808" : "#000"
        }
    }), isStras()), (elm) => {
        elm.jQElement.draggable({
            scroll: false,
        });
    });
};
const UserSide = (username, user_image, tag, isPayPalConnected) => {
    return cardInfo({
        isHaveSpan: {
            tag: tag
        },
        img_src: user_image,
        text: isPayPalConnected ? "paypal connected" : "no Paypal yet",
        textColr: isPayPalConnected ? "greeen" : "red",
        titleName: username
    });
};
const pagePathSide = (path, server_image, text, text_color, stars) => {
    return cardInfo({
        img_src: server_image,
        text: text,
        textColr: text_color,
        isMoveWrite: true,
        isHaveBorder: true,
        titleName: path,
        isHaveStars: stars
    });
};
const PayPalSide = (email) => {
    return _div({
        classes: "privte_paypal user_info"
    }, email ? _p(`Paypal:${email} `, { "style": {
            color: "#000",
            display: "inline-block",
            width: "max(10vw, 10rem)",
            textOverflow: "ellipsis",
            overflow: "hidden",
        }, id: "paypel_user_email" }) : _p("Paypal: ", { id: "paypel_user_email" }, _span(email ? email : " Embty", {
        "style": {
            color: "#000",
        },
    }), (elm) => {
        if (email) {
            elm.element.title = email;
        }
    }), _button("Connect").onClick(e => {
        if (email) {
            _paypal_pubb.show([
                { input_name: "Paypal Email", value: email }
            ]);
        }
        else {
            _paypal_pubb.show();
        }
    }), (elm) => {
        elm.jQElement.draggable({
            scroll: false
        });
        connectPaypalButton = elm;
    });
};
// const paypal_pubb = () =>{
//     return _div(
//         {
//             classes:"paypal_pubb_back"
//         },
//         _div(
//             {
//                 classes:"paypal_pubb"
//             },
//             _p(
//                 "PayPal Email"
//             ),
//             _input({
//                 placeHolder:"Email"
//             }),
//             _div(
//                 {
//                     classes:"buttons",
//                 },
//                 _button("Configrate", {classes:"yes"}, _i({classes:"fa-solid fa-check"}), (elm) => {
//                     connectOkButton = elm
//                 }),
//                 _button("Cancel", {classes:"no"}, _i({classes:"fa-solid fa-xmark"}), (elm) => {
//                     connectNoButton = elm
//                 })
//             )
//         ),(elm) => {
//             paypal_puppElm = elm
//             connectPaypalButton!.onClick(async e => {
//                 showPaypalEmailPupp()
//             })
//             connectOkButton!.onClick(async e => {
//                 hidePaypalEmailPupp()
//             })
//             connectNoButton!.onClick(async e => {
//                 hidePaypalEmailPupp()
//             })
//         }
//     )
// }
// const showPaypalEmailPupp = async() => {
//     paypal_puppElm.addStyles({
//         display:"flex"
//     })
//     await Sleep.sleepByMelSuc(500)
//     paypal_puppElm.addStyles({
//         opacity:"1"
//     })
// }
// const hidePaypalEmailPupp = async() => {
//     paypal_puppElm.addStyles({
//         opacity:"0"
//     })
//     await Sleep.sleepByMelSuc(500)
//     paypal_puppElm.addStyles({
//         display:"none"
//     })
// }
