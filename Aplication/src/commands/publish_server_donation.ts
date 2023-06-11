import { Command } from "../handler/commands";
import discord, { ApplicationCommandOptionType } from 'discord.js'
import { DB_ServersTable } from "../types";
import { IsvalidUser, somthin_is_wrong } from "../functions";
import { auth_secure_no_random } from "../functions/YoFi_Crypto";
import { lang_obj } from "../functions/lang";
import { ServerStsusEnums } from "../tables";
export default new Command({
    name:'publish_server_donation',
    description: "With this command you can publish your own donation button",
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
                },
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
            if(!interaction.guild){
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
            if(!isValidUser.status){
                await interaction.reply({content:_$.all.bad_permetion, ephemeral:true})
                return
            }
            if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
                await interaction.reply({content:_$.all.ban_store_msg, ephemeral:true})
                return
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
            .setTitle(_$.commands.publish_server_donation.embed.title)
            .setDescription(_$.commands.publish_server_donation.embed.disc + `<@${interaction.guildId}>`)
            const server_icon = interaction.guild.iconURL()
            if(interaction.guild.iconURL()){
                donationEmbid.setThumbnail(server_icon)
            }
            var icon = ""
            if(interaction.guild?.iconURL()){
                icon = interaction.guild!.iconURL()!
            }
            const finalId = await auth_secure_no_random.createMistry(`${interaction.guildId}|-/-|${icon}|-/-|${interaction.guild.name}`)
            const butoons = new discord.ActionRowBuilder().setComponents(
                new discord.ButtonBuilder()
                .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/don/servers?id=${finalId}`)
                .setLabel(_$.all.donate)
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
        } else {
            const modal = new discord.ModalBuilder()
            .setCustomId('publish_server_donation_model')
            .setTitle(_$.commands.create_embed.model.title);
        
            const input_1 = new discord.TextInputBuilder()
            .setCustomId('publish_server_donation_row_1')
            .setLabel(_$.commands.create_embed.model.row_titles._1)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Short);
            const input_2 = new discord.TextInputBuilder()
            .setCustomId('publish_server_donation_row_2')
            .setLabel(_$.commands.create_embed.model.row_titles._2)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Paragraph);
            const input_3 = new discord.TextInputBuilder()
            .setCustomId('publish_server_donation_row_3')
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
