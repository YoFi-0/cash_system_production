import { IsvalidUser, inputsFillter } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ProductsWithSectionTable, SectionTable, ServerStsusEnums } from '../tables'
import discord from 'discord.js'
import { DB_ProductsWithSection, DB_SectionType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('create_Product__model', async({interaction, client}) => {
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
    // await sleep(3000)
    if(!interaction.message){
        interaction.editReply(_$.custom_id.create_Product__model.badMsgs._1)
        return
    }
    const productName = interaction.fields.getTextInputValue('create_product_row_1').trim()
    const productPrice = interaction.fields.getTextInputValue('create_product_row_2').trim()
    const sectionName = interaction.message.content.split('***')[1]
    
    const testInput = inputsFillter({
        prosuct_input:productName,
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(isNaN(Number(productPrice)) || Number(productPrice) < 1){
        interaction.editReply(_$.custom_id.create_Product__model.badMsgs.priceMustNumper)
        return
    }
    if(Number(productPrice) > 10_000){
        interaction.editReply(_$.custom_id.create_Product__model.badMsgs.priceToHigh)
        return
    }
    var getAllProducts
    try{
        const isSectionFound = await SectionTable.findOne({
            where:{
                server_id:interaction.guild.id,
                section_name:sectionName
            } as DB_SectionType,
            logging:false
        })
        if(!isSectionFound){
            interaction.editReply(`${_$.custom_id.create_Product__model.badMsgs.sectionNotFoundMsg._1}${sectionName}${_$.custom_id.create_Product__model.badMsgs.sectionNotFoundMsg._2}`)
            return
        }
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

    var isProdcutFound = null
    const allProducts = getAllProducts.map((value) =>{
        const product:DB_ProductsWithSection = value.get()
        if(product.product_name == productName){
            isProdcutFound = productName
        }
        return product
    })
    if(allProducts.length == 25){
        interaction.editReply(_$.custom_id.create_Product__model.badMsgs.only25)
        return
    }
    if(isProdcutFound){
        interaction.editReply(`${_$.custom_id.create_Product__model.badMsgs.productFound._1} ${productName}${_$.custom_id.create_Product__model.badMsgs.productFound._2}`)
        return
    }


    var newProduct:DB_ProductsWithSection | null = null
    try{
        const createProductDB = await ProductsWithSectionTable.create({
            product_name:productName,
            section_name:sectionName,
            server_id:interaction.guild.id,
            product_price:Number(productPrice)
        } as DB_ProductsWithSection,{
            logging:false
        })
        await createProductDB.save()
        newProduct = createProductDB.get()
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    allProducts.push(newProduct!)
    const selectorRow = new discord.ActionRowBuilder()
    .addComponents(
        new discord.SelectMenuBuilder({
            type: discord.ComponentType.SelectMenu,
        })
            .setPlaceholder(sectionName)
            .setMinValues(1)
            .setMaxValues(allProducts.length)
            .setCustomId('not_a_product')
            .setOptions(
                ...allProducts.map((value) => {
                    return {
                        label: value.product_name,
                        description: `${_$.custom_id.create_Product__model.finalMsg.priceWord}: ${value.product_price}$`,
                        value: `${value.product_name}_${value.product_price}_${value.section_name}`,
                    }
                })
            )
    )
    const row2 = allProducts.length == 0 ? new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_product')
            .setLabel(_$.custom_id.create_Product__model.finalMsg.buttons.addProduct)
            .setStyle(discord.ButtonStyle.Primary),
    ) 
    :  new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_product')
            .setLabel(_$.custom_id.create_Product__model.finalMsg.buttons.addProduct)
            .setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder()
            .setCustomId('update_product')
            .setLabel(_$.custom_id.create_Product__model.finalMsg.buttons.updateProduct)
            .setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder()
            .setCustomId('delete_product')
            .setLabel(_$.custom_id.create_Product__model.finalMsg.buttons.deleteBroduct)
            .setStyle(discord.ButtonStyle.Primary),
    )
    await interaction.editReply({
        content:`${_$.custom_id.create_Product__model.finalMsg.mag} ***${sectionName}***`,
        components:[selectorRow as any, row2]
    })
    
})