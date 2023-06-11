import { sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { BascitTaple } from "../tables";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { DB_Bascit, productInBascitType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('remove_basket_product_yes', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    const _$ = lang_obj(get_lang_by_msg(interaction))    
    const prodcutName = interaction.message.content.split('**')[1]

    await interaction.deferReply({
        ephemeral:true
    })

    await sleep(2000)
    var getUser
    try{
        getUser = await BascitTaple.findOne({
            where:{
                server_id:interaction.guildId,
                user_id:interaction.user.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        await interaction.editReply(_$.all.err)
        return
    }
    if(!getUser){
        await interaction.editReply(_$.custom_id.remove_basket_product_yes.badMsgs.emptyBasket)
        return
    }

    const userBasketDB:DB_Bascit = getUser.get()
    var userBasket:productInBascitType[] = JSON.parse(userBasketDB.products)

    userBasket = userBasket.filter(value => value.product_name != prodcutName)
    if(userBasket.length == 0){
        try{
            await BascitTaple.destroy({
                where:{
                    server_id:interaction.guildId,
                    user_id:interaction.user.id
                } as DB_Bascit,
                logging:false
            })
        } catch(err){
            console.log(err)
            await interaction.editReply(_$.all.err)
            return
        }
    } else {
        try{
            await BascitTaple.update({
                products:JSON.stringify(userBasket)
            }as DB_Bascit , {
                where:{
                    user_id:interaction.user.id
                } as DB_Bascit,
                logging:false
            })
        } catch(err){
            console.log(err)
            await interaction.editReply(_$.all.err)
            return
        }
    }
    interaction.editReply(`${_$.custom_id.remove_basket_product_yes.finalMsg.msg._1} **${prodcutName}** ${_$.custom_id.remove_basket_product_yes.finalMsg.msg._2}`)
})