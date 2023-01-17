const { EmbedBuilder, Client, Interaction, PermissionFlagsBits, MessageActionRow, MessageButton } = require("discord.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { Discord } = require("discord.js")
const {PermissionsBitField}= require ("discord.js")
module.exports = {
    name: 'role',
    description: 'give a role to a user 🎳',

    options: [
        {
            name: 'target',
            description: 'who is the user that want to add to him role',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'role',
            description: 'the role to be added',
            type: ApplicationCommandOptionType.Role,
            required: true
          },

    ],

    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)&& !interaction.member.roles.cache.some((r)=> r.name === "Roles"))return interaction.reply ({content : "you dont have permission to do that Or you dont have role that named with (Roles) Sorry",ephemeral: true})


        const options = interaction;
        const role = interaction.options.getRole("role");
        const target = interaction.options.getMember("target") || interaction.member;
        const embed = new EmbedBuilder()
            .setColor(`Random`)


        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot give the ${role} role! because my role below the role which will be added to a member`)
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        embed.setDescription(target.roles.cache.has(role.id) ? `Removed the ${role} role from ${target} Successfully.<a:emoji_186:1058153224051363910>` : `Added the ${role} role to ${target} Successfully <a:emoji_186:1058153224051363910> `);
        target.roles.cache.has(role.id) ? target.roles.remove(role) : target.roles.add(role);
        const message = await interaction.reply({ embeds: [embed], ephemeral: true });

    }





}