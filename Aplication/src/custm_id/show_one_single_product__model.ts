import { Custom_id } from "../handler/custom_id";
import discord from 'discord.js'
import { ServerStsusEnums, SingleProductsTable } from "../tables";
import { DB_SingelProduct } from "../types";
import { IsvalidUser,inputsFillter,sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('show_one_single_product__model', async({interaction, client}) => {
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
    const productName = interaction.fields.getTextInputValue('show_one_single_product_row_1').trim()
    const testInput = inputsFillter({
        prosuct_input:productName,
        lang:get_lang_by_msg(interaction),
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    var isProductFound
    try{
        isProductFound = await SingleProductsTable.findOne({
            where:{
                server_id:interaction.guildId,
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
        interaction.editReply(`${_$.custom_id.show_one_single_product__model.badMsgs.productNotFound} **${productName}**`)
        return
    }
    const productFromDB:DB_SingelProduct = isProductFound?.get()
    
    const embid = new discord.EmbedBuilder({
        title:productFromDB.product_name,
        description:productFromDB.product_disc ? productFromDB.product_disc : undefined,
    }).setFields({
        name:_$.all.singleProductEdit.words.Price,
        value:`${productFromDB.product_price}`,
        inline:true
    },
    {
        name:_$.all.singleProductEdit.words.Product_Name,
        value:productFromDB.product_name,
        inline:true
    })
    if(productFromDB.product_img_url){
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
        content: `${_$.custom_id.show_one_single_product__model.finalMsg.msg._1} **${productFromDB.product_name}** ${_$.custom_id.show_one_single_product__model.finalMsg.msg._2}`,
        embeds:[embid],
        components:[rowSingleProduct as any, row2]
    })
})