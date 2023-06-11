// import { Custom_id } from "../handler/custom_id";
// import discord from 'discord.js'
// import { BascitTaple } from "../tables";
// import { DB_Bascit, DB_Invoices } from "../types";
// import { get_lang_by_msg, lang_obj } from "../functions/lang";
// export default new Custom_id('submit_my_invoice', async({interaction, client}) => {
//     if(!interaction.isButton()){
//         return
//     }
//     const _$ = lang_obj(get_lang_by_msg(interaction))    
//     await interaction.deferReply({
//         ephemeral:true
//     })

//     var getUser
//     try{
//         getUser = await BascitTaple.findOne({
//             where:{
//                 server_id:interaction.guildId,
//                 user_id:interaction.user.id
//             } as DB_Bascit
//         })
//     } catch(err){
//         console.log(err)
//         interaction.editReply(_$.all.err)
//         return
//     }

//     if(!getUser){
//         interaction.editReply(_$.custom_id.submit_my_invoice.badMsgs.noInvoice)
//         return
//     }

//     const userInvoice:DB_Bascit = getUser.get()
//     const UserSubmentInvoiceEmbid = new discord.EmbedBuilder({
//         title:`${_$.custom_id.submit_my_invoice.finalMsg.embid.title._1} ${interaction.user.username}`,
//         description:_$.custom_id.submit_my_invoice.finalMsg.embid.description
//     })
//     .setColor('White')
//     .addFields(
//         {
//             name:_$.custom_id.submit_my_invoice.finalMsg.embid.filds.username,
//             value:`${interaction.user.username}`,
//             inline:true
//         },
//         {
//             name:_$.custom_id.submit_my_invoice.finalMsg.embid.filds.userId,
//             value:`${interaction.user.id}`,
//             inline:true
//         },
//     )
//     const UserSubmentInvoiceButtons = new discord.ActionRowBuilder()
//     .addComponents(
//         new discord.ButtonBuilder()
//             .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/invoice/payment?id=${userInvoice.payment_path}`)
//             .setLabel(_$.custom_id.submit_my_invoice.finalMsg.buttons.invouceLink)
//             .setStyle(discord.ButtonStyle.Link),
//         new discord.ButtonBuilder()
//             .setCustomId('cancel_invoice')
//             .setLabel(_$.custom_id.submit_my_invoice.finalMsg.buttons.cancelInvoice)
//             .setStyle(discord.ButtonStyle.Danger),
//     )
//     const getVatar = interaction.user.avatarURL()
//     if(getVatar){
//         UserSubmentInvoiceEmbid.setThumbnail(getVatar)
//     }

//     await interaction.editReply({
//         embeds:[UserSubmentInvoiceEmbid],
//         components:[UserSubmentInvoiceButtons as any]
//     })
// })
