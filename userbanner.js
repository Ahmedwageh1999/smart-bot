const Discord = require("discord.js")
const { Client, Message, EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js")
const { PermissionFlagsBits } = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const config = require("../config.json");
const { ApplicationCommandOptionType } = require("discord.js");
const axios = require("axios")
module.exports = {
    name: 'userbanner',
    description: 'get the user banner in your server 😋',

    options: [
        {
            name: 'user',
            description: 'Get a banner of any user',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],

    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('user');

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${config.token}`
            },
        })
            .then((res) => {
                const { banner, accent_color } = res.data;

                if (banner) {
                    const extension = banner.startsWith("a_") ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

                    const embed = new EmbedBuilder()
                    .setDescription(`**Done <a:red:1061422615757066240> Here this is the banner of <@${user.id}>**`)
                        .setImage(url)
                        
                    
                        .setColor(accent_color || "Random")
                     .setTimestamp();

                    interaction.reply({ embeds: [embed] , ephemeral: true })
                } else {
                    if (accent_color) {
                      const embed2 = new EmbedBuilder()
                      .setDescription(`**${user.tag}** Does not have a banner but they have an accent color Or this a banner of bot`)
                      .setColor(accent_color )
            
                      interaction.reply({ embeds: [embed2] , ephemeral: true })
                    } else {
                      interaction.reply({ content: `**${user.tag}** Does not have a banner Or this is a bot.`, ephemeral: true})
                    }
                    

                }
            });
    },
};
