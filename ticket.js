const { channel } = require("diagnostics_channel")
const { EmbedBuilder, ChannelType, ButtonStyle, ButtonBuilder, Events } = require("discord.js")
const { Discord, Interaction, PermissionsBitField, ActionRowBuilder, ApplicationCommandOptionType } = require("discord.js")
const ms = require("ms")
module.exports = {
    name: 'ticket',
    description: 'Setup your ticket embed in your server 😘',
    options: [
        {
            name: 'messageoutside',
            description: 'Write a message that will appear in the embed for all members',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'messageinside',
            description: 'Write a message that will appear inside when a user opens a ticket ',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'titleoutside',
            description: 'Write a title that will appear in the ticket embed for all members',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'titleintside',
            description: 'Write a title that will appear for a user ticket inside the ticket embed',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'buttonwordoutside',
            description: 'Write a word that will be in a button outside a ticket ',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'buttonwordinside',
            description: 'Write a word that will be in a button inside a ticket',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'channelticketname',
            description: 'Write a name for a ticket channel ',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        const messageoutside = interaction.options.getString("messageoutside");
        const messageinside = interaction.options.getString("messageinside");
        const titleoutside = interaction.options.getString("titleoutside");
        const titleinside = interaction.options.getString("titleinside");
        const buttonwordoutside = interaction.options.getString("buttonwordoutside");
        const buttonwordinside = interaction.options.getString("buttonwordinside");
        const channelticketname = interaction.options.getString("channelticketname");
    





        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${titleoutside}`)
            .setThumbnail(interaction.guild.iconURL({dynamic : true}))
            

            .setDescription(`** ${messageoutside} **`)
            .setTimestamp();


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("follow")
                    .setLabel(`${buttonwordoutside}`)
                    .setStyle(ButtonStyle.Secondary)
            )
        await interaction.deferReply({ fetchReply: true })
        await interaction.editReply({ embeds: [embed], components: [row] })


        const embed2 = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${titleinside} `)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            
            .setDescription(`**Hello <@${interaction.user.id}>\n\n ${messageinside} **`)
            .setTimestamp();

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("hello")
                    .setLabel(`${buttonwordinside}`)
                    .setEmoji("🔐")
                    .setStyle(ButtonStyle.Secondary)
            )






        const collector = interaction.channel.createMessageComponentCollector()
        collector.on("collect", async i => {
            if (i.customId === "follow") {


                await interaction.guild.channels.create({
                    name: `${channelticketname}${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                }).then(channel => {


                    channel.send({ embeds: [embed2], components: [row1] })
                })
                const vab = interaction.guild.channels.cache.find(o => o.name === ` ticket${interaction.user.username}`)

                await i.deferReply({ fetchReply: true, ephemeral: true })
                return await i.editReply({ content: `**Done created <@${interaction.user.id}> ${channelticketname}${interaction.user.username} **` })

            }

        })



        const channel = interaction.guild.channels.cache.find(r => r.name === `ticket${interaction.user.username}`)
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isButton()) return;
            if (interaction.customId === "hello") {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && !interaction.member.roles.cache.some((c) => c.name === "staff")) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`<@${interaction.user.id}> You dont have permission Or you didnt have a role named (staff) , Sorry`)] })

                await interaction.deferReply({ fetchReply: true, ephemeral: true })
                return await interaction.followUp({ embeds: [new EmbedBuilder().setDescription(`** <@${interaction.user.id}> Done the ticket will be deleted after 5 seconds**`)] }).then(channel => {

                    setTimeout(() => // Setup a timer
                        interaction.channel.delete(), 5000) // Deletes the users message
                    // Deletes the ticket message
                    interaction.member.send({ content: ` ** <@${interaction.user.id}> Done your ticket has been deleted ** ` })



                })

            }

        })

































    }
}
