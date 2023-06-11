import { max_len } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('delete_section', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    const modal = new discord.ModalBuilder()
    .setCustomId('delete_Section__model')
    .setTitle(_$.custom_id.delete_section.model.title);

    const input_1 = new discord.TextInputBuilder()
    .setCustomId('delete_Section_row_1').setMaxLength(max_len.section_name)
    .setLabel(_$.custom_id.delete_section.model.productNameLable)
    .setStyle(discord.TextInputStyle.Short);

    const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;

    modal.addComponents(row_1)
    interaction.showModal(modal)
})