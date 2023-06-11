import { IsvalidUser, inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ProductsWithSectionTable, ServerStsusEnums } from '../tables'
import discord from 'discord.js'
import { DB_ProductsWithSection } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('update_product__model', async({interaction, client}) => {
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
    if(!interaction.message){
        interaction.editReply(_$.custom_id.update_product__model.badMsgs.noSection)
        return
    }
    const oldProductName = interaction.fields.getTextInputValue('update_product_row_1').trim()
    const newProductName = interaction.fields.getTextInputValue('update_product_row_2').trim()
    const productPrice = interaction.fields.getTextInputValue('update_product_row_3').trim()
    const sectionName = interaction.message.content.split('***')[1]
    const testInput1 = inputsFillter({
        prosuct_input:newProductName,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput1.test){
        interaction.editReply(testInput1.msg)
        return
    }
    const testInput = inputsFillter({
        prosuct_input:oldProductName,
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(isNaN(Number(productPrice)) || Number(productPrice) <= 1){
        interaction.editReply(_$.custom_id.update_product__model.badMsgs.priceMustNuber)
        return
    }
    if(Number(productPrice) > 10_000){
        interaction.editReply(_$.custom_id.update_product__model.badMsgs.priceToHigh)
        return
    }
    var getAllProducts
    try{
        getAllProducts = await ProductsWithSectionTable.findAll({
            where:{
                server_id:interaction.guildId,
                section_name:sectionName,
            } as DB_ProductsWithSection,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        await replayWithDeffer(_$.all.err)
        return
    }
    var getNewProduct
    var getOldProduct
    const allProducts = getAllProducts.map((value) =>{
        const product:DB_ProductsWithSection = value.get()
        if(product.product_name == oldProductName){
            getOldProduct =  oldProductName
        }
        if(product.product_name == newProductName){
            getNewProduct = newProductName
        }
        return product
    })
    if(!getOldProduct){
        await replayWithDeffer(`${_$.custom_id.update_product__model.badMsgs.productNotFound._1} **${oldProductName}** ${_$.custom_id.update_product__model.badMsgs.productNotFound._2} ***${sectionName}***`)
        return
    }
    if(getNewProduct){
        if(oldProductName != newProductName){
            await replayWithDeffer(`${_$.custom_id.update_product__model.badMsgs.thereAnotherProduct._1} **${newProductName}** ${_$.custom_id.update_product__model.badMsgs.thereAnotherProduct._2} ***${sectionName}***`)
            return
        }
    }
    try{
        await ProductsWithSectionTable.update({
            server_id:interaction.guildId,
            product_name:newProductName,
            product_price:Number(productPrice),
        } as DB_ProductsWithSection,{
            where:{
                section_name:sectionName,
                product_name:oldProductName
            } as DB_ProductsWithSection,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        await replayWithDeffer(_$.all.err)
        return
    }
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
                    if(value.product_name == oldProductName){
                        value.product_name = newProductName,
                        value.product_price = Number(productPrice)
                    }
                    return {
                        label: value.product_name,
                        description: `${_$.custom_id.all.sectionSelectror.words.price}: ${value.product_price}$`,
                        value: `${value.product_name}_${value.product_price}_${value.section_name}`,
                    }
                })
            )
    )
    const row2 = allProducts.length == 0 ? new discord.ActionRowBuilder()
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
    await sleep(3000)
    await interaction.editReply({
        content:`${_$.custom_id.update_product__model.finalMsg._1} **${oldProductName}** ${_$.custom_id.update_product__model.finalMsg._2} ***${sectionName}***
\`\`\`
${_$.custom_id.update_product__model.finalMsg._3}: ${oldProductName}
${_$.custom_id.update_product__model.finalMsg._4}: ${newProductName}
${_$.custom_id.update_product__model.finalMsg._5}: ${productPrice}
\`\`\``,
        components:[selectorRow as any, row2]
    })
})