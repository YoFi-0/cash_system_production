import { inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ProductsWithSectionTable } from '../tables'
import discord from 'discord.js'
import { DB_ProductsWithSection } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('delete_product__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    if(!interaction.message){
        interaction.editReply(_$.custom_id.delete_product__model.badMsg.sectionNotFound)
        return
    }

    await interaction.deferReply({
        ephemeral:true
    })
    await sleep(3000)
    const sectionName = interaction.message.content.split('***')[1]
    const productName = interaction.fields.getTextInputValue('delete_product_row_1').trim()
    const testInput = inputsFillter({
        prosuct_input:productName,
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    var isProductFound
    try{
        isProductFound = await ProductsWithSectionTable.findOne({
            where:{
                server_id:interaction.guild.id,
                product_name:productName,
                section_name:sectionName
            } as DB_ProductsWithSection,
            logging:false
        })
    } catch(err) {
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!isProductFound){
        interaction.editReply(`${_$.custom_id.delete_product__model.badMsg.productNotFoundsMsg._1} **${productName}**  ${_$.custom_id.delete_product__model.badMsg.productNotFoundsMsg._2} ***${sectionName}***`)
        return
    }
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('delete_product_yes')
            .setLabel(_$.custom_id.delete_product__model.finalMsg.buttons.yesDelete)
            .setStyle(discord.ButtonStyle.Danger),
    )
    interaction.editReply({
        components:[row as any],
        content:`${_$.custom_id.delete_product__model.finalMsg.msg._1} **${productName}** ${_$.custom_id.delete_product__model.finalMsg.msg._2} ***${sectionName}***`
    })
})
