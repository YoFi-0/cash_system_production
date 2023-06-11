import discord from 'discord.js'
import { valid_image_url } from "../functions";
import { Custom_id } from "../handler/custom_id";
export default new Custom_id('create_embed_model', async({interaction, client}) =>{
    if(!interaction.guild || !interaction.channel){
        return
    }
    if(!interaction.isModalSubmit()){
        return
    }
    const title = interaction.fields.getTextInputValue('create_embed_model_row_1').trim()
    const disc = interaction.fields.getTextInputValue('create_embed_model_row_2').trim()
    const image_url = interaction.fields.getTextInputValue('create_embed_model_row_3').trim()
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
    if(interaction.user.avatarURL()){
        var avatar = interaction.user.avatarURL()!
        donationEmbid.setThumbnail(avatar)
    }
    
    await interaction.reply({
        ephemeral:true,
        content:"done !"
    });
    interaction.channel.send({
        embeds:[donationEmbid],
    })
})