const { Discord, EmbedBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder } = require(`discord.js`)
const { Client, Interaction, ApplicationCommandOptionType, } = require("discord.js")
module.exports = {

    name: "request",
    description: "Make a request",


    run: async (client, interaction) => {

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("model")
                    .setLabel("Click on the button")
                    .setEmoji("👍")
                    .setStyle(ButtonStyle.Secondary)

            )
            
            
            /////// 

        const message = await interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription("**To make a request click on button**")], components: [button] 
        });
        const model = new ModalBuilder()
        .setCustomId("model")
        .setTitle("A new request")


    const model2 = new TextInputBuilder()
        .setCustomId("text")
        .setLabel("the type of your request")
        .setStyle(TextInputStyle.Short)

    const model3 = new TextInputBuilder()
        .setCustomId("go")
        .setLabel("Your requset")
        .setStyle(TextInputStyle.Paragraph)


    const num1 = new ActionRowBuilder().addComponents(model2)
    const num2 = new ActionRowBuilder().addComponents(model3)

    model.addComponents(num1, num2)

        

            const collector = message.createMessageComponentCollector()
            collector.on("collect" , async i => {
                if (i.isButton()){
                if(i.customId === "model"){
                    await i.showModal(model)




                 
                    


                }

            }



            })

           




        }






    }
    