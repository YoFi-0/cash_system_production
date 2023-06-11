
import discord from 'discord.js'
import { DB_ServersTable } from "../types";
import { IsvalidUser, somthin_is_wrong, valid_image_url } from "../functions";
import { auth_secure_no_random } from "../functions/YoFi_Crypto";
import { lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { ServerStsusEnums } from '../tables';
export default new Custom_id('publish_server_donation_model', async({interaction, client}) =>{
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
    const title = interaction.fields.getTextInputValue('publish_server_donation_row_1').trim()
    const disc = interaction.fields.getTextInputValue('publish_server_donation_row_2').trim()
    const image_url = interaction.fields.getTextInputValue('publish_server_donation_row_3').trim()
    if(image_url){
        if(!valid_image_url(image_url)){
            await interaction.reply({
                ephemeral:true,
                content:_$.all.invalid_image_url
            })
            return
        } 
    }


    const userDB:DB_ServersTable = isValidUser.serverConfig!;
    if(!userDB.pay_pal_email){
        interaction.reply({
            content:_$.all.you_need_yo_add_paypal,
            ephemeral:true
        })
        return
    }


    const donationEmbid = new discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(disc)
    if(image_url){
        donationEmbid.setImage(image_url)
    }
    var icon = ""
    if(interaction.guild?.iconURL()){
        icon = interaction.guild!.iconURL()!
        donationEmbid.setThumbnail(icon)
    }
    const finalId = await auth_secure_no_random.createMistry(`${interaction.guildId}|-/-|${icon}|-/-|${interaction.guild.name}`)
    const butoons = new discord.ActionRowBuilder().setComponents(
        new discord.ButtonBuilder()
        .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/don/servers?id=${finalId}`)
        .setLabel("donate")
        .setStyle(discord.ButtonStyle.Link)
    )
    await interaction.reply({
        ephemeral:true,
        content:"done !"
    })
    interaction.channel!.send({
        embeds:[donationEmbid],
        components:[butoons as any]
    })
})