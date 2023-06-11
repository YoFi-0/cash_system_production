import { IsvalidUser, sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { ProductsWithSectionTable, SectionTable } from "../tables";
import { DB_SectionType } from "../types";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('show_all_section', async({interaction, client}) => {
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
    interaction.deferReply({
        ephemeral:true
    })
    await sleep(3000)
    var getAllSections
    try{
        getAllSections = await SectionTable.findAll({logging:false, where:{server_id:interaction.guildId} as DB_SectionType})
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    if(!getAllSections || getAllSections.length == 0){
        interaction.editReply(_$.custom_id.show_all_section.badMsgs.noSections)
        return
    }

    await interaction.editReply(
`${_$.custom_id.show_all_section.finalMsg.msg._1}
${getAllSections.map((section, i) => {
    var num = i + 1
    return `***${num}. ${section.get().section_name}***`
}).join('\n')}`)
})