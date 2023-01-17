const { EmbedBuilder } = require("@discordjs/builders")
const { PermissionsBitField } = require("discord.js")
const {ApplicationCommandOptionType}= require ("discord.js")

const {Client,Interaction,Message} = require("discord.js")
const Discord = require ("discord.js")
const { title } = require("process")
module.exports = {
    name: 'embed',
    description: 'make an embed in your server 💡',
  
    options: [
      {
        name: 'channel',
        description: 'choose the channel',
        type: ApplicationCommandOptionType.Channel,
        required: true
      },
      {
        name: 'description',
        description: 'make a description',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'title',
        description: 'write a title',
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {

        name: 'image',

        description: 'put a link of your image',

        type: ApplicationCommandOptionType.String,

        required: false

      },
      {
      name: 'thumbnail',
      description: 'put a link of image you want it to be a thumbnail for the embed',
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
      name: 'footer',
      description: 'write anything to be a footer',
      type: ApplicationCommandOptionType.String,
      required: false
    },
    
    ],
  


    run: async (client, interaction) => {


if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.roles.cache((r)=> r.name=== "Messages")) return interaction.reply({content : "you dont have permission", ephemeral: true})

const channel = interaction.options.getChannel("channel")

const description = interaction.options.getString ("description")
const title = interaction.options.getString ("title")
const image = interaction.options.getString("image")
   const thumbnail = interaction.options.getString("thumbnail")
    const footer = interaction.options.getString("footer")

const embed = new EmbedBuilder()
.setTitle(title)
.setThumbnail(thumbnail)
.setDescription("**"+description+"**")
.setImage(image)
.setTimestamp()
.setFooter({text : `${footer}`})

await interaction.deferReply({  fetchReply: true })
await interaction.editReply({embeds: [embed]})




    }
}

    
