"use strict";
const aside = async () => {
    const getAllServers = await fetch("/api/v1/dashbord/all/get_all_owned_servers_id", {
        method: "get"
    });
    const get_server_id_and_icon = await getAllServers.json();
    if (is_respons_error(get_server_id_and_icon)) {
        return _aside({
            classes: "nav"
        }, _a({
            classes: "icon",
            href: "https://google.com"
        }, _img({
            src: "/images/Screenshot 2023-04-28 081426.png"
        })));
    }
    const images = get_server_id_and_icon.user_owned_servers;
    return _aside({
        classes: "nav"
    }, _a({
        classes: "icon",
        href: "https://google.com"
    }, _img({
        src: "/images/Screenshot 2023-04-28 081426.png"
    })), _a({
        classes: "icon button green",
        href: "/dashbord/user"
    }, _i({ classes: "fa-solid fa-folder-open" })), _div({
        classes: "servers"
    }, _div({
        classes: "allServers"
    }, ...images.map((value) => _a({ href: `/dashbord/server?server_id=${value.server_id}` }, _img({ src: value.server_icon })))), _a({
        classes: "button",
        href: "/dashbord/search",
    }, _i({
        classes: "fa-solid fa-magnifying-glass"
    }))), _a({
        classes: "icon button red",
    }, _i({ classes: "fa-solid fa-arrow-right-from-bracket" })).onClick(async (e) => {
        await fetch("/log_out?hide_user=" + user_user);
        window.location.assign("/");
    }));
};
