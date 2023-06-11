import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('delete_this_single_product', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    const prodcutName = interaction.message.content.split('**')[1]
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('delete_single_product_yes')
            .setLabel(_$.custom_id.delete_this_single_product.finalMsg.buttons.yesDeleteButton)
            .setStyle(discord.ButtonStyle.Danger),
    )
    interaction.reply({
        components:[row as any],
        ephemeral:true,
        content:`${_$.custom_id.delete_this_single_product.finalMsg.msg._1} **${prodcutName}**`
    })
})