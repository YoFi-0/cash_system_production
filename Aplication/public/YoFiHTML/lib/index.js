"use strict";
localStorage.removeItem("log_card_1");
localStorage.removeItem("log_card_2");
localStorage.removeItem("log_card_3");
var this_target_server_id = "";
if (window.location.href.split("?")[1]) {
    window.location.href.split("?")[1].split("&").forEach(value => {
        if (value.startsWith("server_id")) {
            this_target_server_id = value.split("=")[1];
        }
    });
}
const send_HTTP_Requist = async ({ url, method, formData }) => {
    var another_form_data = new FormData();
    if (formData) {
        formData.append("user_user", user_user);
    }
    else {
        another_form_data.append("user_user", user_user);
    }
    var reqData;
    var is_not_err = true;
    try {
        await $.ajax({
            url: url,
            type: method || 'POST',
            data: formData || another_form_data,
            success: function (data) {
                reqData = data;
                console.log(data);
                if (is_respons_error(data)) {
                    is_not_err = false;
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    catch (err) {
        send_YoFi_alert("networking error");
        return false;
    }
    if (!is_not_err) {
        return false;
    }
    return reqData || [];
};
let from_user_logs_start = {
    my_servers_donations: 0,
    private_donations: 0,
    store_payments: 0,
};
let from_server_logs_start = {
    this_store_payments: 0,
    donation: 0
};
const localStorage_create = (key, obj = {}) => {
    localStorage.setItem(key, btoa(JSON.stringify(obj)));
};
const localStorage_get = (key) => {
    return JSON.parse(localStorage.getItem(key) ? atob(localStorage.getItem(key)) : "{}");
};
class Sleep {
    static async sleepByMelSuc(dlay) {
        await new Promise(r => setTimeout(r, dlay));
    }
    static async sleepBySuc(dlay) {
        await new Promise(r => setTimeout(r, dlay * 1000));
    }
    static async sleepByMin(dlay) {
        await new Promise(r => setTimeout(r, dlay * 1000 * 60));
    }
    static async sleepByHours(dlay) {
        await new Promise(r => setTimeout(r, dlay * 1000 * 60 * 60));
    }
}
class YoFiElement {
    attrs;
    cheldren;
    element;
    jQElement;
    text = "";
    tag;
    constructor({ attrs, tag, cheldren, init, textContent }) {
        const element = document.createElement(tag);
        this.tag = tag;
        this.element = element;
        if (attrs) {
            this.attrs = attrs;
            this.set_all_attrs();
            if (attrs.type) {
                this.element.type = attrs.type;
            }
            if (attrs.src) {
                this.element.src = attrs.src;
            }
            if (attrs.id) {
                this.element.id = attrs.id;
            }
            if (attrs.dataset) {
                for (let data of Object.keys(attrs.dataset)) {
                    this.element.dataset[data] = attrs.dataset[data];
                }
            }
            if (attrs.classes) {
                for (let className of attrs.classes.trim().split(" ")) {
                    this.element.classList.add(className);
                }
            }
            if (attrs.style) {
                this.setStyles(attrs.style);
            }
            if (attrs.href) {
                this.element.href = attrs.href;
            }
            if (attrs.baseSelector) {
                const father = document.querySelector(attrs.baseSelector);
                if (father) {
                    father.appendChild(this.element);
                }
            }
            if (attrs.value) {
                this.setText(attrs.value);
            }
            if (attrs.placeHolder) {
                this.changeAttr({
                    placeHolder: attrs.placeHolder
                });
            }
        }
        if (textContent) {
            this.setText(textContent);
        }
        if (cheldren) {
            this.cheldren = cheldren;
            cheldren.forEach(elm => {
                this.element.appendChild(elm.element);
            });
        }
        this.jQElement = $(this.element);
        if (init) {
            init(this);
        }
        return;
    }
    setStyles(styles) {
        this.element.style = "";
        for (let style of Object.keys(styles)) {
            this.element.style[style] = styles[style];
        }
        if (this.attrs) {
            this.Re_Attr({
                style: styles
            });
        }
        return this;
    }
    addStyles(styles) {
        for (let style of Object.keys(styles)) {
            this.element.style[style] = styles[style];
        }
        return this;
    }
    removeClasses(classes) {
        for (let className of classes.trim().split(" ")) {
            className ? this.element.classList.remove(className) : null;
            if (this.attrs?.classes) {
                this.attrs.classes = this.attrs.classes.trim().split(" ").filter(value => value != className).join(" ");
            }
        }
        return this;
    }
    setText(text) {
        if (this.tag == "input") {
            this.element.value = text;
            this.Re_Attr({
                value: text
            });
        }
        else if (this.tag == "img") {
            this.element.src = text;
            this.Re_Attr({
                src: text
            });
        }
        else {
            this.element.textContent = text;
        }
        ;
        this.text = text;
        return this;
    }
    addClasses(classes) {
        for (let className of classes.trim().split(" ")) {
            className ? this.element.classList.add(className) : null;
            if (this.attrs) {
                var tembClasses = this.attrs.classes?.trim().split(" ") || [];
                tembClasses?.push(className);
                this.Re_Attr({
                    classes: tembClasses?.join(" ")
                });
            }
        }
        return this;
    }
    changeStyles(styles) {
        for (let style of Object.keys(styles)) {
            this.element.style[style] = styles[style];
        }
        if (this.attrs) {
            this.attrs.style = { ...this.attrs.style, ...styles };
        }
        return this;
    }
    removeStyles(styles) {
        for (let style of styles) {
            this.element.style.removeProperty(`${style.toString()}`);
            if (this.attrs && this.attrs.style) {
                delete this.attrs.style[style];
            }
        }
        return this;
    }
    removeAllStyles() {
        this.element.attributes.removeNamedItem("style");
        if (this.attrs && this.attrs.style) {
            this.Re_Attr({
                style: undefined
            });
        }
        return this;
    }
    addChilds(...elems) {
        if (elems) {
            elems.forEach(elm => {
                this.element.appendChild(elm.element);
            });
        }
        return this;
    }
    setChilds(...elems) {
        this.element.innerHTML = this.text || "";
        if (elems) {
            elems.forEach(elm => {
                this.element.appendChild(elm.element);
            });
        }
        return this;
    }
    // events
    onClick(func) {
        this.element.onclick = (e) => {
            func(e);
        };
        return this;
    }
    onMouseDown(func) {
        this.element.onmousedown = (e) => {
            func(e);
        };
        return this;
    }
    onMouseUp(func) {
        this.element.onmouseup = (e) => {
            func(e);
        };
        return this;
    }
    onMouseMove(func) {
        this.element.onmousemove = (e) => {
            func(e);
        };
        return this;
    }
    onTouchStart(func) {
        this.element.ontouchstart = (e) => {
            func(e);
        };
        return this;
    }
    onTouchEnd(func) {
        this.element.ontouchend = (e) => {
            func(e);
        };
        return this;
    }
    onTouchMove(func) {
        this.element.ontouchmove = (e) => {
            func(e);
        };
        return this;
    }
    changeAttr(attr, value) {
        if (typeof attr == "string" && value) {
            this.element.setAttribute(attr, value);
            if (this.attrs) {
                this.attrs[attr] = value;
            }
            return this;
        }
        if (value || typeof attr == "string") {
            throw Error("string must have a value");
            return this;
        }
        for (let key of Object.keys(attr)) {
            this.element.setAttribute(key, attr[key]);
            if (this.attrs) {
                this.attrs[key] = attr[key];
            }
        }
        return this;
    }
    Re_Attr(options) {
        if (this.attrs) {
            for (let key of Object.keys(options)) {
                this.attrs[key] = options[key];
            }
        }
        return this;
    }
    set_all_attrs() {
        if (this.attrs) {
            for (let key of Object.keys(this.attrs)) {
                if (key == "baseSelector" ||
                    key == "classes" ||
                    key == "dataset" ||
                    key == "href" ||
                    key == "id" ||
                    key == "placeHolder" ||
                    key == "src" ||
                    key == "style" ||
                    key == "value" ||
                    key == "type") {
                    continue;
                }
                this.element.setAttribute(key, this.attrs[key]);
            }
        }
        return this;
    }
    getSlector(selector) {
        if (!this.element.id) {
            throw Error("the elector parentElement must have an id");
        }
        return _(`#${this.element.id} ${selector}`);
    }
}
class YoFiSelectorElement extends YoFiElement {
    constructor({ selector, init, cheldren }) {
        super({
            tag: Y.div,
            attrs: {
                style: {},
                dataset: {}
            },
            textContent: "",
        });
        this.element.remove();
        // get elmemnt
        this.element = document.querySelector(selector);
        this.jQElement = $(selector);
        this.tag = this.element.tagName.toLowerCase();
        // get elmemnt
        // change text
        this.text = this.element.tagName == "INPUT" ?
            this.element.value :
            this.element.tagName == "IMG" ? this.element.src :
                this.element.textContent;
        // change text
        if (this.element.className) {
            this.addClasses(this.element.className);
        }
        const options = this.element.attributes;
        if (this.attrs) {
            for (let key of Object.values(options)) {
                if (key.name == "style" || key.name == "class") {
                    continue;
                }
                if (key.name.startsWith("data-")) {
                    this.attrs.dataset[key.name.split("-")[1]] = key.value;
                    continue;
                }
                this.attrs[key.name] = key.value;
            }
        }
        if (this.element.style) {
            for (let key of Object.values(this.element.style)) {
                this.attrs.style[key] = this.element.style[key];
            }
        }
        if (cheldren) {
            for (let child of cheldren) {
                this.element.appendChild(child.element);
            }
        }
        if (init) {
            init(this);
        }
    }
}
const _ = (selector, cheldren, init) => {
    return new YoFiSelectorElement({
        selector: selector,
        cheldren: cheldren || [],
        init: init
    });
};
const baseId = (id) => {
    return `#${id}`;
};
const baseClass = (className) => {
    return `.${className}`;
};
const baseElm = (element) => {
    return element;
};
// type UseSatatList = [
//     any,
//     (value2:any) => any
// ]
// const _useState = (value:any):UseSatatList => {
//     const setvalue = (value2:any) => {
//         const changeChild = (child:HTMLElement) =>{
//             if(child.children.length == 0){
//                 return
//             }
//             const targetChilds = Array.from(child.children) as HTMLElement[]
//             for(let childElm of targetChilds){
//                 changeChild(childElm);
//                 if(String(childElm.style).includes(value)){
//                     (childElm.style as any) = String(childElm.style).replaceAll(value , value2);
//                 }
//                 if(childElm.className.includes(value)){
//                     childElm.textContent = childElm.textContent ? childElm.textContent.replaceAll(value , value2) : "";
//                 }
//                 if(childElm.textContent?.includes(value)){
//                     childElm.textContent = childElm.textContent.replaceAll(value , value2);
//                 }
//             }
//         }
//         changeChild(document.body);
//         value = value2
//         console.log(value)
//     }
//     return [value, setvalue]
// }
const c = ({ tag, attrs, cheldren, init, textContent }) => {
    return new YoFiElement({
        tag: tag,
        attrs: attrs,
        cheldren: cheldren,
        init: init,
        textContent: textContent
    });
};
const cc = (tag, textContent, attrs, baseSelector, cheldren, init) => {
    return new YoFiElement({
        tag: tag,
        attrs: attrs,
        cheldren: cheldren,
        init: init,
        textContent: textContent
    });
};
// const YEElm = ({tag, attrs, baseSelector, cheldren, init, textContent}:YoFiElementContructer) => {
//     return new YoFiElement({
//         tag:tag,
//         attrs:attrs,
//         baseSelector:baseSelector,
//         cheldren:cheldren,
//         init:init,
//         textContent:textContent
//     })
// }
// function div({attrs, baseSelector, cheldren, init, textContent}:{
//     attrs?:attrTtype,
//     cheldren?:YoFiElement[],
//     baseSelector?:string
//     textContent?:string
//     init?:() => void
// }):YoFiElement{
//     return new YoFiElement({
//         tag:YElms.div,
//         attrs:attrs,
//         baseSelector:baseSelector,
//         cheldren:cheldren,
//         init:init,
//         textContent:textContent
//     })
// } 
