import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
import { SingleProductsTable } from "../tables";
import { DB_SingelProduct } from "../types";
import { inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('delete_single_product__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))    
    await interaction.deferReply({
        ephemeral:true
    })
    await sleep(3000)
    const productName = interaction.fields.getTextInputValue('delete_single_product_row_1').trim()
    const testInput = inputsFillter({
        prosuct_input:productName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    var isProductFound
    try{
        isProductFound = await SingleProductsTable.findOne({
            where:{
                server_id:interaction.guild.id,
                product_name:productName
            } as DB_SingelProduct,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!isProductFound){
        interaction.editReply(`${_$.custom_id.delete_single_product__model.badMsgd.productNotFound} **${productName}**`)
        return
    }
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('delete_single_product_yes')
            .setLabel(_$.custom_id.delete_single_product__model.finalMsg.buttons.yesDelete)
            .setStyle(discord.ButtonStyle.Danger),
    )
    interaction.editReply({
        components:[row as any],
        content:`${_$.custom_id.delete_single_product__model.finalMsg.msg._1} **${productName}**`
    })
})