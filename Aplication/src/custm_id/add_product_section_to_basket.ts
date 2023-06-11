import { get_lang_by_msg, lang_obj } from "../functions/lang";
import { Custom_id } from "../handler/custom_id";
import { Programlogs } from "../handler/logs";
import { BascitTaple } from "../tables";
import { DB_Bascit, productInBascitType } from "../types";
export default new Custom_id('add_product_section_to_basket', async({interaction, client}) => {
    if(!interaction.isSelectMenu()){
        return
    }

    //${value.product_name}_${value.product_price}_${value.section_name}
    const _$ = lang_obj(get_lang_by_msg(interaction))
    await interaction.deferReply({
        ephemeral:true
    })
    var getUserBaskit
    try{
        getUserBaskit = await BascitTaple.findOne({
            where:{
                user_id:interaction.user.id,
                server_id:interaction.guild.id
            } as DB_Bascit,
            logging:false
        })
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }

    var finalMsg = ''
    if(!getUserBaskit){
        const finalBroduct:productInBascitType[] = []
        for(let product of interaction.values){
            const prodcutName = product.split('_')[0]
            const prodcutPrice = product.split('_')[1]
            const prodcutSection = product.split('_')[2]
            finalBroduct.push({
                one_product_price:Number(prodcutPrice),
                product_name:`${prodcutSection}-${prodcutName}`,
                product_price:Number(prodcutPrice),
                quantity:1
            })
            finalMsg += `**${prodcutSection}${prodcutName}** ${_$.custom_id.add_product_section_to_basket.addBasket} ***x1***\n`
        }
        try{
            await BascitTaple.create({
                isLoked:false,
                user_id:interaction.user.id,
                products:JSON.stringify(finalBroduct),
                server_id: interaction.guild.id
            } as DB_Bascit, {logging:false})
        } catch(err){
            Programlogs.bot_errors(err, interaction)
            interaction.editReply(_$.all.err)
            return
        }
        interaction.editReply(finalMsg)
        return
    }

    const userBscitDB:DB_Bascit = getUserBaskit.get()
    
    const userBscit:productInBascitType[] = JSON.parse(userBscitDB.products)

    if(userBscit.length > 25){
        interaction.editReply(_$.custom_id.add_product_section_to_basket.only_25)
        return
    }
    for(let prodcut of interaction.values){
        const prodcutName = prodcut.split('_')[0]
        const prodcutPrice = prodcut.split('_')[1]
        const prodcutSection = prodcut.split('_')[2]
        var isProdcutFound = false
        const finalAddedPreoduct:productInBascitType = {
            one_product_price:Number(prodcutPrice),
            product_name:`${prodcutSection}-${prodcutName}`,
            product_price:Number(prodcutPrice) * 1,
            quantity:1
        }
        for(let baskit of userBscit){
            if(baskit.product_name == `${prodcutSection}-${prodcutName}`){
                isProdcutFound = true
                baskit.quantity = baskit.quantity + 1,
                baskit.product_price = Number(prodcutPrice) * baskit.quantity
                break;
            }
        }
        if(!isProdcutFound){
            userBscit.push(finalAddedPreoduct)
        }
        finalMsg += `**${prodcutName}** ${_$.custom_id.add_product_section_to_basket.addBasket} ***x1***\n`
    }

    try{
        await BascitTaple.update({
            products:JSON.stringify(userBscit),
        } as DB_Bascit, {where:{user_id:interaction.user.id, server_id:interaction.guild.id} as DB_Bascit, logging:false})
    } catch(err){
        Programlogs.bot_errors(err, interaction)
        interaction.editReply(_$.all.err)
        return
    }

    interaction.editReply(finalMsg)
})
