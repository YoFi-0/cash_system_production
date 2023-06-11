import { Command } from "../handler/commands";
import discord, { ApplicationCommandOptionType } from 'discord.js'
import { _$ } from "../functions";
import { lang_obj } from "../functions/lang";
export default new Command({
    name:'create_embed',
    description: "With this command you can create an embed",
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
    ],
    run: async({interaction, client}) => {
        const publish_lang =  interaction.options.data[0].value  as "en" | "ar"
        const _$ = lang_obj(publish_lang)
        const modal = new discord.ModalBuilder()
        .setCustomId('create_embed_model')
        .setTitle(_$.commands.create_embed.model.title);
    
        const input_1 = new discord.TextInputBuilder()
        .setCustomId('create_embed_model_row_1')
        .setLabel(_$.commands.create_embed.model.row_titles._1)
        .setRequired(true)
        .setStyle(discord.TextInputStyle.Short);
        const input_2 = new discord.TextInputBuilder()
        .setCustomId('create_embed_model_row_2')
        .setLabel(_$.commands.create_embed.model.row_titles._2)
        .setRequired(true)
        .setStyle(discord.TextInputStyle.Paragraph);
        const input_3 = new discord.TextInputBuilder()
        .setCustomId('create_embed_model_row_3')
        .setLabel(_$.commands.create_embed.model.row_titles._3)
        .setRequired(false)
        .setStyle(discord.TextInputStyle.Short);
    
        const row_1 = new discord.ActionRowBuilder().addComponents(input_1) as any;
        const row_2 = new discord.ActionRowBuilder().addComponents(input_2) as any;
        const row_3 = new discord.ActionRowBuilder().addComponents(input_3) as any;
    
        modal.addComponents(row_1, row_2, row_3)
        interaction.showModal(modal)
    }
})
