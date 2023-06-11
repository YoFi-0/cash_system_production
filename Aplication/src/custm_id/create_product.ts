import { max_len } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('create_product', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }

    const _$ = lang_obj(get_lang_by_msg(interaction))
    const modal = new discord.ModalBuilder()
    .setCustomId('create_Product__model')
    .setTitle(_$.custom_id.create_product.model.title);

    const input_1 = new discord.TextInputBuilder()
    .setCustomId('create_product_row_1').setMaxLength(max_len.product_name)
    .setLabel(_$.custom_id.create_product.model.productNameLable)
    .setStyle(discord.TextInputStyle.Short);
    const input_2 = new discord.TextInputBuilder()
    .setCustomId('create_product_row_2').setMaxLength(max_len.product_price)
    .setLabel(_$.custom_id.create_product.model.productPrice)
    .setStyle(discord.TextInputStyle.Short);

    const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;
    const row_2 = new discord.ActionRowBuilder().addComponents(input_2) as any;

    modal.addComponents(row_1, row_2)
    interaction.showModal(modal)
})