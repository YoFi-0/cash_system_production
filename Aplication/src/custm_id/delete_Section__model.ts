import { Custom_id } from "../handler/custom_id";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import discord from 'discord.js'
import { inputsFillter, sleep } from "../functions";
import { SectionTable } from "../tables";
import { DB_SectionType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('delete_Section__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
        return
    }    
    const _$ = lang_obj(get_lang_by_msg(interaction))
    await interaction.deferReply({
        ephemeral:true
    })
    const replayWithDeffer = async(msg:string, components?:any) =>{
        await sleep(3000)
        await interaction.editReply({
            components:components,
            content:msg,
        })
    }
    const sectionName = interaction.fields.getTextInputValue('delete_Section_row_1').trim()
    const testInput = inputsFillter({
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    var isSectionExest
    try{
        isSectionExest = await SectionTable.findOne({
            where:{section_name:sectionName, server_id:interaction.guild.id} as DB_SectionType,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        await replayWithDeffer(_$.all.err)
        return
    }
    if(!isSectionExest){
        await replayWithDeffer(`${_$.custom_id.delete_Section__model.badMsgs.sectionNotFound} ${sectionName}`)
        return
    }
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.ButtonBuilder()
            .setCustomId('delete_section_yes')
            .setLabel(_$.custom_id.delete_Section__model.finalMag.buttons.yesDelete)
            .setStyle(discord.ButtonStyle.Danger),
    )
    await sleep(3000)
    interaction.editReply({
        content:`${_$.custom_id.delete_Section__model.finalMag.msg._1} ***${sectionName}*** ${_$.custom_id.delete_Section__model.finalMag.msg._2}`,
        components:[row as any]
    })
})