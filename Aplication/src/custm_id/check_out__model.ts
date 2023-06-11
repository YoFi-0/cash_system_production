// import { inputsFillter, sleep } from "../functions";
// import sequelize from "sequelize";
// import { get_lang_by_msg, lang_obj } from "../functions/lang";
// import { Custom_id } from "../handler/custom_id";
// import { CustomersTable, ProductsWithSectionTable, SectionTable } from '../tables'
// import discord from 'discord.js'
// import { DB_CustomersTable, DB_ProductsWithSection, DB_SectionType } from "../types";
// export default new Custom_id('check_out__model', async({interaction, client}) => {
//     if(!interaction.isModalSubmit()){
//         return
//     }
//     const _$ = lang_obj(get_lang_by_msg(interaction))
//     interaction.deferReply({
//         ephemeral:true
//     })

//     await sleep(3000)

//     //
//     const email = interaction.fields.getTextInputValue('check_out_row_1').trim()

//     const isVlid = inputsFillter({
//         email:email
//     })

//     if(!isVlid.test){
//         const tryAgineButton = new discord.ActionRowBuilder()
//         .addComponents(
//             new discord.ButtonBuilder()
//                 .setCustomId('check_out_create_model')
//                 .setLabel(_$.custom_id.check_out__model.tryAginEmail)
//                 .setStyle(discord.ButtonStyle.Primary),
//         )
//         interaction.editReply({
//             content:_$.custom_id.check_out__model.invalidEmailMsg,
//             components:[tryAgineButton as any]
//         })
//         return
//     }
    
//     var isUserFound
//     try{
//         isUserFound = await CustomersTable.findOne({
//             where:{
//                 user_id:interaction.user.id
//             } as DB_CustomersTable,
//             logging:false
//         })
//     } catch(err){
//         console.log(err)
//         interaction.editReply(_$.all.err)
//         return
//     }
    
//     if(isUserFound){
//         try{
//              await CustomersTable.update( {
//                 email:email
//              } as DB_CustomersTable,{
//                 where:{
//                     user_id:interaction.user.id
//                 } as DB_CustomersTable,
//                 logging:false
//             })
//         } catch(err){
//             console.log(err)
//             interaction.editReply(_$.all.err)
//             return
//         }
//     } else {
//         try{
//             await CustomersTable.create( {
//                email:email,
//                user_id:interaction.user.id,
//             } as DB_CustomersTable,{
//                logging:false
//            })
//        } catch(err){
//            console.log(err)
//            interaction.editReply(_$.all.err)
//            return
//        }
//     }
    
//     const checkOutButton = new discord.ActionRowBuilder()
//     .addComponents(
//         new discord.ButtonBuilder()
//             .setCustomId('check_out')
//             .setLabel(_$.commands.publish_my_store.basket.buttons._3)
//             .setStyle(discord.ButtonStyle.Primary),
//     )
//     await interaction.editReply({
//         content:_$.custom_id.check_out__model.udpatedEmail,
//         components:[checkOutButton as any]
//     })
    
// })