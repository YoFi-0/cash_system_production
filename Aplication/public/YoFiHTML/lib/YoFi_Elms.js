"use strict";
class Yprops {
    a = "a";
    abbr = "abbr";
    address = "address";
    area = "area";
    article = "article";
    aside = "aside";
    audio = "audio";
    b = "b";
    base = "base";
    bdi = "bdi";
    bdo = "bdo";
    blockquote = "blockquote";
    body = "body";
    br = "br";
    button = "button";
    canvas = "canvas";
    caption = "caption";
    cite = "cite";
    co = "co";
    col = "col";
    colgroup = "colgroup";
    data = "data";
    datalist = "datalist";
    dd = "dd";
    del = "del";
    details = "details";
    dfn = "dfn";
    dialog = "dialog";
    div = "div";
    dl = "dl";
    dt = "dt";
    em = "em";
    embed = "embed";
    fieldset = "fieldset";
    figcaption = "figcaption";
    figure = "figure";
    footer = "footer";
    form = "form";
    h1 = "h1";
    h2 = "h2";
    h3 = "h3";
    h4 = "h4";
    h5 = "h5";
    h6 = "h6";
    head = "head";
    header = "header";
    hgroup = "hgroup";
    hr = "hr";
    html = "html";
    i = "i";
    iframe = "iframe";
    img = "img";
    input = "input";
    ins = "ins";
    kbd = "kbd";
    label = "label";
    legend = "legend";
    li = "li";
    link = "link";
    main = "main";
    map = "map";
    mark = "mark";
    menu = "menu";
    meta = "meta";
    meter = "meter";
    nav = "nav";
    noscript = "noscript";
    object = "object";
    ol = "ol";
    optgroup = "optgroup";
    option = "option";
    output = "output";
    p = "p";
    picture = "picture";
    pre = "pre";
    progress = "progress";
    q = "q";
    rp = "rp";
    rt = "rt";
    ruby = "ruby";
    s = "s";
    samp = "samp";
    script = "script";
    section = "section";
    select = "select";
    slot = "slot";
    small = "small";
    source = "source";
    span = "span";
    strong = "strong";
    style = "style";
    sub = "sub";
    summary = "summary";
    sup = "sup";
    table = "table";
    tbody = "tbody";
    td = "td";
    template = "template";
    textarea = "textarea";
    tfoot = "tfoot";
    th = "th";
    thead = "thead";
    time = "time";
    title = "title";
    tr = "tr";
    track = "track";
    u = "u";
    ul = "ul";
    var = "var";
    video = "video";
    wbr = "wbr";
}
class Y {
    static a = "a";
    static abbr = "abbr";
    static address = "address";
    static area = "area";
    static article = "article";
    static aside = "aside";
    static audio = "audio";
    static b = "b";
    static base = "base";
    static bdi = "bdi";
    static bdo = "bdo";
    static blockquote = "blockquote";
    static body = "body";
    static br = "br";
    static button = "button";
    static canvas = "canvas";
    static caption = "caption";
    static cite = "cite";
    static co = "co";
    static col = "col";
    static colgroup = "colgroup";
    static data = "data";
    static datalist = "datalist";
    static dd = "dd";
    static del = "del";
    static details = "details";
    static dfn = "dfn";
    static dialog = "dialog";
    static div = "div";
    static dl = "dl";
    static dt = "dt";
    static em = "em";
    static embed = "embed";
    static fieldset = "fieldset";
    static figcaption = "figcaption";
    static figure = "figure";
    static footer = "footer";
    static form = "form";
    static h1 = "h1";
    static h2 = "h2";
    static h3 = "h3";
    static h4 = "h4";
    static h5 = "h5";
    static h6 = "h6";
    static head = "head";
    static header = "header";
    static hgroup = "hgroup";
    static hr = "hr";
    static html = "html";
    static i = "i";
    static iframe = "iframe";
    static img = "img";
    static input = "input";
    static ins = "ins";
    static kbd = "kbd";
    static label = "label";
    static legend = "legend";
    static li = "li";
    static link = "link";
    static main = "main";
    static map = "map";
    static mark = "mark";
    static menu = "menu";
    static meta = "meta";
    static meter = "meter";
    static nav = "nav";
    static noscript = "noscript";
    static object = "object";
    static ol = "ol";
    static optgroup = "optgroup";
    static option = "option";
    static output = "output";
    static p = "p";
    static picture = "picture";
    static pre = "pre";
    static progress = "progress";
    static q = "q";
    static rp = "rp";
    static rt = "rt";
    static ruby = "ruby";
    static s = "s";
    static samp = "samp";
    static script = "script";
    static section = "section";
    static select = "select";
    static slot = "slot";
    static small = "small";
    static source = "source";
    static span = "span";
    static strong = "strong";
    static style = "style";
    static sub = "sub";
    static summary = "summary";
    static sup = "sup";
    static table = "table";
    static tbody = "tbody";
    static td = "td";
    static template = "template";
    static textarea = "textarea";
    static tfoot = "tfoot";
    static th = "th";
    static thead = "thead";
    static time = "time";
    static title = "title";
    static tr = "tr";
    static track = "track";
    static u = "u";
    static ul = "ul";
    static var = "var";
    static video = "video";
    static wbr = "wbr";
}
const _a = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.a,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _abbr = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.abbr,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _address = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.address,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _area = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.area,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _article = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.article,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _aside = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.aside,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _audio = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.audio,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _b = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.b,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _base = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.base,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _bdi = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.bdi,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _bdo = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.bdo,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _blockquote = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.blockquote,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _body = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.body,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _br = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.br,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _button = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.button,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _canvas = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.canvas,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _caption = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.caption,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _cite = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.cite,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _co = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.co,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _col = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.col,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _colgroup = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.colgroup,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _data = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.data,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _datalist = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.datalist,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _dd = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.dd,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _del = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.del,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _details = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.details,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _dfn = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.dfn,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _dialog = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.dialog,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _div = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.div,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _dl = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.dl,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _dt = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.dt,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _em = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.em,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _embed = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.embed,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _fieldset = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.fieldset,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _figcaption = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.figcaption,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _figure = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.figure,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _footer = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.footer,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _form = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.form,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h1 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h1,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h2 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h2,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h3 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h3,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h4 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h4,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h5 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h5,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _h6 = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.h6,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _head = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.head,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _header = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.header,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _hgroup = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.hgroup,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _hr = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.hr,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _html = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.html,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _i = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.i,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _iframe = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.iframe,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _img = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.img,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _input = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.input,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _ins = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.ins,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _kbd = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.kbd,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _label = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.label,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _legend = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.legend,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _li = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.li,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _link = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.link,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _main = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.main,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _map = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.map,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _mark = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.mark,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _menu = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.menu,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _meta = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.meta,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _meter = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.meter,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _nav = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.nav,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _noscript = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.noscript,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _object = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.object,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _ol = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.ol,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _optgroup = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.optgroup,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _option = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.option,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _output = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.output,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _p = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.p,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _picture = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.picture,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _pre = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.pre,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _progress = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.progress,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _q = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.q,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _rp = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.rp,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _rt = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.rt,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _ruby = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.ruby,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _s = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.s,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _samp = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.samp,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _script = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.script,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _section = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.section,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _select = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.select,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _slot = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.slot,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _small = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.small,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _source = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.source,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _span = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.span,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _strong = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.strong,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _style = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.style,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _sub = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.sub,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _summary = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.summary,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _sup = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.sup,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _table = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.table,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _tbody = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.tbody,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _td = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.td,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _template = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.template,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _textarea = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.textarea,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _tfoot = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.tfoot,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _th = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.th,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _thead = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.thead,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _time = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.time,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _title = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.title,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _tr = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.tr,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _track = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.track,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _u = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.u,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _ul = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.ul,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _var = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.var,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _video = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.video,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
const _wbr = (...args) => {
    var attrs;
    var cheldren = [];
    var init;
    var textContent = "";
    for (let arg of args) {
        if (typeof arg == "function") {
            init = arg;
            continue;
        }
        if (arg instanceof YoFiElement) {
            cheldren.push(arg);
            continue;
        }
        if (typeof arg == "string") {
            textContent += arg;
            continue;
        }
        if (arg instanceof Object) {
            attrs = arg;
        }
    }
    return new YoFiElement({
        tag: Y.wbr,
        attrs: attrs,
        cheldren: cheldren ? cheldren.filter((value) => typeof value != "string") : undefined,
        init: init,
        textContent: textContent
    });
};
