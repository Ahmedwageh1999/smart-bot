const { EmbedBuilder, Discord, Message, Interaction, Client,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js")
const { ApplicationCommandOptionType } = require("discord.js")
const tax = require('probot-taxs');

module.exports = {
    name: 'tax',
    description: 'get the tax of probot 💰',

    options: [
        {
            name: 'number',
            description: 'write a number to know the tax of probot',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },

    ],

    run: async (client, interaction) => {

        const number = interaction.options.getInteger("number")


        let taxs = tax.tax(number, true)


        let taxbader = new EmbedBuilder()
            .setTitle("the tax of probot")
            .setColor("Random")
            .setThumbnail(interaction.user.displayAvatarURL({dynamic : true}))
            .addFields({name : `the tax of probot` , value : `**${taxs.tax}**`})
            .addFields({name : `the tax with wasit`, value : `**${taxs.wasit}**`})
            .setTimestamp()

            const embed1 = new EmbedBuilder()
            .setDescription(`**Please click on button 💰 to get a tax of  ${number} **`)

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("tax")
            .setLabel("tax")
            .setEmoji("💰")
            .setStyle(ButtonStyle.Primary)
            )

const message = await interaction.reply ({embeds : [embed1], components :[button]})

const collector = message.createMessageComponentCollector()
collector.on("collect" , async i =>  {

if (i.customId === `tax`) {

interaction.editReply({embeds : [taxbader] , components : []})



}



})


        






















    }

}




