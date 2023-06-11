import { IsvalidUser,sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { SingleProductsTable } from "../tables";
import { DB_SingelProduct } from "../types";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('delete_single_product_yes', async({interaction, client}) => {
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
    const productName = interaction.message.content.split('**')[1]
    var getEffectRowsSections
    try{
        getEffectRowsSections = await SingleProductsTable.destroy({
            where:{
                server_id:interaction.guild.id,
                product_name:productName
            } as DB_SingelProduct,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }
    await sleep(3000)
    if(getEffectRowsSections === 0){
        interaction.editReply(`${_$.custom_id.delete_single_product_yes.badMsgs.productNotFound} **${productName}**`)
        return
    }
    interaction.editReply(`${_$.custom_id.delete_single_product_yes.finalMsg.msg._1} **${productName}** ${_$.custom_id.delete_single_product_yes.finalMsg.msg._2}`)
})