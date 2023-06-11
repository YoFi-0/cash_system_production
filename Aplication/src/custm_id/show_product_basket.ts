import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
export default new Custom_id('show_product_basket', async({interaction, client}) => {
    if(!interaction.isSelectMenu()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    const valuesArray = interaction.values[0].split('_')

    const productName = valuesArray[0]
    const TotalPrice = valuesArray[1]
    const quantity = valuesArray[2]
    
    const embid = new discord.EmbedBuilder({
        title:_$.custom_id.show_product_basket.embid.title,
    }).setFields({
        name:_$.custom_id.show_product_basket.embid.words.Price,
        value:`$${TotalPrice}`,
        inline:true
    },
    {
        name:_$.custom_id.show_product_basket.embid.words.Product_Name,
        value:`${quantity}x${productName}`,
        inline:true
    })
    interaction.reply({
        embeds:[embid],
        ephemeral:true,
    })
})