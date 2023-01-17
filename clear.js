const Discord = require("discord.js")
const { Client, Message, EmbedBuilder,  MessageActionRow, MessageButton } = require("discord.js")
const {  PermissionFlagsBits } = require('discord.js');
const {  PermissionsBitField } = require('discord.js');
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'clear messages 😁',
  

    options: [

        {
            name: 'amount',
            description: 'How many message you want to clear ',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }

    ],

    run: async (client, interaction) => {
       
     
if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.roles.cache.some((r) => r.name === "Deletes"))
 { return interaction.reply({content : " <:1059649999086030938:1060645619292721225>  You dont have permissions (Manage messages) Or you dont have role that named (Deletes)", ephemeral: true}) }




        const number = interaction.options.getInteger('amount') 

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`Done Deleted ${number} message / messages Successfully <a:emoji_186:1058153224051363910>`)
        .setTimestamp();

        await interaction.channel.bulkDelete(number)

        return await interaction.deferReply({ ephemeral: true, fetchReply: true }), await interaction.editReply({ embeds: [embed] })








    }


}