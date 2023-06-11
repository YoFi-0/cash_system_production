import { Command } from "../handler/commands";
import discord from 'discord.js'
import { UsersTable } from "../tables";
import { DB_UsersTable } from "../types";
import { _$, valid_image_url } from "../functions";
import { auth_secure_no_random } from "../functions/YoFi_Crypto";
import { lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { Programlogs } from "../handler/logs";
export default new Custom_id('donate_me_model', async({interaction, client}) =>{
    if(!interaction.guild){
        return
    }
    if(!interaction.isModalSubmit()){
        return
    }
    const title = interaction.fields.getTextInputValue('donate_me_model_row_1').trim()
    const disc = interaction.fields.getTextInputValue('donate_me_model_row_2').trim()
    const image_url = interaction.fields.getTextInputValue('donate_me_model_row_3').trim()
    let lang:"ar" | "en" = "en"
    const ar_reg = /[ء-ي]/
    if(interaction.message?.embeds){
        if(ar_reg.test(interaction.message?.embeds[0].title || "test")){
            lang = "ar"
        }
    }
    const _$ = lang_obj(lang)
    if(image_url){
        if(!valid_image_url(image_url)){
            await interaction.reply({
                ephemeral:true,
                content:"invalid image url"
            })
            return
        } 
    }
    const donationEmbid = new discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(disc)
    
    if(image_url){
        donationEmbid.setImage(image_url)
    }
    var avatar = ""
    if(interaction.user.avatarURL()){
        avatar = interaction.user.avatarURL()!
        donationEmbid.setThumbnail(avatar)
    }
    var get_user
    try{
        get_user = await UsersTable.findOne({
            where:{
                user_id:interaction.user.id
            } as DB_UsersTable,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.reply(_$.all.err)
        return
    }
    if(!get_user){
        interaction.reply({
            content:_$.all.you_need_yo_add_paypal,
            ephemeral:true
        })
        return
    }
    const userDB:DB_UsersTable = get_user.get()
    if(!userDB.pay_pal_email){
        interaction.reply({
            content:_$.all.you_need_yo_add_paypal,
            ephemeral:true
        })
        return
    }
    
    const finalId =  await auth_secure_no_random.createMistry(`${interaction.user.id}|-/-|${avatar}|-/-|${interaction.user.username}`)
    const butoons = new discord.ActionRowBuilder().setComponents(
        new discord.ButtonBuilder()
        .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/don/users?id=${finalId}`)
        .setLabel(_$.all.donate)
        .setStyle(discord.ButtonStyle.Link)
    )
    interaction.reply({
        embeds:[donationEmbid],
        components:[butoons as any]
    })
})