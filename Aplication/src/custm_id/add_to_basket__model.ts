import { inputsFillter, sleep } from "../functions";
import { Custom_id } from "../handler/custom_id";
import { BascitTaple } from '../tables'
import { DB_Bascit, productInBascitType } from "../types";
import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Programlogs } from "../handler/logs";
export default new Custom_id('add_to_basket__model', async({interaction, client}) => {
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
    const quantity = interaction.fields.getTextInputValue('add_to_basket_row_1').trim()
    const testInput = inputsFillter({
        prosuct_input:prodcutName,
        lang:get_lang_by_msg(interaction)
    })
    if(!testInput.test){
        interaction.editReply(testInput.msg)
        return
    }
    if(isNaN(Number(quantity)) || Number(quantity) < 1){
        interaction.editReply(_$.all.qunntyMustNumber)
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

    if(!getUserBaskit){
        const finalBroduct:productInBascitType[] = [{
            one_product_price:Number(prodcutPrice),
            product_name:prodcutName,
            product_price:Number(prodcutPrice) * Number(quantity),
            quantity:Number(quantity)
        }]
        try{
            await BascitTaple.create({
                isLoked:false,
                user_id:interaction.user.id,
                server_id:interaction.guild.id,
                products:JSON.stringify(finalBroduct)
            } as DB_Bascit, {logging:false})
        } catch(err){
            Programlogs.bot_errors(err, interaction)
            interaction.editReply(_$.all.err)
            return
        }
        interaction.editReply(`**${prodcutName}** ${_$.custom_id.add_to_basket__model.addBasket} ***x${quantity}***`)
        return
    }

    const userBscitDB:DB_Bascit = getUserBaskit.get()
    const userBscit:productInBascitType[] = JSON.parse(userBscitDB.products)

    if(userBscit.length > 25){
        interaction.editReply(_$.custom_id.add_to_basket__model.only_25)
        return
    }
    
    const finalAddedPreoduct:productInBascitType = {
        one_product_price:Number(prodcutPrice),
        product_name:prodcutName,
        product_price:Number(prodcutPrice) *Number(quantity),
        quantity:Number(quantity)
    }
    var isProdcutFound = false
    for(let baskit of userBscit){
        if(baskit.product_name == prodcutName){
            isProdcutFound = true
            baskit.quantity = baskit.quantity + Number(quantity),
            baskit.product_price = Number(prodcutPrice) * baskit.quantity
            break;
        }
    }
    if(!isProdcutFound){
        userBscit.push(finalAddedPreoduct)
    }

    try{
        await BascitTaple.update({
            products:JSON.stringify(userBscit)
        } as DB_Bascit, {where:{user_id:interaction.user.id, server_id:interaction.guild.id} as DB_Bascit, logging:false})
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }

    interaction.editReply(`**${prodcutName}** ${_$.custom_id.add_to_basket__model.addBasket} ***x${quantity}***`)
})