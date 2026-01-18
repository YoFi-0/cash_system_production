"use strict";
const _inputsHolder = ({ args, title, onSbmit, onClose, onEveryThingDone }) => {
    let thisAlertBox;
    let serverMsg;
    let loding_elm;
    let linyarBox;
    const submit = async (elm) => {
        await Sleep.sleepBySuc(1);
        if (onSbmit) {
            const get_ServerMsg = await onSbmit(elm);
            const server_Msg = get_ServerMsg.on_done();
            serverMsg.setText(server_Msg.mag);
            if (server_Msg.is_error) {
                serverMsg.addStyles({
                    color: "red"
                });
            }
            else {
                serverMsg.addStyles({
                    color: "#FFF"
                });
            }
            return;
        }
        serverMsg.setText("Done");
    };
    return _form({
        classes: "input_holder"
    }, _div({
        classes: "linyer",
    }, _h1(title), ...args.filter(value => typeof value != "string" && typeof value != "function"), _div(onClose ? _div(_button("Done"), _button("close", {
        style: {
            background: "#AA0909",
            marginLeft: "max(1vw, 1rem)"
        }
    }).onClick(e => {
        e.preventDefault();
        onClose(e);
    })) :
        _button("Done")), (elm) => {
        linyarBox = elm;
    }), _div((elm) => {
        loding_elm = elm;
    }, {
        classes: "error_msg",
        style: {
            padding: "max(2vw, 2rem)",
            display: "none",
            opacity: "0"
        }
    }, _div({
        classes: "loadong",
    })), _div({
        classes: "error_msg",
        style: {
            display: "none",
            opacity: "0",
            transition: "0.3s"
        }
    }, (elm) => {
        thisAlertBox = elm;
    }, _h1((elm) => serverMsg = elm), _button("Close", { type: "button" }).onClick(async (e) => {
        e.preventDefault();
        thisAlertBox.addStyles(({
            opacity: "0",
        }));
        if (onEveryThingDone) {
            onEveryThingDone();
        }
        await Sleep.sleepByMelSuc(500);
        linyarBox.addStyles({
            filter: "blur(0)"
        });
        thisAlertBox.addStyles(({
            display: "none"
        }));
    })), (elm) => {
        elm.jQElement.on("submit", async (e) => {
            e.preventDefault();
            linyarBox.addStyles({
                transition: "0.3s",
                filter: "blur(10px)"
            });
            loding_elm.addStyles(({
                display: "flex",
            }));
            await Sleep.sleepByMelSuc(500);
            loding_elm.addStyles(({
                opacity: "1",
            }));
            await submit(elm);
            loding_elm.addStyles(({
                opacity: "0",
            }));
            thisAlertBox.addStyles(({
                display: "flex",
            }));
            await Sleep.sleepByMelSuc(500);
            loding_elm.addStyles(({
                display: "none",
            }));
            thisAlertBox.addStyles(({
                opacity: "1",
            }));
        });
    });
};
var input_i = 0;
const _input_with_label = (...arg) => {
    const thisId = `input_${input_i}`;
    input_i++;
    const _inputImage = () => {
        let image;
        return _div({
            classes: "image_input"
        }, _label("chose image", {
            classes: "label_image"
        }, (elm) => {
            elm.element.htmlFor = thisId;
        }), _img({
            src: typeof arg[0] == "string" ? arg[0] : undefined,
            style: {
                objectFit: "cover"
            }
        }, (elm) => {
            image = elm;
        }), _input({
            type: "file",
            id: thisId,
            style: {
                display: "none"
            },
        }, (elm) => {
            const input = elm.element;
            image.changeStyles({
                transition: "0.3s"
            });
            input.onchange = async () => {
                if (!input.files) {
                    return;
                }
                image.changeStyles({
                    translate: "1000% 0"
                });
                await Sleep.sleepByMelSuc(500);
                image.setText(window.URL.createObjectURL(input.files[0]));
                image.changeStyles({
                    translate: "0"
                });
            };
        }));
    };
    const _input_select = () => _select(...arg[4].map(obj => {
        return _option(obj.name, (elm) => {
            elm.element.value = obj.value;
        });
    }), (elm) => {
        elm.element.value = arg[0];
    });
    const _from_to_input = () => {
        return _div({
            classes: "from_to_input"
        }, ...["Form", "To"].map(value => _div({
            classes: "one_of_tow"
        }, _label(value), _input({
            type: "date"
        }))));
    };
    const _multyInput = (input_type) => {
        let container;
        const _createInput = (value) => _input({
            type: input_type,
            value: value
        });
        return _div({
            classes: "multy_input"
        }, arg[0].length < 1 || typeof arg[0] == "string" ?
            _div({
                classes: "multy_input"
            }, (elm) => {
                container = elm;
            }, _createInput(typeof arg[0] == "string" ? arg[0] : arg[0][0] || "")) :
            _div({
                classes: "multy_input"
            }, (elm) => {
                container = elm;
            }, ...arg[0].map(value => _createInput(value))), _div({
            classes: "buttons"
        }, _button(_i({ classes: "fa-solid fa-minus", type: "button" })).onClick((e) => {
            e.preventDefault();
            if (container.element.children.length > 1) {
                container.element.children[container.element.children.length - 1].remove();
            }
        }), _button(_i({ classes: "fa-solid fa-plus", type: "button" })).onClick((e) => {
            e.preventDefault();
            container.addChilds(_createInput(""));
        })));
    };
    const _regular_input = () => _input({
        type: arg[1],
        id: thisId,
        value: typeof arg[0] == "string" ? arg[0] : ""
    });
    return _div({
        classes: "input_lable",
    }, _label(`${arg[2]} ${typeof arg[3] == "boolean" ? `(${arg[3] ? "Required" : "Optional"})` : ""}`), arg[1] == "textarea" ? _textarea({
        value: typeof arg[0] == "string" ? arg[0] : ""
    }) :
        arg[1] == "select" ? _input_select() :
            arg[1] == "image" ? _inputImage() :
                arg[1] == "from_to" ? _from_to_input() :
                    arg[1].startsWith("multy") ? _multyInput(arg[1].split(" ")[1]) :
                        _regular_input());
};
