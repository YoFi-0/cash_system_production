import { Custom_id } from "../handler/custom_id";
export default new Custom_id('delete_msg', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }

    await interaction.message.delete()
    const lodingMsg = await interaction.reply('...Laoding')
    interaction.channel?.messages.delete(lodingMsg.id)
})