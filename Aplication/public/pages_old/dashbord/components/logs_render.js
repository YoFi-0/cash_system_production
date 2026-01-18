"use strict";
class Render_Log {
    // user side
    static My_Servers_Donations(server_list) {
        return server_list.map((value) => {
            from_user_logs_start.my_servers_donations++;
            const amount = `${value.amount}${`${value.amount}`.includes(".") ? "" : ".00"}`;
            const Time = `${new Date(value.createdAt).getUTCHours()}h-${new Date(value.createdAt).getUTCMinutes()}`;
            return _payment_log({
                amount: amount,
                from_img_src: "",
                is_to_me: false,
                log_msg: `From : me
                To : ${value.resiver_server_or_user_name.replace("s", "")}
                Total amount : ${amount}
                Donatet Server Id : ${value.resiver_server_or_user_id.replace("s", "")}
                Create At : Date ${value.createdAt.replace("Z", "").split("T")[0]} Time ${Time}`,
                name: `${value.resiver_server_or_user_name.replace("s", "")}`,
                to_img_src: "",
                invoice_id: value.invoice_id,
            });
        });
    }
    static Private_Donations(server_list, renderData = localStorage_get("user_data")) {
        return server_list.map((value) => {
            from_user_logs_start.private_donations++;
            const amount = `${value.amount}${`${value.amount}`.includes(".") ? "" : ".00"}`;
            const Time = `${new Date(value.createdAt).getUTCHours()}h-${new Date(value.createdAt).getUTCMinutes()}m`;
            const isToMe = renderData.discord_user_id == value.resiver_server_or_user_id.replace("u", "");
            return _payment_log({
                amount: amount,
                from_img_src: "",
                is_to_me: isToMe,
                log_msg: `From : ${isToMe ? value.resiver_server_or_user_name.replace("u", "") : "me"}
                    To : ${isToMe ? "me" : value.resiver_server_or_user_name.replace("u", "")}
                    Total amount : ${amount}
                    ${isToMe ? "Donater" : "Donatet"} User Id : ${value.resiver_server_or_user_id.replace("u", "")}
                    Create At : Date ${value.createdAt.replace("Z", "").split("T")[0]} Time ${Time}`,
                name: `${value.resiver_server_or_user_name.replace("u", "")}`,
                to_img_src: "",
                invoice_id: value.invoice_id,
            });
        });
    }
    static Store_Payments(server_list, renderData = localStorage_get("user_data")) {
        return server_list.map((value) => {
            from_user_logs_start.store_payments++;
            const amount = `${value.total_amount}${`${value.total_amount}`.includes(".") ? "" : ".00"}`;
            const Time = `${new Date(value.createdAt).getUTCHours()}h-${new Date(value.createdAt).getUTCMinutes()}m`;
            return _payment_log({
                amount: `${amount}`,
                from_img_src: "",
                is_to_me: false,
                log_msg: `invoice_id:${value.invoice_id}
                    From : me
                    To : ${value.server_name}
                    Total amount : ${amount}$
                    Store Server ID : ${value.server_id}
                    Store Server Name : ${value.server_name}
                    Request lifter User ID : ${value.user_id.split("--88--")[0]}
                    Request lifter Username : ${value.user_username.split("--88--")[0]}
                    Payeer User ID :  ${value.user_id.split("--88--")[1]}
                    Payeer Username :  ${value.user_username.split("--88--")[1]}
                    Create At : Date ${value.createdAt.replace("Z", "").split("T")[0]} Time ${Time}`,
                name: value.server_name,
                invoice_id: value.invoice_id,
                to_img_src: "",
                is_it_payment: true
            });
        });
    }
    // server side
    static Donations(server_list) {
        return server_list.map((value) => {
            from_server_logs_start.donation++;
            const amount = `${value.amount}${`${value.amount}`.includes(".") ? "" : ".00"}`;
            const Time = `${new Date(value.createdAt).getUTCHours()}h-${new Date(value.createdAt).getUTCMinutes()}`;
            return _payment_log({
                amount: amount,
                from_img_src: "",
                is_to_me: true,
                log_msg: `From : ${value.sender_username}
                To : me
                Total amount : ${amount}
                Donator User Id : ${value.sender_user_id}
                Create At : Date ${value.createdAt.replace("Z", "").split("T")[0]} Time ${Time}`,
                name: value.sender_username,
                to_img_src: "",
                invoice_id: value.invoice_id,
                is_it_server: true
            });
        });
    }
    static This_Store_Payments(server_list) {
        return server_list.map((value) => {
            from_server_logs_start.this_store_payments++;
            const amount = `${value.total_amount}${`${value.total_amount}`.includes(".") ? "" : ".00"}`;
            const Time = `${new Date(value.createdAt).getUTCHours()}h-${new Date(value.createdAt).getUTCMinutes()}m`;
            return _payment_log({
                amount: `${amount}`,
                from_img_src: "",
                is_to_me: true,
                log_msg: `invoice_id:${value.invoice_id}
                    From : ${value.user_username.split("--88--")[0]}
                    To : me
                    Total amount : ${amount}$
                    Store Server ID : ${value.server_id}
                    Store Server Name : ${value.server_name}
                    Request lifter User ID : ${value.user_id.split("--88--")[0]}
                    Request lifter Username : ${value.user_username.split("--88--")[0]}
                    Payeer User ID :  ${value.user_id.split("--88--")[1]}
                    Payeer Username :  ${value.user_username.split("--88--")[1]}
                    Create At : Date ${value.createdAt.replace("Z", "").split("T")[0]} Time ${Time}`,
                name: value.user_username.split("--88--")[0],
                invoice_id: value.invoice_id,
                to_img_src: "",
                is_it_payment: true,
                is_it_server: true
            });
        });
    }
}
