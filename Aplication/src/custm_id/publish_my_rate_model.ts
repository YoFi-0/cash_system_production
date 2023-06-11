import discord, { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import { IsvalidUser, somthin_is_wrong, valid_image_url } from "../functions";
import { lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ServerStsusEnums } from '../tables';
export default new Custom_id('publish_my_rate_model', async({interaction, client}) =>{
    if(!interaction.guild){
        return
    }
    if(!interaction.isModalSubmit()){
        return
    }
    const isValidUser = await IsvalidUser(interaction as any)
    if(isValidUser.err){
        await interaction.reply({content:somthin_is_wrong, ephemeral:true})
        return
    }
    if(!isValidUser.status && !isValidUser.serverConfig){
        const embd = new discord.EmbedBuilder({
            title:`***sorry your server dose not have any configrations yet***`
        })
        console.log(`${process.env.PROTOCOL}://${process.env.DOMAIN}`)
        const btns = new discord.ActionRowBuilder().addComponents(
            new discord.ButtonBuilder()
            .setLabel("configrate")
            .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/discord/auth`)
            .setStyle("Link" as any)
        )
        await interaction.reply({
            embeds:[embd],
            ephemeral:true,
            components:[btns as any]
        })
        return
    }
    const _$ = lang_obj(isValidUser.serverConfig?.lang == "Arabic" ? "ar" : "en")
    if(!isValidUser.status){
        await interaction.reply({content:_$.all.bad_permetion, ephemeral:true})
        return
    }
    if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
        await interaction.reply(_$.all.ban_store_msg)
        return
    }
    const title = interaction.fields.getTextInputValue('publish_my_rate_row_1').trim()
    const disc = interaction.fields.getTextInputValue('publish_my_rate_row_2').trim()
    const image_url = interaction.fields.getTextInputValue('publish_my_rate_row_3').trim()
    if(image_url){
        if(!valid_image_url(image_url)){
            await interaction.reply({
                ephemeral:true,
                content:_$.all.invalid_image_url
            })
            return
        } 
    }


    const embid = new EmbedBuilder().setTitle(title).setDescription(disc)
    if(image_url){
        embid.setImage(image_url)
    }

    const firstRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("_rate_1").setStyle(ButtonStyle.Danger).setLabel("⭐"),
        new ButtonBuilder().setCustomId("_rate_2").setStyle(ButtonStyle.Primary).setLabel("⭐ ⭐"),
        new ButtonBuilder().setCustomId("_rate_3").setStyle(ButtonStyle.Primary).setLabel("⭐ ⭐ ⭐"),
    )
    const suoundRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("_rate_4").setStyle(ButtonStyle.Success).setLabel("⭐ ⭐ ⭐ ⭐"),
        new ButtonBuilder().setCustomId("_rate_5").setStyle(ButtonStyle.Success).setLabel("⭐ ⭐ ⭐ ⭐ ⭐")
    )
    await interaction.reply({
        ephemeral:true,
        content:"done !"
    })
    interaction.channel!.send({
        embeds:[embid],
        components:[firstRow as any, suoundRow as any]
    })
})