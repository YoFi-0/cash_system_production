import {client} from '../handler/runner'
import {Event} from '../handler/events'
import { DB_ServersTable, DB_UsersTable } from '../types'
import { Funcs } from '../functions/class'
import { ServerStsusEnums, ServersTable, UsersTable } from '../tables'
export default new Event("messageCreate", async (msg) => {
    const admin_users_ids = Funcs.admin_users_ids
    if(admin_users_ids.includes(msg.author.id)){
        if(msg.content.startsWith("!!!-")){
            const command = msg.content.split("-")[1]
            if(command.startsWith("ban_s")){
                const banCommandArray = command.split(" ")
                if(banCommandArray.length != 2){
                    return
                }
                const serverId = banCommandArray[1]
                const afectedRows = await ServersTable.update({
                    status:ServerStsusEnums.Ban
                } as DB_ServersTable, {
                    logging:false, 
                    where:{
                        server_id:serverId
                    } as DB_ServersTable
                })
                var server
                try{
                    server = await msg.client.guilds.fetch(serverId)
                } catch(err){

                }
                
                if(afectedRows[0] == 1){
                    msg.reply(`store server: ${server?.name || "not found"} has been banned`)
                } else {
                    msg.reply(`server is not found or is already bannded`)
                }
            }
            if(command.startsWith("un_ban_s")){
                const banCommandArray = command.split(" ")
                if(banCommandArray.length != 2){
                    return
                }
                const serverId = banCommandArray[1]
                const afectedRows = await ServersTable.update({
                    status:null
                } as DB_ServersTable, {
                    logging:false, 
                    where:{
                        server_id:serverId
                    } as DB_ServersTable
                })
                var server
                try{
                    server = await msg.client.guilds.fetch(serverId)
                } catch(err){

                }
                
                if(afectedRows[0] == 1){
                    msg.reply(`store server: ${server?.name || "not found"} is ready to go`)
                } else {
                    msg.reply(`server is not found or isnot bannded yet`)
                }
            }
            if(command.startsWith("ban_u")){
                const banCommandArray = command.split(" ")
                if(banCommandArray.length != 2){
                    return
                }
                const user_id = banCommandArray[1]
                const afectedRows = await UsersTable.update({
                    status:"ban"
                } as DB_UsersTable, {
                    logging:false, 
                    where:{
                        user_id:user_id
                    } as DB_UsersTable
                })
                console.log(user_id == "1034167607995154493")          
                if(afectedRows[0] == 1){
                    msg.reply(`user : ${`<@${user_id}>` || "not found"} has been banned`)
                } else {
                    msg.reply(`user is not found or is already bannded`)
                }
            }
            if(command.startsWith("un_ban_u")){
                const banCommandArray = command.split(" ")
                if(banCommandArray.length != 2){
                    return
                }
                const user_id = banCommandArray[1]
                const afectedRows = await UsersTable.update({
                    status:null
                } as DB_UsersTable, {
                    logging:false, 
                    where:{
                        user_id:user_id
                    } as DB_UsersTable
                })
                if(afectedRows[0] == 1){
                    msg.reply(`user : ${`<@${user_id}>` || "not found"} is ready to go`)
                } else {
                    msg.reply(`user is not found or isnot bannded yet`)
                }
            }
        }
    }
})