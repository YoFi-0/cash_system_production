// import { IsvalidUser, _$ } from "../functions";
// import { Custom_id } from "../handler/custom_id";
// import {promisify} from 'util'
// import fs from 'fs'
// import path from 'path'
// import { BotConfigType } from "../types";
// const readFile = promisify(fs.readFile)
// export default new Custom_id('delete_msg_with_id', async({interaction, client}) => {
//     if(!interaction.isButton()){
//         return
//     }
//     const isValidUser = await IsvalidUser(interaction as any, 'LogsOnly')
//     if(!isValidUser){
//         await interaction.reply(_$.all.bad_permetion)
//         return
//     }
//     await interaction.deferReply({
//         ephemeral:true
//     })
//     const msgId = interaction.message.embeds[0].fields[2].value
//     const massges = await interaction.channel?.messages.fetch()
//     if(!massges){
//         interaction.editReply({
//             content: _$.custom_id.delete_msg_with_id.badMsg.noMsgs
//         })
//         return
//     }
//     var isMsgFound = false
//     for(let msg of massges){
//         if(msg['1'].id == msgId){
//             await msg['1'].delete()
//             isMsgFound = true
//             break;
//         }
//     }
//     const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
//     const config:BotConfigType = JSON.parse(configReder)
//     if(interaction.channel?.id == config[4].content){
//         if(isMsgFound){
//             interaction.editReply({
//                 content:_$.custom_id.delete_msg_with_id.finalMsg.ok
//             })
//         } else {
//             interaction.editReply({
//                 content:_$.custom_id.delete_msg_with_id.finalMsg.notOK
//             })
//         }
//         return
//     }
//     if(isMsgFound){
//         interaction.editReply({
//             content:_$.custom_id.delete_msg_with_id.finalMsg.ok2
//         })
//     } else {
//         interaction.editReply({
//             content:_$.custom_id.delete_msg_with_id.finalMsg.notOK
//         })
//     }

// })