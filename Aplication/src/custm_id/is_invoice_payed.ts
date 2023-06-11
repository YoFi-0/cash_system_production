// import { _$, payPalClient, sleep } from "../functions";
// import { Custom_id } from "../handler/custom_id";
// import { BascitTaple, InvoicesTable, NotPaidInvoicesMsgsTable } from "../tables";
// import { BotConfigType, DB_Bascit, DB_Invoices, DB_NotPaidInvoicesMsgs, InvoiceByIdType } from "../types";
// import discord from 'discord.js'
// import {promisify} from 'util'
// import fs from 'fs'
// import path from 'path'
// const readFile = promisify(fs.readFile)
// export default new Custom_id('is_invoice_payed', async({interaction, client}) => {
//     if(!interaction.isButton()){
//         return
//     }
    
//     await interaction.deferReply({
//         ephemeral:true
//     })
//     const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
//     const config:BotConfigType = JSON.parse(configReder)
    
//     const payPal = payPalClient({
//         client_id:'ARnmkJUzeOr9ZvMRvrTLcT4yWkhQ2Oyr_NbnPn3Tt5uvi_rlK_o6eoC5ku11fuCwS9Cruryc-oV-XXWi',
//         client_secrit:'EKYDlXoQ1W_U3QYaTPQ5cfJPJrtUzi8P8TbMbySdSm_iBgRMlE0fZXbHwrunUHcdCjEkXKE7DCcN15hb'
//     })

//     const userId = interaction.message.embeds[0].fields[1].value
//     const userName = interaction.message.embeds[0].fields[0].value
    
    
//     const calnceldInvoiceMsg = async() => {
//         if(interaction.channel && interaction.channel.id == config[4].content){
//             const embed = new discord.EmbedBuilder({
//                 title:_$.custom_id.is_invoice_payed.invoiceHasCanceled.embid.title,
//                 description:_$.custom_id.is_invoice_payed.invoiceHasCanceled.embid.description
//             }).addFields(
//                 {
//                     name:_$.custom_id.is_invoice_payed.invoiceHasCanceled.embid.fealds.username,
//                     value:userName,
//                     inline:true
//                 },
//                 {
//                     name:_$.custom_id.is_invoice_payed.invoiceHasCanceled.embid.fealds.userId,
//                     value:userId,
//                     inline:true
//                 },
//                 {
//                     name:_$.custom_id.is_invoice_payed.invoiceHasCanceled.embid.fealds.msgId,
//                     value:interaction.message.id,
//                     inline:false
//                 }
//             )
//             const linkInvoiceButton = new discord.ActionRowBuilder()
//             .addComponents(
//                 new discord.ButtonBuilder()
//                     .setCustomId('delete_msg_with_id')
//                     .setLabel(_$.custom_id.is_invoice_payed.invoiceHasCanceled.buttons.yesDelete)
//                     .setStyle(discord.ButtonStyle.Danger),
//             )
//             await interaction.editReply({
//                 embeds:[embed],
//                 components:[linkInvoiceButton as any]
//             })
//             return
//         }
//         await interaction.editReply({
//             content:_$.custom_id.is_invoice_payed.invoiceHasCanceled.finalMsg.msg._1,
//         })
//         return
//     }

//     await sleep(2000)
//     var getUserInvoice
//     try{
//         getUserInvoice = await InvoicesTable.findOne({
//             where:{
//                 server_id:interaction.guildId,
//                 user_id:userId
//             } as DB_Invoices,
//             logging:false
//         }) 
//     } catch(err){
//         console.log(err)
//         interaction.editReply(_$.all.err)
//         return
//     }

//     if(!getUserInvoice){
//         try{
//             await BascitTaple.destroy({
//                 where:{
//                     server_id:interaction.guild.id,
//                     user_id:userId
//                 } as DB_Bascit,
//                 logging:false
//             })    
//         } catch(err){
//             console.log(err)
//             interaction.editReply(_$.all.err)
//             return
//         }
//         if(interaction.channel!.id == config[4].content){
//             await calnceldInvoiceMsg()
//             return
//         }
//         interaction.editReply(_$.custom_id.is_invoice_payed.badMsgs.noInvoiceYet)
//         return
//     }

//     const userInvoice:DB_Invoices = getUserInvoice.get()
//     var paidInvoice
//     try{
//         paidInvoice = await payPal.getInvoiceById(userInvoice.invoice_id) as InvoiceByIdType
//     } catch(err:any){
//         if(err.response.data.name == 'RESOURCE_NOT_FOUND'){
//                     try{
//                         await BascitTaple.destroy({
//                             where:{
//                                 server_id:interaction.guildId,
//                                 user_id:userId
//                             } as DB_Bascit, logging:false
//                         })
//                     } catch(err){
//                         console.log(err)
//                         interaction.editReply(_$.all.err)
//                         return
//                     }
//             interaction.editReply(_$.custom_id.is_invoice_payed.badMsgs.iCantFindInvoice)
//             return
//         }
//         console.log(err)
//         interaction.editReply(_$.all.err)
//         return
//     }

