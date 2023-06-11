import { Command } from "../handler/commands";
import { ApplicationCommandOptionType } from 'discord.js'
import { _$, rate_server } from "../functions";
export default new Command({
    name:'rate_server',
    description: "with this command you can rate this server",
    options:[
        {
            name:"stars",
            description:"here you can chose your rate",
            type:ApplicationCommandOptionType.String,
            required:true,
            choices:[
                {
                    name:"⭐",
                    value:"1",
                },
                {
                    name:"⭐⭐",
                    value:"2",
                },
                {
                    name:"⭐⭐⭐",
                    value:"3",
                },
                {
                    name:"⭐⭐⭐⭐",
                    value:"4",
                },
                {
                    name:"⭐⭐⭐⭐⭐",
                    value:"5",
                },
            ]
        }
    ],
    run: async({interaction, client}) =>{
        var starRate = interaction.options.data[0].value
        if(isNaN(Number(starRate))){
            return 
        }
        if(Number(starRate) > 5 || Number(starRate) < 1){
            return
        }
        rate_server(interaction, Number(starRate))
    }
})
