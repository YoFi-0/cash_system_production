import { IsvalidUser, inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ProductsWithSectionTable, SectionTable, ServerStsusEnums } from '../tables'
import discord from 'discord.js'
import { DB_ProductsWithSection, DB_SectionType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('update_Section__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
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
    if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
        await interaction.reply(_$.all.ban_store_msg)
        return
    }
    await interaction.deferReply({
        ephemeral:true
    })
    const replayWithDeffer = async(msg:string, components?:any) =>{
        await sleep(3000)
        await interaction.editReply({
            components:components,
            content:msg,
        })
    }
    const sectionName = interaction.fields.getTextInputValue('update_Section_row_1').trim()
    const testInput = inputsFillter({
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    var isSectionExest
    try{
        isSectionExest = await SectionTable.findOne({
            where:{section_name:sectionName, server_id:interaction.guild.id} as DB_SectionType,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        await replayWithDeffer(_$.all.err)
        return
    }
    if(!isSectionExest){
        await replayWithDeffer(`${_$.custom_id.update_Section__model.basMsgs.sectionNotFound} ***${sectionName}***`)
        return
    }

    var getAllProducts
    try{
        getAllProducts = await ProductsWithSectionTable.findAll({
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

    var options:{
        label: string,
        description: string,
        value: string,
    }[];
    if(getAllProducts.length != 0){
        const allProducts = getAllProducts.map((value) =>{
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
    const row2 = options[0].value == 'not_a_product' ? 
    new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_product')
            .setLabel(_$.custom_id.all.sectionSelectror.buttons.addProduct)
            .setStyle(discord.ButtonStyle.Primary),
    )
    :new discord.ActionRowBuilder()
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
    await sleep(3000)
    await interaction.editReply({
        content:`${_$.custom_id.update_Section__model.finalMsg._1} ***${sectionName}*** ${_$.custom_id.update_Section__model.finalMsg._2}`,
        components:[selectorRow as any, row2]
    })
})