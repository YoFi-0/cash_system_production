import { IsvalidUser, inputsFillter, sleep } from "../functions";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { SectionTable, ServerStsusEnums } from '../tables'
import discord from 'discord.js'
import { DB_SectionType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('create_Section__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
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
    if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
        await interaction.reply(_$.all.ban_store_msg)
        return
    }
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

    const sectionName = interaction.fields.getTextInputValue('create_Section_row_1').trim()

    const testInput = inputsFillter({
        section_name_input:sectionName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        await replayWithDeffer(testInput.msg)
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
    if(isSectionExest){
        await replayWithDeffer(`${_$.custom_id.create_Section__model.badMsg.highNameSection} ${sectionName}`)
        return
    }
    try{
        await SectionTable.create({
            server_id:interaction.guild.id,
            section_name:sectionName
        } as DB_SectionType, {logging:false})
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        return
    }
    const row = new discord.ActionRowBuilder()
    .addComponents(
        new discord.SelectMenuBuilder({
            type: discord.ComponentType.SelectMenu,
        })
            .setPlaceholder(_$.custom_id.create_Section__model.finalMsg.selector.placeHolder)
            .setCustomId('not_a_product')
            .setOptions(
                {
                    label: _$.custom_id.create_Section__model.finalMsg.selector.option.lable,
                    description: _$.custom_id.create_Section__model.finalMsg.selector.option.description,
                    value: 'not_a_product',
                }
            )
    )
    const row2 = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('create_product')
                .setLabel(_$.custom_id.create_Section__model.finalMsg.buttons.addProduct)
                .setStyle(discord.ButtonStyle.Primary),
        )
    await replayWithDeffer(`${_$.custom_id.create_Section__model.finalMsg.msg._1} ***${sectionName}*** ${_$.custom_id.create_Section__model.finalMsg.msg._2}`, [row, row2])
    return
})