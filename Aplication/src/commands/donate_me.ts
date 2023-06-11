import { Command } from "../handler/commands";
import discord, { ApplicationCommandOptionType } from 'discord.js'
import { UsersTable } from "../tables";
import { DB_UsersTable } from "../types";
import {promisify} from 'util'
import fs from 'fs'
import { auth_secure_no_random } from "../functions/YoFi_Crypto";
import { lang_obj } from "../functions/lang";
const readFile = promisify(fs.readFile)
export default new Command({
    name:'donate_me',
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
    run: async({interaction, client}) => {
        const publish_lang =  interaction.options.data[0].value  as "en" | "ar"
        const isConfigrated =  interaction.options.data[1].value  as "yes" | "no"
        const _$ = lang_obj(publish_lang)
        if(isConfigrated == "no"){
            const donationEmbid = new discord.EmbedBuilder()
            .setTitle(_$.commands.donate_me.embed.title)
            .setDescription(_$.commands.donate_me.embed.disc)
            var avatar = ""
            if(interaction.user.avatarURL()){
                avatar = interaction.user.avatarURL()!
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
                interaction.reply(_$.all.err)
                return
            }
            if(!get_user){
                interaction.reply({
                    content:_$.all.no_data,
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
                .setLabel("donate")
                .setStyle(discord.ButtonStyle.Link)
            )
            interaction.reply({
                embeds:[donationEmbid],
                components:[butoons as any]
            })
        } else {
            const modal = new discord.ModalBuilder()
            .setCustomId('donate_me_model')
            .setTitle(_$.commands.create_embed.model.title);
        
            const input_1 = new discord.TextInputBuilder()
            .setCustomId('donate_me_model_row_1')
            .setLabel(_$.commands.create_embed.model.row_titles._1)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Short);
            const input_2 = new discord.TextInputBuilder()
            .setCustomId('donate_me_model_row_2')
            .setLabel(_$.commands.create_embed.model.row_titles._2)
            .setRequired(true)
            .setStyle(discord.TextInputStyle.Paragraph);
            const input_3 = new discord.TextInputBuilder()
            .setCustomId('donate_me_model_row_3')
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
