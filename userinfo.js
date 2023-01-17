const { MessageEmbed, CommandInteraction,Client,EmbedBuilder } = require("discord.js");
const moment = require("moment");

const {  ApplicationCommandOptionType } = require("discord.js");
module.exports = {

    name: "userinfo",
    description: "show your userinfo 🔥",

    Options: [
        {
            name: "user",
            description: "the user info",
            type: ApplicationCommandOptionType.String,
            Required: false
        },
    ],
    run: async (client, interaction) => {

        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;


        const embed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: tag, iconURL: icon })
            .setThumbnail(icon)
            .addFields({ name: "Member", value: `${user}`, inline: false })
            .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(` `)}`, inline: false })
            .addFields({ name: "Joined server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true })
            .addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true })
            .setFooter({ text: `User ID : ${user.id}` })
            .setTimestamp()

            await interaction.deferReply({ ephemeral: true, fetchReply: true })
        await interaction.editReply({ embeds:[embed] })

    }

}