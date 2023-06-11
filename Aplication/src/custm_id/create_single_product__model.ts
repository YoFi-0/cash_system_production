import { Custom_id } from "../handler/custom_id";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import discord from 'discord.js'
import { IsvalidUser, inputsFillter, sleep } from "../functions";
import { ServerStsusEnums, SingleProductsTable } from "../tables";
import { DB_SingelProduct } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('create_single_product__model', async({interaction, client}) => {
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
    interaction.deferReply({
        ephemeral:true
    })
    await sleep(3000)

    const productName = interaction.fields.getTextInputValue('create_single_product_row_1').trim()
    const productPrice = interaction.fields.getTextInputValue('create_single_product_row_2').trim()
    const productDisc = interaction.fields.getTextInputValue('create_single_product_row_3')?.trim()
    const productImgURL = interaction.fields.getTextInputValue('create_single_product_row_4')?.trim()
    console.log(productImgURL, productDisc)
    const fiterInput = {
        image_url:productImgURL,
        prosuct_input:productName,
        product_disc:productDisc,
        lang:get_lang_by_msg(interaction)
    }
    if(!productImgURL || productImgURL == ""){
        delete (fiterInput as any).image_url
    }
    if(!productDisc || productDisc == ""){
        delete (fiterInput as any).productDisc
    } 
    const testInput = inputsFillter(fiterInput)
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(isNaN(Number(productPrice)) || Number(productPrice) <= 1){
        interaction.editReply(_$.custom_id.create_single_product__model.bsdMsg.priceMustBeNumber)
        return
    }
    if(Number(productPrice) > 10_000){
        interaction.editReply(_$.custom_id.create_single_product__model.bsdMsg.priceToHigh)
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
    if(isProductFound){
        interaction.editReply(`${_$.custom_id.create_single_product__model.bsdMsg.productFound} **${productName}**`)
        return
    }

    try{
        await SingleProductsTable.create({
            server_id:interaction.guild.id,
            product_name:productName,
            product_price:Number(productPrice),
            product_disc:productDisc ? productDisc : null,
            product_img_url: productImgURL ? productImgURL : null
        } as DB_SingelProduct, {
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    
    const embid = new discord.EmbedBuilder({
        title:productName,
        description:productDisc ? productDisc : undefined,
    }).setFields({
        name:_$.custom_id.create_single_product__model.finalMsg.price,
        value:productPrice,
        inline:true
    },
    {
        name:_$.custom_id.create_single_product__model.finalMsg.productName,
        value:productName,
        inline:true
    })
    if(productImgURL){
        embid.setImage(productImgURL)
    }

    const rowSingleProduct = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_single_product')
            .setLabel(_$.custom_id.create_single_product__model.finalMsg.buttons.createAnotherProduct)
            .setStyle(discord.ButtonStyle.Success),
            new discord.ButtonBuilder()
            .setCustomId('update_this_single_product')
            .setLabel(_$.custom_id.create_single_product__model.finalMsg.buttons.updateThisProduct)
            .setStyle(discord.ButtonStyle.Success),
    );
    const row2 = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
        .setCustomId('delete_this_single_product')
        .setLabel(_$.custom_id.create_single_product__model.finalMsg.buttons.deleteThisProduct)
        .setStyle(discord.ButtonStyle.Success),
        new discord.ButtonBuilder()
        .setCustomId('show_all_single_product')
        .setLabel(_$.custom_id.create_single_product__model.finalMsg.buttons.showAllProducts)
        .setStyle(discord.ButtonStyle.Success),
    )
    interaction.editReply({
        content: `${_$.custom_id.create_single_product__model.finalMsg.msg._1} **${productName}** ${_$.custom_id.create_single_product__model.finalMsg.msg._2}`,
        embeds:[embid],
        components:[rowSingleProduct as any, row2]
    })
})