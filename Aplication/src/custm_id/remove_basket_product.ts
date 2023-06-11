import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('remove_basket_product', async({interaction, client}) => {
    if(!interaction.isSelectMenu()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))    
    await interaction.deferReply({
        ephemeral:true
    })
    
    const productName = interaction.values[0].split('_')[0]
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('remove_basket_product_yes')
            .setLabel(_$.custom_id.remove_basket_product.finalMsg.buttons.yesRemove)
            .setStyle(discord.ButtonStyle.Danger),
    )
    interaction.editReply({
        components:[row as any],
        content:`${_$.custom_id.remove_basket_product.finalMsg.msg._1} **${productName}**`
    })
})