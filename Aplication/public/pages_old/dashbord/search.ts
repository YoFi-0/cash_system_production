const renderSearch = async() => {
    _page(_section(
        {
            classes:"search_page"
        },
        _section_1(),
        await _section_2()
    ))
}
const _option_search = (value:string) => {
    return _option(value, (elm) => {
        (elm.element as HTMLOptionElement).value = value.toLocaleLowerCase().replaceAll(" ", "_")
    })
}

const render = async(before_Render?:() => Promise<void>) => {
    _("#More_Button").addStyles({
        display:"flex"
    })
    const formData = new FormData()
    const search_input_value = _("#search_input").text
    const sort_inputValue = (_("#sort_input").element as HTMLSelectElement).value
    formData.append("sort_name", sort_inputValue)
    if(search_input_value.length != 0){
        formData.append("words", search_input_value)
    }
    formData.append("from", `${from_start_seacrh}`)
    const HTTP_Data = await send_HTTP_Requist({
        url:"/api/v1/dashbord/search/render_agine",
        formData
    })
    if(!HTTP_Data){
        return
    }
    if(HTTP_Data.length == 0){
        console.log("out of amo")
        _("#More_Button").addStyles({
            display:"none"
        })
        return 
    }
    if(HTTP_Data.length < 12){
        console.log("out of amo")
        _("#More_Button").addStyles({
            display:"none"
        })
    }
    if(before_Render){
        await before_Render()
    }
    _("#server_holder_div").addChilds(...HTTP_Data.map((value:any) => {
        from_start_seacrh++
        return _single_server({
            server_stars:`${value.rate}`,
            server_disc:value.disc,
            server_image:value.basket_embed_imageURL,
            server_name:value.server_name
        })
    }))
}


var from_start_seacrh:number = 0

const _section_2 = async () => {
    const data = await send_HTTP_Requist({
        url:"/api/v1/dashbord/search/render",
    })
    if(!data){
        return _div({
            classes:"servers"
        })
    }
    if(data.length == 0){
        console.log("out of amo")
        return _div({
            classes:"servers"
        })
    }
    var server_holder_div:YoFiElement
    var More_Button:YoFiElement
   
    return _div(
        {
            classes:"servers",
            id:"server_holder_div"
        },
        (elm) => {
            server_holder_div = elm
        }, 
       ...data.map((value:any) => {
            from_start_seacrh++
            return _single_server({
                server_stars:`${value.rate}`,
                server_disc:value.disc,
                server_image:value.basket_embed_imageURL,
                server_name:value.server_name
            })
        }),
        _button("more",(elm) => More_Button = elm, {
            classes:"more",
            id:"More_Button"
        }).onClick(async elm => {
            await render()
        })
    )
}

const _section_1 = () => {
    return _div(
        {
            classes:"filter"
        },
        _div(
            {
                classes:"input_holder"
            },
            _label("Server Name"),
            _div(
                {
                    classes:"input"
                },
                _input({
                    type:"text",
                    id:"search_input"
                }),
                _button(
                    _i({classes:"fa-solid fa-magnifying-glass"})
                ).onClick(elm => {
                    from_start_seacrh = 0
                    render(async() => {
                       
                        Array.from(_("#server_holder_div").element.children)
                        .forEach(elm => {
                            if(elm.tagName == "BUTTON"){
                                return
                            }
                            elm.remove()
                        })
                    })
                }),
                _select(
                    {
                        id:"sort_input"
                    },
                    (elm) =>{
                        elm.element.onchange = () => {
                            from_start_seacrh = 0
                            render(async() => {
                                
                                Array.from(_("#server_holder_div").element.children)
                                .forEach(elm => {
                                    if(elm.tagName == "BUTTON"){
                                        return
                                    }
                                    elm.remove()
                                })
                            })
                        }
                        (elm.element as HTMLSelectElement).value = "rate"
                    },
                    ...[
                        "Name",
                        "Rate",
                        "Name reverse",
                        "Rate reverse",
                    ].map(value => {
                        return _option_search(value)
                    })
                )
            ),
        ),
    )
}

const _single_server = ({
    server_stars,
    server_disc,
    server_name,
    server_image
}:{
    server_stars:string,
    server_name:string,
    server_disc:string,
    server_image:string
}) => {
    return _div(
        {
            classes:"singel_server"
        },
        _div(
            {
                classes:"title"
            },
            _img({
                src:server_image || "/images/store.jpg",
                classes:"logo"
            }),
            _div(
                {
                    classes:"values"
                },
                _p(server_name),
                _img({classes:"stars_image",src:`/images/stars/${server_stars.includes(".") ? `${server_stars.split(".")[0]}h.svg` : `${server_stars}.svg`}`})
            )
        ),
        _div(
            {
                classes:"disc"
            },
            _p(server_disc)
        )

    )
}

renderSearch()

