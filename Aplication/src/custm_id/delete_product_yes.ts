import { IsvalidUser, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { Programlogs } from "../handler/logs";
import { ProductsWithSectionTable } from "../tables";
import { DB_ProductsWithSection } from "../types";
import discord from 'discord.js'
export default new Custom_id('delete_product_yes', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    const isValidUser = await IsvalidUser(interaction as any)
    if(isValidUser.err){
        await interaction.reply(_$.all.err)
        return
    }
    if(!isValidUser.status){
        await interaction.reply(_$.all.bad_permetion)
        return
    }
    const sectionName = interaction.message.content.split('***')[1]
    const productName = interaction.message.content.split('**')[1]
    await interaction.deferReply({
        ephemeral:true
    })
    var getEffectRowsProductDelete
    await sleep(3000)
    try{
        getEffectRowsProductDelete = await ProductsWithSectionTable.destroy({
            where:{
                server_id:interaction.guild.id,
                section_name:sectionName,
                product_name:productName
            } as DB_ProductsWithSection,
            logging:false
        })
    } catch(err) {
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(getEffectRowsProductDelete === 0){
        interaction.editReply(`${_$.custom_id.delete_product_yes.badMsgs.productNotFound._1} **${productName}** ${_$.custom_id.delete_product_yes.badMsgs.productNotFound._2} ***${sectionName}****`)
        return
    }
    var getAllDataWithDelete
    try{
        getAllDataWithDelete = await ProductsWithSectionTable.findAll({
            where:{
                server_id:interaction.guild.id,
                section_name:sectionName,
            } as DB_ProductsWithSection,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    
    var options:discord.RestOrArray<discord.SelectMenuOptionBuilder | discord.SelectMenuComponentOptionData | discord.APISelectMenuOption>;
    if(getAllDataWithDelete.length != 0){
        const allProducts = getAllDataWithDelete.map((value) =>{
            const product:DB_ProductsWithSection = value.get()
            return {
                label: product.product_name,
                description: `${_$.custom_id.all.sectionSelectror.words.price}: ${product.product_price}$`,
                value: `${product.product_name}_${product.product_price}_${product.section_name}`,
            }
        })
        options = allProducts
    } else {
        options = [
            {
                label: _$.custom_id.all.sectionSelectror.noProductOption.label,
                description: _$.custom_id.all.sectionSelectror.noProductOption.description,
                value: 'not_a_product',
            }
        ]
    }
    const selectorRow = new discord.ActionRowBuilder()
    .addComponents(
        new discord.SelectMenuBuilder({
            type: discord.ComponentType.SelectMenu,
        })
            .setPlaceholder(sectionName)
            .setMinValues(1)
            .setMaxValues(options.length)
            .setCustomId('not_a_product')
            .setOptions(
                ...options
            )
    )
    const row2 = (options[0] as any).value == 'not_a_product' ? new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_product')
            .setLabel(_$.custom_id.all.sectionSelectror.buttons.addProduct)
            .setStyle(discord.ButtonStyle.Primary),
    ) 
    :  new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_product')
            .setLabel(_$.custom_id.all.sectionSelectror.buttons.addProduct)
            .setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder()
            .setCustomId('update_product')
            .setLabel(_$.custom_id.all.sectionSelectror.buttons.updateProduct)
            .setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder()
            .setCustomId('delete_product')
            .setLabel(_$.custom_id.all.sectionSelectror.buttons.deleteProduct)
            .setStyle(discord.ButtonStyle.Primary),
    )
    interaction.editReply({
        content:`${_$.custom_id.delete_product_yes.finalMsg.msg._1} **${productName}** ${_$.custom_id.delete_product_yes.finalMsg.msg._2} ***${sectionName}***`,
        components:[selectorRow as any, row2]
    })
})