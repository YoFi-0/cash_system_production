import { IsvalidUser, inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ServerStsusEnums, SingleProductsTable } from '../tables'
import discord from 'discord.js'
import { DB_SingelProduct } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('update_this_single_product__model', async({interaction, client}) => {
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

    await sleep(3000)
    if(!interaction.message){
        interaction.editReply(_$.custom_id.update_this_single_product__model.badMsgs.productNotFoundError)
        return
    }
    const productNewName = interaction.fields.getTextInputValue('update_this_single_product_row_1').trim()
    const productPrice = interaction.fields.getTextInputValue('update_this_single_product_row_2').trim()
    const productDisc = interaction.fields.getTextInputValue('update_this_single_product_row_3')?.trim()
    const productImgURL = interaction.fields.getTextInputValue('update_this_single_product_row_4')?.trim()
    const productOldName = interaction.message?.content.split('**')[1]
    const testInput1 = inputsFillter({
        prosuct_input:productNewName,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput1.test){
        interaction.editReply(testInput1.msg)
        return
    }
    const testInput = inputsFillter({
        prosuct_input:productNewName,
        section_name_input:productImgURL,
        product_disc:productDisc,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(isNaN(Number(productPrice)) || Number(productPrice) < 1){
        interaction.editReply(_$.custom_id.update_this_single_product__model.badMsgs.priceMusetBeANumber)
        return
    }
    if(Number(productPrice) > 10_000){
        interaction.editReply(_$.custom_id.update_this_single_product__model.badMsgs.priceToHigh)
        return
    }
    var isProductFound
    var isProducthaveSameName
    try{
        isProductFound = await SingleProductsTable.findOne({
            where:{
                server_id:interaction.guild.id,
                product_name:productOldName
            } as DB_SingelProduct,
            logging:false
        })
        isProducthaveSameName = await SingleProductsTable.findOne({
            where:{
                server_id:interaction.guild.id,
                product_name:productNewName
            } as DB_SingelProduct,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!isProductFound){
        interaction.editReply(`${_$.custom_id.update_this_single_product__model.badMsgs.productNotFound} **${productOldName}**`)
        return
    }
    if(isProducthaveSameName){
        if(productOldName != productNewName){
            interaction.editReply(`${_$.custom_id.update_this_single_product__model.badMsgs.anotherProduct} **${productNewName}**`)
            return
        }
    }
    const productFromDB:DB_SingelProduct = isProductFound?.get()
    try{
        await SingleProductsTable.update({
            product_name:productNewName,
            product_price:Number(productPrice),
            product_disc:productDisc ? productDisc : productFromDB.product_disc,
            product_img_url: productImgURL ? productImgURL : productFromDB.product_img_url
        } as DB_SingelProduct, {
            where:{
                server_id:interaction.guild.id,
                product_name:productOldName
            } as DB_SingelProduct,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    
    const embid = new discord.EmbedBuilder({
        title:productNewName,
        description:productDisc ? productDisc : productFromDB.product_disc,
    }).setFields({
        name:_$.all.singleProductEdit.words.Price,
        value:productPrice,
        inline:true
    },
    {
        name:_$.all.singleProductEdit.words.Product_Name,
        value:productNewName,
        inline:true
    })
    if(productImgURL){
        embid.setImage(productImgURL)
    } else if(productFromDB.product_img_url){
        embid.setImage(productFromDB.product_img_url)
    }

    const rowSingleProduct = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('create_single_product')
            .setLabel(_$.all.singleProductEdit.buttons.createAnotherProduct)
            .setStyle(discord.ButtonStyle.Success),
            new discord.ButtonBuilder()
            .setCustomId('update_this_single_product')
            .setLabel(_$.all.singleProductEdit.buttons.updateThisProduct)
            .setStyle(discord.ButtonStyle.Success),
    );
    const row2 = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
        .setCustomId('delete_this_single_product')
        .setLabel(_$.all.singleProductEdit.buttons.deleteThisProduct)
        .setStyle(discord.ButtonStyle.Success),
        new discord.ButtonBuilder()
        .setCustomId('show_all_single_product')
        .setLabel(_$.all.singleProductEdit.buttons.showAllProducts)
        .setStyle(discord.ButtonStyle.Success),
    )

    interaction.editReply({
        content: `${_$.custom_id.update_this_single_product__model.finalMsg.msg._1} **${productNewName}** ${_$.custom_id.update_this_single_product__model.finalMsg.msg._2}
\`\`\`
${_$.custom_id.update_this_single_product__model.finalMsg.msg._3}: ${productOldName}
${_$.custom_id.update_this_single_product__model.finalMsg.msg._4}: ${productNewName}
${_$.custom_id.update_this_single_product__model.finalMsg.msg._5}: ${productPrice}
\`\`\`
`,
        embeds:[embid],
        components:[rowSingleProduct as any, row2]
    })
})