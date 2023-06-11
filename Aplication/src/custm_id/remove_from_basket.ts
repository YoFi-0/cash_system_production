import { max_len, sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
import { get_lang_by_msg, lang_obj } from "../functions/lang";
export default new Custom_id('remove_from_basket', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    
    const _$ = lang_obj(get_lang_by_msg(interaction))

    const modal = new discord.ModalBuilder()
    .setCustomId('remove_from_basket__model')
    .setTitle(_$.custom_id.remove_from_basket.model.title);

    const input_1 = new discord.TextInputBuilder()
    .setCustomId('remove_from_basket_row_1').setMaxLength(max_len.quantity)
    .setLabel(_$.custom_id.remove_from_basket.model.quantityLable)
    .setStyle(discord.TextInputStyle.Short);

    const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;

    modal.addComponents(row_1)
    interaction.showModal(modal)
})