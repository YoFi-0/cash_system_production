"use strict";
const _page = async (page) => _section(_div({
    id: "alert_div",
    classes: "alert_div",
}, _p("", { id: "alert_text" })), await aside(), _div(page, {
    style: {
        padding: "max(1vw, 0.5rem) max(1vw, 1rem) 0 max(1vw, 8rem)",
        width: "100%"
    }
}), {
    baseSelector: baseElm("body"),
    style: {
        display: "flex",
        alignItems: "start",
        height: "100%",
        position: "relative"
    }
});
var user_user = "";
var isAlerted = false;
var isAlerted2 = false;
const send_YoFi_alert = async (text) => {
    if (!isAlerted) {
        isAlerted = true;
        _("#alert_text").setText(text);
        await Sleep.sleepByMelSuc(500);
        _("#alert_div").addStyles({
            right: "0",
        });
        await Sleep.sleepByMelSuc(5000);
        _("#alert_div").addStyles({
            right: "-200%",
        });
        await Sleep.sleepByMelSuc(500);
        _("#alert_div").removeStyles(["right"]);
        _("#alert_text").setText("");
        await Sleep.sleepByMelSuc(500);
        isAlerted = false;
    }
};
const is_respons_error = (respons_json) => {
    if (typeof respons_json == "string") {
        try {
            respons_json = JSON.parse(respons_json);
        }
        catch (err) {
            return false;
        }
    }
    if (respons_json.err) {
        send_YoFi_alert(respons_json.err).catch(err => {
            var box;
            var text;
            _div(elm => box = elm, {
                classes: "alert_div",
                baseSelector: baseElm("body")
            }, _p("", elm => text = elm));
            const senRequst = async () => {
                if (isAlerted2) {
                    return;
                }
                isAlerted2 = true;
                text.setText(respons_json.err);
                await Sleep.sleepByMelSuc(500);
                box.addStyles({
                    right: "0",
                });
                await Sleep.sleepByMelSuc(5000);
                box.addStyles({
                    right: "-200%",
                });
                await Sleep.sleepByMelSuc(500);
                box.removeStyles(["right"]);
                text.setText("");
                await Sleep.sleepByMelSuc(500);
                box.element.remove();
                isAlerted2 = false;
            };
            senRequst();
        });
        return true;
    }
    return false;
};
