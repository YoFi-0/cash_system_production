// import { get_lang_by_msg, lang_obj } from "../functions/lang";
// import { Custom_id } from "../handler/custom_id";
// import { BascitTaple } from "../tables";
// import { DB_Bascit, DB_Invoices } from "../types";
// import discord from 'discord.js'
// export default new Custom_id('cancel_invoice', async({interaction, client}) => {
//     if(!interaction.isButton()){
//         return
//     }
//     const _$ = lang_obj(get_lang_by_msg(interaction))
//     const userId = interaction.user.id

//     const deleteAllDataForUserBasectLock = async() => {
//         await BascitTaple.destroy({
//             where:{
//                 server_id:interaction.guild.id,
//                 user_id:userId
//             } as DB_Bascit,
//             logging:false
//         })
//     }

    
//     await interaction.deferReply({
//         ephemeral:true
//     })

//     var isDEleted = true
//     try{
//         await deleteAllDataForUserBasectLock()
//     }catch(err){
//         isDEleted = false
//     }

   
//     const embed = new discord.EmbedBuilder({
//         title: isDEleted ? "ok" : "not on",
//         description: isDEleted ? `***${_$.custom_id.cancel_invoice.butInvoceUnlocked}***` : undefined
//     }).setColor('White')


//     await interaction.editReply({
//         embeds:[embed],
//     })
    
// })