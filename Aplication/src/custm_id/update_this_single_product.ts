import { max_len } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('update_this_single_product', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))    
    const modal = new discord.ModalBuilder()
    .setCustomId('update_this_single_product__model')
    .setTitle(_$.custom_id.update_this_single_product.model.title);

    const input_1 = new discord.TextInputBuilder()
    .setCustomId('update_this_single_product_row_1').setMaxLength(max_len.product_name)
    .setLabel(_$.custom_id.update_this_single_product.model.lables.newName)
    .setStyle(discord.TextInputStyle.Short);

    const input_2 = new discord.TextInputBuilder()
    .setCustomId('update_this_single_product_row_2').setMaxLength(max_len.product_price)
    .setLabel(_$.custom_id.update_this_single_product.model.lables.price)
    .setStyle(discord.TextInputStyle.Short);

    const input_3 = new discord.TextInputBuilder({
        required:false
    })
    .setCustomId('update_this_single_product_row_3').setMaxLength(max_len.description)
    .setLabel(_$.custom_id.update_this_single_product.model.lables.disc)
    .setStyle(discord.TextInputStyle.Paragraph);

    const input_4 = new discord.TextInputBuilder({
        required:false
    })
    .setCustomId('update_this_single_product_row_4').setMaxLength(max_len.image_url)
    .setLabel(_$.custom_id.update_this_single_product.model.lables.imageURL)
    .setStyle(discord.TextInputStyle.Short);


    const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;
    const row_2 = new discord.ActionRowBuilder().addComponents(input_2) as any;
    const row_3 = new discord.ActionRowBuilder().addComponents(input_3) as any;
    const row_4 = new discord.ActionRowBuilder().addComponents(input_4) as any;

    modal.addComponents(row_1, row_2, row_3, row_4)
    interaction.showModal(modal)
})