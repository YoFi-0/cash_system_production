import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
import { BascitTaple } from "../tables";
import { DB_Bascit, productInBascitType } from "../types";
import { sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('remove_from_my_basket', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    
    const _$ = lang_obj(get_lang_by_msg(interaction))    
    await interaction.deferReply({
        ephemeral:true
    })
    await sleep(2000)
    var getUserBasket
    try{
        getUserBasket = await BascitTaple.findOne({
            where:{
                server_id:interaction.guildId,
                user_id:interaction.user.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!getUserBasket){
        interaction.editReply(_$.custom_id.remove_from_my_basket.badMsgs.emptyBasket)
        return
    }
    const userBscitDB:DB_Bascit = getUserBasket.get()
    const userBasket:productInBascitType[] = JSON.parse(userBscitDB.products)
    const selectorRow = new discord.ActionRowBuilder()
    .addComponents(
        new discord.SelectMenuBuilder({
            type: discord.ComponentType.SelectMenu,
        })
        .setPlaceholder(`${interaction.user.username} ${_$.custom_id.remove_from_my_basket.selector.words.basket}`)
        .setCustomId('remove_basket_product')
        .setOptions(
            ...userBasket.map((value) => {
                return {
                    label: `${value.quantity}x${value.product_name}`,
                    description: `${_$.custom_id.remove_from_my_basket.selector.words.price}: $${value.product_price}`,
                    value: `${value.product_name}_${value.product_price}_${value.quantity}_${value.one_product_price}`,
                }
            })
        )
    )
    await interaction.editReply({
        components:[selectorRow as any]
    })
})