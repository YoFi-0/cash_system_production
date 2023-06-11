// import { get_lang_by_msg, lang_obj } from "../functions/lang";
// import { Custom_id } from "../handler/custom_id";
// import discord from 'discord.js'
// export default new Custom_id('check_out_create_model', ({interaction, client}) => {
//     if(!interaction.isButton()){
//         return
//     }
//     const _$ = lang_obj(get_lang_by_msg(interaction))
//     const modal = new discord.ModalBuilder()
//     .setCustomId('check_out__model')
//     .setTitle(_$.commands.publish_my_store.basket.buttons._3);

//     const input_1 = new discord.TextInputBuilder()
//     .setCustomId('check_out_row_1')
//     .setLabel(_$.custom_id.check_out_create_model.emailLable)
//     .setStyle(discord.TextInputStyle.Short);

//     const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;

//     modal.addComponents(row_1)
//     interaction.showModal(modal)
// })