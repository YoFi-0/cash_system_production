import { Command } from "../handler/commands";
import discord from 'discord.js'
import { ProductsWithSectionTable, ServerStsusEnums, SingleProductsTable } from "../tables";
import { DB_ProductsWithSection, DB_SingelProduct } from "../types";
import { IsvalidUser, somthin_is_wrong, _$ } from "../functions";
import { lang_obj } from "../functions/lang";
export default new Command({
    name:'publish_my_store',
    description: "with this command everyone will can see your products",
    run: async({interaction, client}) =>{
        if(!interaction.guild?.id){
            await interaction.reply(somthin_is_wrong)
            return
        }
        const isValidUser = await IsvalidUser(interaction as any)
        if(isValidUser.err){
            await interaction.reply({content:somthin_is_wrong, ephemeral:true})
            return
        }
        if(!isValidUser.status && !isValidUser.serverConfig){
            const embd = new discord.EmbedBuilder({
                title:`***sorry your server dose not have any configrations yet***`
            })
            console.log(`${process.env.PROTOCOL}://${process.env.DOMAIN}`)
            const btns = new discord.ActionRowBuilder().addComponents(
                new discord.ButtonBuilder()
                .setLabel("configrate")
                .setURL(`${process.env.PROTOCOL}://${process.env.DOMAIN}/discord/auth`)
                .setStyle("Link" as any)
            )
            await interaction.reply({
                embeds:[embd],
                ephemeral:true,
                components:[btns as any]
            })
            return
        }
        const _$ = lang_obj(isValidUser.serverConfig?.lang == "Arabic" ? "ar" : "en")
        if(!isValidUser.status){
            await interaction.reply({content:_$.all.bad_permetion, ephemeral:true})
            return
        }
        if(isValidUser.ban_or_varified == ServerStsusEnums.Ban){
            await interaction.reply({content:_$.all.ban_store_msg, ephemeral:true})
            return
        }
        const deffer = async(isEphemeral:boolean) => {
            await interaction.deferReply({
                ephemeral:isEphemeral
            })
        }
        await deffer(true)
        if(!interaction.channel){
            await interaction.editReply(_$.commands.publish_my_store.errs._1)
            return
        }
        var getAllProducts
        var getAllSingleProducts
        try{
            getAllProducts = await ProductsWithSectionTable.findAll({
                logging:false,
                where:{
                    server_id:interaction.guild.id
                }
            })
            getAllSingleProducts = await SingleProductsTable.findAll({
                logging:false,
                where:{
                    server_id:interaction.guild.id
                }
            })
        } catch(err){
            console.log(err)
            interaction.editReply(_$.all.err)
            return
        }
        if(getAllProducts.length == 0 && getAllSingleProducts.length == 0){
            interaction.editReply(_$.commands.publish_my_store.errs._2)
            return
        }
        const algoArray:DB_ProductsWithSection[][] = []
        getAllProducts.forEach(value => {
            const product:DB_ProductsWithSection = value.get()
            var i = 0
            if(algoArray.length == 0){
                algoArray.push([product])
            } else {
                var isArrayFound = false
                for(let productArray of algoArray){
                    for(let array of productArray){
                        if(array.section_name == product.section_name){
                            isArrayFound = true
                            productArray.push(product)
                            break;
                        }
                    }
                }
                if(!isArrayFound){
                    const newArray:DB_ProductsWithSection[] = []
                    newArray.push(product)
                    algoArray.push(newArray)
                }
            }
        })
        if(getAllSingleProducts.length){
            for(let sProduct of getAllSingleProducts){
                const productFromDB:DB_SingelProduct = sProduct.get()

                const embid = new discord.EmbedBuilder({
                    title:productFromDB.product_name,
                    description:productFromDB.product_disc ? productFromDB.product_disc : undefined,
                }).setFields({
                    name:_$.commands.publish_my_store.embeds.priceFld,
                    value:`$${productFromDB.product_price}`,
                    inline:true
                },
                {
                    name:_$.commands.publish_my_store.embeds.productNameFld,
                    value:productFromDB.product_name,
                    inline:true
                })
                if(productFromDB.product_img_url){
                    embid.setImage(productFromDB.product_img_url)
                }

                const row = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.ButtonBuilder()
                        .setCustomId('add_to_basket')
                        .setLabel(_$.commands.publish_my_store.embeds.buttons._1)
                        .setStyle(discord.ButtonStyle.Primary),
                    new discord.ButtonBuilder()
                        .setCustomId('remove_from_basket')
                        .setLabel(_$.commands.publish_my_store.embeds.buttons._2)
                        .setStyle(discord.ButtonStyle.Primary),
                )

                await interaction.channel!.send({
                    embeds:[embid],
                    components:[row as any]
                })
            }
        }
        for(let product of algoArray){
            const selectorRow = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder({
                    type: discord.ComponentType.SelectMenu,
                })
                .setPlaceholder(product[0].section_name)
                .setMinValues(1)
                .setMaxValues(product.length)
                .setCustomId('add_product_section_to_basket')
                .setOptions(
                    ...product.map((value) => {
                        return {
                            label: value.product_name,
                            description: `${_$.commands.publish_my_store.selectors.priceDisc}: ${value.product_price}$`,
                            value: `${value.product_name}_${value.product_price}_${value.section_name}`,
                        }
                    })
                )
            )
            await interaction.channel?.send({
                components:[selectorRow as any]
            })
        }

        const bascitButtons = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('show_me_my_basket')
                .setLabel(_$.commands.publish_my_store.basket.buttons._1)
                .setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder()
                .setCustomId('remove_from_my_basket')
                .setLabel(_$.commands.publish_my_store.basket.buttons._2)
                .setStyle(discord.ButtonStyle.Primary),
        )
        const embid = new discord.EmbedBuilder({
            title:_$.commands.publish_my_store.basket.embid.title,
            description:isValidUser.serverConfig?.basket_embed_description ? isValidUser.serverConfig?.basket_embed_description as string :_$.commands.publish_my_store.basket.embid.description,
        })
        if(isValidUser.serverConfig?.basket_embed_imageURL){
            embid.setImage(isValidUser.serverConfig.basket_embed_imageURL)
        }
        const bascitButtons2 = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId('check_out')
                .setLabel(_$.commands.publish_my_store.basket.buttons._3)
                .setStyle(discord.ButtonStyle.Primary),
        )
        await interaction.channel?.send({
            embeds:[embid],
            components:[bascitButtons as any, bascitButtons2]
        })
        interaction.editReply(_$.commands.publish_my_store.finalMsg)
    }
})
