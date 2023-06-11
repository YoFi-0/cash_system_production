import { rate_server } from "../functions";
import { Custom_id } from "../handler/custom_id";
export default new Custom_id('_rate_4h', async({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    rate_server(interaction, 4.5)
})
