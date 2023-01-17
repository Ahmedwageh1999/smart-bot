const { Discord, EmbedBuilder, Interaction, Client, Message } = require("discord.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'unlock',
    description: 'unlock a specific channel 🔓',


    options: [

        {
            name: 'channel',
            description: 'choose a channel you want to unlock it ',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }

    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && !interaction.member.roles.cache.some((r) => r.name === "Channels")) return interaction.reply({ content: "you dont ahve permission Or you dont have a role named (Channels)" })
        const channel = interaction.options.getChannel("channel")
        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true })
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**Done the ${channel} has been unlocked successfully <a:emoji_186:1058153224051363910>**`)
        .setTimestamp();
        await interaction.deferReply({ fetchReply: true , ephemeral: true })
        await interaction.editReply({ embeds: [embed] })








    }
}
