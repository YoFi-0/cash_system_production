// import { Command } from "../handler/commands";
// import discord from 'discord.js'
// import { IsvalidUser, _$, payPalClient } from "../functions";
// import {promisify} from 'util'
// import fs from 'fs'
// import path from 'path'
// import { BotConfigType } from "../types";
// const readFile = promisify(fs.readFile)
// export default new Command({
//     name:'get_user_payments_by_date',
//     description: _$.commands.get_user_payments_by_date.description,
//     options:[
//         {
//             name:_$.commands.get_user_payments_by_date.commandOptions._1.name,
//             type:discord.ApplicationCommandOptionType.User,
//             description:_$.commands.get_user_payments_by_date.commandOptions._1.description,
//             required:true
//         },
//         {
//             name:_$.commands.get_user_payments_by_date.commandOptions._2.name,
//             type:discord.ApplicationCommandOptionType.String,
//             description:_$.commands.get_user_payments_by_date.commandOptions._2.description,
//             required:true
//         },
//         {
//             name:_$.commands.get_user_payments_by_date.commandOptions._3.name,
//             type:discord.ApplicationCommandOptionType.String,
//             description:_$.commands.get_user_payments_by_date.commandOptions._3.description,
//             required:true
//         }
//     ],
//     run: async({interaction, client}) =>{
//         const payPal = payPalClient({
//             client_id:'ARnmkJUzeOr9ZvMRvrTLcT4yWkhQ2Oyr_NbnPn3Tt5uvi_rlK_o6eoC5ku11fuCwS9Cruryc-oV-XXWi',
//             client_secrit:'EKYDlXoQ1W_U3QYaTPQ5cfJPJrtUzi8P8TbMbySdSm_iBgRMlE0fZXbHwrunUHcdCjEkXKE7DCcN15hb',
//         })
//         const isValidUser = await IsvalidUser(interaction as any, 'LogsOnly')
//         if(!isValidUser){
//             await interaction.reply(_$.all.bad_permetion)
//             return
//         }
//         await interaction.deferReply({
//             ephemeral:true
//         })
//         const rplaceDate = (date:Date) => {
//             return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00': date.getUTCMinutes()}`
//         }
//         const userId = interaction.options.data[0].value
//         const userName = interaction.options.data[0].user?.username
//         var startDate = interaction.options.data[1].value as string
//         var endDate = interaction.options.data[2].value as string
//         if(Number.isNaN(Number(startDate.split('-')[0])) || 
//         Number.isNaN(Number(startDate.split('-')[1])) || 
//         Number.isNaN(Number(startDate.split('-')[2])) || 
//         Number.isNaN(Number(endDate.split('-')[0])) || 
//         Number.isNaN(Number(endDate.split('-')[1])) || 
//         Number.isNaN(Number(endDate.split('-')[2])) ||
//         endDate.split('-')[3] ||
//         startDate.split('-')[3]
//         ){
//             interaction.editReply(_$.commands.get_my_payments_by_date.badMsgs.invaldDate)
//             return 
//         }
//         const formatDate = (date:string) => {
//             return date.split('-').map((value, i) => {
//                  if((i == 1 || i == 2) && value.length == 1){
//                      return '0' + value
//                  }
//                  return value
//              }).join('-')
//          }
//         if((endDate.split('-')[0].length == 2) || (endDate.split('-')[2].length == 4)){
//             endDate = endDate.split('-').reverse().join('-')
//         }
//         if((startDate.split('-')[0].length == 2) || (startDate.split('-')[2].length == 4)){
//             startDate = startDate.split('-').reverse().join('-')
//         }
//         endDate = formatDate(endDate)
//         startDate = formatDate(startDate)
//         var allInvoices
//         try{
//             allInvoices = await payPal.getInvoicesForUser({
//                 user_id:userId as string,
//                 start_date:startDate as string,
//                 end_date:endDate as string,
//             })
//         } catch(err:any){
//             if(err.response.data.name == 'INVALID_REQUEST'){
//                 interaction.editReply(_$.commands.get_my_payments_by_date.badMsgs.invaldDate)
//             } else {
//                 interaction.editReply(_$.all.err)
//             }
//             return
//         }
//         if(!allInvoices.items){
//             if(userName && userId){
//                 await interaction.channel!.send(`***${userName}*** ${_$.commands.get_my_payments_by_date.badMsgs.userHasNoInvoice} ${startDate} - ${endDate}
// ${_$.commands.get_my_payments_by_date.words.username}: ${userName}
// ${_$.commands.get_my_payments_by_date.words.userId}: ${userId}
// `)
//             } else {
//                 await interaction.editReply(_$.commands.get_my_payments_by_date.badMsgs.connotFindTheUser)
//                 return
//             }
//             await interaction.editReply(_$.commands.get_my_payments_by_date.okMsgs.dataCollectd)
//             return
//         }
//         const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
//         const config:BotConfigType = JSON.parse(configReder)
//         const finalRespons:{
//             items:{
//                 name:string,
//                 quantity:string,
//                 unit_amount:string
//             }[],
//             invoice_date:Date
//             last_update_time:Date
//             totalPrice:string
//         } []= []
//         for(let invoice of allInvoices.items){
//             if(invoice.status == 'PAID'){
//                 const totalPrice = invoice.amount.value + ` ${config[5].content}`
//                 var invoiceDetalse
//                 try{
//                     invoiceDetalse = await payPal.getInvoiceById(invoice.id)
//                 } catch(err:any){
//                     if(err.response.data.name == 'INVALID_REQUEST'){
//                         interaction.editReply(_$.commands.get_my_payments_by_date.badMsgs.invaldDate)
//                     } else {
//                         interaction.editReply(_$.all.err)
//                     }
//                     return
//                 }
//                 const finalItmes:{
//                     name:string,
//                     quantity:string,
//                     unit_amount:string,
//                 }[] = []
//                 for(let prodcut of invoiceDetalse.items){
//                     finalItmes.push({
//                         name: prodcut.name,
//                         quantity:prodcut.quantity,
//                         unit_amount:prodcut.unit_amount.value,
//                     })
//                 }
//                 finalRespons.push({
//                     items:finalItmes,
//                     totalPrice:totalPrice,
//                     invoice_date:new Date(invoiceDetalse.detail.metadata.create_time),
//                     last_update_time:new Date(invoiceDetalse.detail.metadata.last_update_time)
//                 })
//             }
//         }
//         if(finalRespons.length == 0){
//             if(userName){
//                 await interaction.channel!.send(_$.commands.get_my_payments_by_date.badMsgs.userNoInvoiceYet)
//             } else {
//                 await interaction.editReply(_$.commands.get_my_payments_by_date.badMsgs.connotFindTheUser)
//                 return
//             }
//             await interaction.editReply(_$.commands.get_my_payments_by_date.okMsgs.dataCollectd)
//             return
//         }
//         for(let invoice of finalRespons){
// await interaction.channel!.send(
// `***${_$.commands.get_my_payments_by_date.words.username}: ${userName || `${_$.commands.get_my_payments_by_date.words.username} ${_$.commands.get_my_payments_by_date.finalInvoices.notFoundInServer}`}***
// ***${_$.commands.get_my_payments_by_date.words.userId}: ${userId || `${_$.commands.get_my_payments_by_date.words.userId} ${_$.commands.get_my_payments_by_date.finalInvoices.notFoundInServer}`}***
// ${userName ? `***${_$.commands.get_my_payments_by_date.finalInvoices.invoicePideBy} ${userName}***` : ''}
// \`\`\`
// ${!rplaceDate(invoice.invoice_date).includes('NaN') ? `${_$.commands.get_my_payments_by_date.finalInvoices.invoiceCreatedAt}: ${rplaceDate(invoice.invoice_date)} (${_$.commands.get_my_payments_by_date.finalInvoices.byUTC})` : ''}
// ${!rplaceDate(invoice.last_update_time).includes('NaN') ? `${_$.commands.get_my_payments_by_date.finalInvoices.invoiceUpdatedAT}: ${rplaceDate(invoice.last_update_time)} (${_$.commands.get_my_payments_by_date.finalInvoices.byUTC})` : ''}

// ${invoice.items.map(product => {
// return `${_$.commands.get_my_payments_by_date.words.productName} ${product.name}
// ${_$.commands.get_my_payments_by_date.words.quantity}: ${product.quantity}
// ${_$.commands.get_my_payments_by_date.words.singleProductPrice}: ${product.unit_amount}

// `
// }).join('')}
// ${_$.commands.get_my_payments_by_date.words.totlePrice}: ${invoice.totalPrice}
// \`\`\`
// ***-----------------***`
//                     )
//         }
//         interaction.editReply(_$.commands.get_my_payments_by_date.okMsgs.allInvoicesSent)
//     }
// })