import { Custom_id } from "../handler/custom_id";
import { BascitTaple } from "../tables";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { DB_Bascit } from "../types";
import discord from 'discord.js'
import { sleep } from "../functions";
import Crypto from "crypto"
import { auth_secure_no_random } from "../functions/YoFi_Crypto";
import { Programlogs } from "../handler/logs";
export default new Custom_id('check_out', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))


    await interaction.deferReply({
        ephemeral:true
    })
    await sleep(3000)

    var getUserBasket
    try{
        getUserBasket = await BascitTaple.findOne({
            where:{
                server_id:interaction.guild.id,
                user_id:interaction.user.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!getUserBasket){
        interaction.editReply(_$.custom_id.check_out.embtyBasket)
        return
    }
    
    const pathURL = Crypto.randomBytes(50).toString("base64").replace(/[\=\+\/\\]/g, "") + interaction.user.id
    const avatars = await auth_secure_no_random.createMistry(`${interaction.user.avatarURL() || "no avatar"}|-/-|`)
    const invoiceURL:string = `${process.env.PROTOCOL}://${process.env.DOMAIN}/invoice/payment?id=${pathURL}&a=${avatars}`
    
    try{
        getUserBasket = await BascitTaple.update({
            isLoked:true,
            payment_path:pathURL
        } as DB_Bascit,{
            where:{
                user_id:interaction.user.id,
                server_id:interaction.guild.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        return interaction.editReply(_$.all.err)
    }

    const embed = new discord.EmbedBuilder({
        title:_$.custom_id.check_out.okayMsg.title,
    }).setColor('White')
    const bascitButtons2 = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setURL(invoiceURL)
            .setLabel(_$.custom_id.check_out.okayMsg.button)
            .setStyle(discord.ButtonStyle.Link),
    )
    interaction.editReply({
        embeds:[embed],
        components:[bascitButtons2 as any]
    })
})