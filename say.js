const { Discord, ApplicationCommandOptionType, EmbedBuilder, Client, Interaction, PermissionsBitField } = require("discord.js")


module.exports = {
    name: 'say',
    description: 'Say anything with the bot 😌',

    options: [
        {
            name: 'channel',
            description: 'Please choose a channel you want to send to it ',
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: 'message',
            description: 'Write your words to send them in a simple message with the bot',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'sayinembed',
            description: 'Write your words to send them in an embed',
            type: ApplicationCommandOptionType.String,
            required: false
        },

    ],



    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.roles.cache.some((r) => r.name === "Messages")) return interaction.reply({ content: `Sorry you dont have apermission Or you dont have a role named with (Messages)`, ephemeral: true })

        const channel = interaction.options.getChannel("channel")
        const message = interaction.options.getString("message")
        const sayinembed = interaction.options.getString("sayinembed")
        if (message) {
            await interaction.reply({ content: `**${message}**` })
        };

        if (sayinembed) {
            const embed1 = new EmbedBuilder()
                .setDescription(`**${sayinembed}**`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp();
            await interaction.deferReply({ fetchReply: true })
            return await interaction.editReply({ embeds: [embed1] })





        };









    }
}