const Discord = require("discord.js")
const { Client, Message, EmbedBuilder, MessageActionRow, MessageButton,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js")
const { ApplicationCommandOptionType } = require("discord.js");
const embed = require("./embed");
module.exports = {
    name: "avatar",
    description: "Get a members avatar or your server avatar",
    emoji: "😎",
    options: [{
        name: "user",
        description: 'Get avatar for a user or you',
        type: ApplicationCommandOptionType.User,
        required: false
    },

    ],
    run: async (client, interaction) => {

        const avatarmention = interaction.options.getUser(`user`)
        
        if (avatarmention) {
           const embed = new EmbedBuilder()
                .setTitle(avatarmention.username)
                .setColor("Blue")
                .setImage(`${avatarmention.displayAvatarURL({ size: 1024, format: 'png', dynamic: true })}`)
            await interaction.deferReply({ ephemeral: true, fetchReply: true })
         return   await interaction.editReply({ embeds: [embed] })







        }


        const embed3 = new EmbedBuilder()
        .setImage(interaction.guild.iconURL({size : 2048 , dynamic:true}))
        if (!interaction.guild.iconURL()) return interaction.reply ({content : "**Your server dont have an avatar !!! Sorry **", ephemeral:true})

        const embed2 = new EmbedBuilder()
        .setDescription("**Please click on button 😍 to get your server avatar**")
        


const button = new ActionRowBuilder()

.addComponents(
new ButtonBuilder()
.setCustomId("serveravatar")
.setLabel("server avatar ")
.setEmoji("😍")
.setStyle(ButtonStyle.Primary)
)

const message = await interaction.reply ({embeds : [embed2],components:[button] })


const collector = message.createMessageComponentCollector();

collector.on("collect" , async i =>{
    if (i.customId === `serveravatar`){


interaction.editReply({embeds: [embed3] , components : [] })


    }




})











        



    },
};