const path = require("path")
const AllHTMLElms =  [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "co",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "slot",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
]

const noCloseTageElms = ["img", "input", "i"]

const fs = require("fs")
var final = ""
var classProp = ""
AllHTMLElms.forEach(elm => {
    classProp += `\tpublic static readonly ${elm} = "${elm}"\n`
    final +=
noCloseTageElms.includes(elm) ?
`const _${elm} = (value:string, attrs?:attrTtype, init?:(elem:YoFiElement) => void) => {
    return new YoFiElement({
        tag:Y.${elm},
        attrs:attrs,
        cheldren:undefined,
        init:init,
        textContent:value
    })
};
const $${elm} = (value?:string, attrs?:attrTtype,  init?:(elem:YoFiElement) => void) => {
    return new YoFiElement({
        tag:Y.input,
        attrs:attrs,
        cheldren:undefined,
        init:init,
        textContent:value
    })
};` :
`const _${elm} = (cheldren?:Array<string | YoFiElement>, attrs?:attrTtype, init?:(elem:YoFiElement) => void) => {
    return new YoFiElement({
        tag:Y.${elm},
        attrs:attrs,
        cheldren:cheldren ? (cheldren as any).filter((value:any) => typeof value != "string") : undefined,
        init:init,
        textContent: cheldren && typeof cheldren[0] == "string" ? cheldren[0] : ""
    })
};
const $${elm} = (textContent?:string, cheldren?:YoFiElement[], attrs?:attrTtype,  init?:(elem:YoFiElement) => void) => {
    return new YoFiElement({
        tag:Y.${elm},
        attrs:attrs,
        cheldren:cheldren,
        init:init,
        textContent:textContent
    })
};
`

})
fs.writeFile(path.join(__dirname, "../lib/YoFi_Elms.ts"), `class Yprops {
    ${classProp.replace(/static/g, "")}
}

class Y {

${classProp}
}
${final}`, "utf-8", () => {
    console.log("elms created")
})