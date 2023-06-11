import { IsvalidUser, sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { ServerStsusEnums, SingleProductsTable } from "../tables";
import { DB_SingelProduct } from "../types";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('show_all_single_product', async({interaction, client}) => {
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
    await sleep(3000)
    var getAllData
    try{
        getAllData = await SingleProductsTable.findAll({
            where: {
                server_id:interaction.guildId,
            } as DB_SingelProduct,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        return interaction.editReply(_$.all.err)
    }
    if(!getAllData || getAllData.length == 0){
        interaction.editReply(_$.custom_id.show_all_single_product.badMsgs.noProducts)
        return
    }
    var i = 0
    interaction.editReply(`${_$.custom_id.show_all_single_product.finalMsg.msg._1}
${getAllData.map(value => {
    i++
    const product:DB_SingelProduct = value.get()
    return `**${i}. ${product.product_name} ${product.product_price}$**`
}).join('\n')}
`)
})