//     if(paidInvoice.status == 'CANCELLED'){
//         try{
//             await InvoicesTable.destroy({
//                 where:{
//                     server_id:interaction.guildId,
//                     user_id:userId
//                 } as DB_Invoices,
//                 logging:false
//             }) 
//             await NotPaidInvoicesMsgsTable.destroy({
//                 where:{
//                     server_id:interaction.guildId,
//                     user_invoice_id:userId
//                 } as DB_NotPaidInvoicesMsgs,
//                 logging:false
//             }) 
//             await BascitTaple.destroy({
//                 where:{
//                     server_id:interaction.guildId,
//                     user_id:userId
//                 } as DB_Bascit,
//                 logging:false
//             }) 
//         } catch(err){
            
//         }
//         await calnceldInvoiceMsg()
//         return
//     }
//     if(paidInvoice.status != 'PAID'){
//         const embed = new discord.EmbedBuilder({
//             title:_$.custom_id.is_invoice_payed.notPaidInvoice.embid.title,
//         }).setColor('Red')
//         const linkInvoiceButton = new discord.ActionRowBuilder()
//         .addComponents(
//             new discord.ButtonBuilder()
//                 .setURL(userInvoice.invoice_link)
//                 .setLabel(_$.custom_id.is_invoice_payed.notPaidInvoice.buttons.pay)
//                 .setStyle(discord.ButtonStyle.Link),
//         )
//         await interaction.editReply({
//             embeds:[embed],
//             components:[linkInvoiceButton as any]
//         })
//         return
//     }
    
//     var getLogMsg 
//     try{
//         await BascitTaple.destroy({
//             where:{
//                 server_id:interaction.guildId,
//                 user_id:userId
//             } as DB_Bascit, logging:false
//         })
//         await InvoicesTable.destroy({
//             where:{
//                 user_id:userId,
//                 server_id:interaction.guildId,
//             } as DB_Invoices,
//             logging:false
//         })
//         getLogMsg = await NotPaidInvoicesMsgsTable.findOne({
//             where:{
//                 server_id:interaction.guildId,
//                 user_invoice_id:userId
//             } as DB_NotPaidInvoicesMsgs,
//             logging:false
//         })
//     } catch(err){
//         console.log(err)
//         interaction.editReply(_$.all.err)
//         return
//     }
   
//     if(getLogMsg){
//         try{
//             const channel = await interaction.guild.channels.fetch(config[4].content as string) as discord.TextChannel
//             const logsMsg:DB_NotPaidInvoicesMsgs = getLogMsg.get()
//             const msg = await channel.messages.fetch(logsMsg.msg_id)
//             if(channel){
//                 await msg.delete()
//             }
//         } catch(err){
            
//         }
//         try{
//             await NotPaidInvoicesMsgsTable.destroy({
//                 where:{
//                     server_id:interaction.guildId,
//                     user_invoice_id:userId
//                 } as DB_NotPaidInvoicesMsgs,
//                 logging:false
//             })
//         } catch(err){
//             console.log(err)
//             interaction.editReply(_$.all.err)
//             return
//         }
//     }

//     const rplaceDate = (date:Date) => {
//         return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours() == 0 ? '00' : date.getUTCHours()}:${date.getUTCMinutes() == 0 ? '00': date.getUTCMinutes()}`
//     }
//     const congratEmbed = new discord.EmbedBuilder({
//         title:_$.custom_id.is_invoice_payed.paidInvoice.embid.title,
//         description:`${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.congrat._1} ${userName} ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.congrat._2}

// ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.User}: <@${userId}>

// \`\`\`
// ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.Total_Price}: ${paidInvoice.amount.value} ${paidInvoice.amount.currency_code}
// ${!rplaceDate(new Date(paidInvoice.detail.metadata.create_time)).includes('NaN') ? `${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.invoice_created_at}: ${rplaceDate(new Date(paidInvoice.detail.metadata.create_time))} (${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.By_UTC_Time})` : ''}
// ${!rplaceDate(new Date(paidInvoice.detail.metadata.last_update_time)).includes('NaN') ? `${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.invoice_paid_at}: ${rplaceDate(new Date(paidInvoice.detail.metadata.last_update_time))} (${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.By_UTC_Time})` : ''}
// \`\`\`
// ***${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.products}***
// \`\`\`
// ${paidInvoice.items!.map(product => {
//     return `${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.product_name}: ${product.name}
// ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.quantity}: ${product.quantity}
// ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.single_prodcut_price}: ${product.unit_amount.value}
// ${_$.custom_id.is_invoice_payed.paidInvoice.embid.description.words.total_product_price}: ${Number(product.quantity) * Number(product.unit_amount.value)}

// `
//     }).join('\n')}
// \`\`\`
// `
//     })
//     const InoiceLnck = new discord.ActionRowBuilder()
//     .addComponents(
//         new discord.ButtonBuilder()
//             .setURL(userInvoice.invoice_link)
//             .setLabel(_$.custom_id.is_invoice_payed.finalUserMsg.buttons.invoiceLink)
//             .setStyle(discord.ButtonStyle.Link),
//     )
//     try{
//         const channel = await interaction.guild.channels.fetch(config[4].content as string) as discord.TextChannel
//         await channel.send({
//             embeds:[congratEmbed],
//             components:[InoiceLnck as any]
//         })
//     } catch(err){
        
//     }

//     const linkInvoiceButton = new discord.ActionRowBuilder()
//     .addComponents(
//         new discord.ButtonBuilder()
//             .setURL(userInvoice.invoice_link)
//             .setLabel(_$.custom_id.is_invoice_payed.finalUserMsg.buttons.invoiceLink)
//             .setStyle(discord.ButtonStyle.Link),
//     )
// })

