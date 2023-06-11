import { IsvalidUser, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { Programlogs } from "../handler/logs";
import { ProductsWithSectionTable, SectionTable } from "../tables";
import { DB_SectionType } from "../types";
export default new Custom_id('delete_section_yes', async ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))
    const isValidUser = await IsvalidUser(interaction as any)
    if(isValidUser.err){
        await interaction.reply(_$.all.err)
        return
    }
    if(!isValidUser.status){
        await interaction.reply(_$.all.bad_permetion)
        return
    }
    await interaction.deferReply({
        ephemeral:true
    })
    const sectionName = interaction.message.content.split('***')[1]
    var getEffectRowsSections
    try{
        getEffectRowsSections = await SectionTable.destroy({
            where:{
                server_id:interaction.guild.id,
                section_name:sectionName
            } as DB_SectionType,
            logging:false
        })
        await ProductsWithSectionTable.destroy({
            where:{
                server_id:interaction.guild.id,
                section_name:sectionName
            } as DB_SectionType,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    await sleep(3000)
    if(getEffectRowsSections === 0){
        interaction.editReply(`${_$.custom_id.delete_section_yes.badMsgs.sectionNotFound} ***${sectionName}***`)
        return
    }
    interaction.editReply(`${_$.custom_id.delete_section_yes.finalMag.msg._1} ***${sectionName}*** ${_$.custom_id.delete_section_yes.finalMag.msg._2}.`)
})