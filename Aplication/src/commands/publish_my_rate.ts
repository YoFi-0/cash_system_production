import { Command } from "../handler/commands";
import discord, { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import { IsvalidUser, somthin_is_wrong } from "../functions";
import {promisify} from 'util'
import fs from 'fs'
import { lang_obj } from "../functions/lang";
import { ServerStsusEnums } from "../tables";
const readFile = promisify(fs.readFile)
export default new Command({
    name:'publish_my_rate',
    description: "With this command you can create a stars buttons",
    options:[
        {
            name:"language",
            type:ApplicationCommandOptionType.String,
            description:"What is the language that you want to publish with",
            choices:[
                {
                    name:"arabic",
                    value:"ar",
                },
                {
                    name:"english",
                    value:"en"
                }
            ],
            required:true
        },
        {
            name:"create_embed",
            type:ApplicationCommandOptionType.String,
            description:"do you want to customise your embed",
            choices:[
                {
                    name:"yes",
                    value:"yes",
                },
                {
                    name:"no",
                    value:"no"
                },
            ],
            required:true
        }
    ],
    run: async({interaction, client}) =>{
        const publish_lang =  interaction.options.data[0].value  as "en" | "ar"
        const isConfigrated =  interaction.options.data[1].value  as "yes" | "no"
        const _$ = lang_obj(publish_lang)
        if(isConfigrated == "no"){
            
            const isValidUser = await IsvalidUser(interaction as any)
            if(isValidUser.err){
                await interaction.reply({content:somthin_is_wrong, ephemeral:true})
                return
            }
            if(!isValidUser.status && !isValidUser.serverConfig){
                const embd = new discord.EmbedBuilder({
                    title:`***${_$.all.no_data}***`
                })
                console.log(`${process.env.PROTOCOL}://${process.env.DOMAIN}`)
                const btns = new discord.ActionRowBuilder().addComponents(
                    new discord.ButtonBuilder()
                    .setLabel(_$.all.configrate)
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
            if(!isValidUser.status){
                await interaction.reply({content:_$.all.bad_permetion, ephemeral:true})
                return
            }
            if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
                await interaction.reply({content:_$.all.ban_store_msg, ephemeral:true})
                return
            }
            const embid = new EmbedBuilder().setTitle(`**${_$.all.rate.rate_me}**`)
            const firstRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("_rate_1").setStyle(ButtonStyle.Danger).setLabel("⭐"),
                new ButtonBuilder().setCustomId("_rate_2").setStyle(ButtonStyle.Primary).setLabel("⭐ ⭐"),
                new ButtonBuilder().setCustomId("_rate_3").setStyle(ButtonStyle.Primary).setLabel("⭐ ⭐ ⭐"),
            )
            const suoundRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("_rate_4").setStyle(ButtonStyle.Success).setLabel("⭐ ⭐ ⭐ ⭐"),
                new ButtonBuilder().setCustomId("_rate_5").setStyle(ButtonStyle.Success).setLabel("⭐ ⭐ ⭐ ⭐ ⭐")
            )

            interaction.channel!.send({
                embeds:[embid],
                components:[firstRow as any, suoundRow as any]
            })

        } else {

            const modal = new discord.ModalBuilder()
            .setCustomId('publish_my_rate_model')
            .setTitle(_$.commands.create_embed.model.title);
        
            const input_1 = new discord.TextInputBuilder()
            .setCustomId('publish_my_rate_row_1')
            .setLabel(_$.commands.create_embed.model.row_titles._1)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Short);
            const input_2 = new discord.TextInputBuilder()
            .setCustomId('publish_my_rate_row_2')
            .setLabel(_$.commands.create_embed.model.row_titles._2)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Paragraph);
            const input_3 = new discord.TextInputBuilder()
            .setCustomId('publish_my_rate_row_3')
            .setLabel(_$.commands.create_embed.model.row_titles._3)
            .setRequired(false)
            .setStyle(discord.TextInputStyle.Short);
        
            const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;
            const row_2 = new discord.ActionRowBuilder().addComponents(input_2) as any;
            const row_3 = new discord.ActionRowBuilder().addComponents(input_3) as any;
        
            modal.addComponents(row_1, row_2, row_3)
            interaction.showModal(modal)

        }
    }
})