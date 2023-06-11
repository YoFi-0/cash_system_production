import { Command } from "../handler/commands";
import discord from 'discord.js'
import {IsvalidUser, somthin_is_wrong } from '../functions'
import { lang_obj } from "../functions/lang";
export default new Command({
    name:'controller',
    description: "in this command you can control all your products",
    run: async({interaction, client}) =>{
        
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
        const Embed = new discord.EmbedBuilder({
            title: _$.commands.controller.embid.title,
            description: `***${_$.commands.controller.embid.description._1} ${interaction.user.username}***
${_$.commands.controller.embid.description._2}
`
        })
        const row = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('create_section')
                .setLabel(_$.commands.controller.embid.buttons._1)
                .setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder()
                .setCustomId('update_section')
                .setLabel(_$.commands.controller.embid.buttons._2)
                .setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder()
                .setCustomId('delete_section')
                .setLabel(_$.commands.controller.embid.buttons._3)
                .setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder()
                .setCustomId('show_all_section')
                .setLabel(_$.commands.controller.embid.buttons._4)
                .setStyle(discord.ButtonStyle.Primary),
        );
        const rowSingleProduct = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('create_single_product')
                .setLabel(_$.commands.controller.embid.buttons._5)
                .setStyle(discord.ButtonStyle.Success),
                new discord.ButtonBuilder()
                .setCustomId('update_single_product')
                .setLabel(_$.commands.controller.embid.buttons._6)
                .setStyle(discord.ButtonStyle.Success),
                new discord.ButtonBuilder()
                .setCustomId('delete_single_product')
                .setLabel(_$.commands.controller.embid.buttons._7)
                .setStyle(discord.ButtonStyle.Success),
        );
        const rowSingleProduct2 = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('show_one_single_product')
                .setLabel(_$.commands.controller.embid.buttons._8)
                .setStyle(discord.ButtonStyle.Success),
                new discord.ButtonBuilder()
                .setCustomId('show_all_single_product')
                .setLabel(_$.commands.controller.embid.buttons._9)
                .setStyle(discord.ButtonStyle.Success),
        );
        interaction.reply({
            ephemeral:true,
            embeds:[Embed],
            components:[row as any, rowSingleProduct as any, rowSingleProduct2]
        })
    }
})