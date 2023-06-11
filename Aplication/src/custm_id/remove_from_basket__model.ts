import { inputsFillter, sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { BascitTaple } from '../tables'
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { DB_Bascit, productInBascitType } from "../types";
import { Programlogs } from "../handler/logs";
export default new Custom_id('remove_from_basket__model', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
        return
    }

    const _$ = lang_obj(get_lang_by_msg(interaction))    
    interaction.deferReply({
        ephemeral:true
    })
    
    await sleep(2000)
    if(!interaction.message){
        interaction.editReply(_$.all.err)
        return
    }

    const prodcutPrice = interaction.message.embeds[0].fields[0].value.replace('$', '')
    const prodcutName = interaction.message.embeds[0].fields[1].value
    const quantity = interaction.fields.getTextInputValue('remove_from_basket_row_1').trim()
    const testInput = inputsFillter({
        prosuct_input:prodcutName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(Number.isNaN(quantity) || Number(quantity) == 0){
        interaction.editReply(_$.custom_id.remove_from_basket__model.badMsgs.qunttyMustNumber)
        return
    }
    if(Number(quantity) > 999){
        interaction.editReply(_$.all.highQuintty)
        return
    }
    var getUserBaskit
    try{
        getUserBaskit = await BascitTaple.findOne({
            where:{
                server_id:interaction.guildId,
                user_id:interaction.user.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }

    if(!getUserBaskit){
        interaction.editReply(_$.custom_id.remove_from_basket__model.badMsgs.emptyBasket)
        return
    }

    const userBscitDB:DB_Bascit = getUserBaskit.get()
    var userBscit:productInBascitType[] = JSON.parse(userBscitDB.products)


    for(let baskit of userBscit){
        if(baskit.product_name == prodcutName){
            baskit.quantity = baskit.quantity - Number(quantity)
            if(typeof baskit.quantity == 'number' && baskit.quantity <= 0){
                userBscit = userBscit.filter(value => value.product_name != prodcutName)
                break;
            }
            baskit.product_price = Number(prodcutPrice) * baskit.quantity
            break;
        }
    }
    if(userBscit.length == 0){
        try{
            await BascitTaple.destroy({
                where:{
                    server_id:interaction.guildId,
                    user_id:interaction.user.id
                } as DB_Bascit,
                logging:false
            })
        } catch(err){
            Programlogs.bot_errors(err, interaction)
            interaction.editReply(_$.all.err)
            return
        }

    } else {
        try{
            await BascitTaple.update({
                server_id:interaction.guildId,
                user_id:interaction.user.id,
                products:JSON.stringify(userBscit)
            } as DB_Bascit, {where:{user_id:interaction.user.id} as DB_Bascit, logging:false})
        } catch(err){
            Programlogs.bot_errors(err, interaction)
            interaction.editReply(_$.all.err)
            return
        }
    }


    interaction.editReply(`**${prodcutName}** ${_$.custom_id.remove_from_basket__model.finalMsg.msg._1} ***x${quantity}***`)
})