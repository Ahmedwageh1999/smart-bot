const Discord = require("discord.js")
const {Interaction, Client , Message} = require ("discord.js")
const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios")
module.exports = {
    name: 'addemoji',
    description: 'Add emoji to your server 🤗',

    options: [
        {
            name: 'emoji',
            description: 'select emoji from any server to add it to your server',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'name',
            description: 'Write a any name for the emoji ',
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.roles.cache.some((r) => r.name === "Emoji"))

 { return interaction.reply({content : " <:1059649999086030938:1060645619292721225>  You dont have permissions (Manage messages) Or you dont have role that named (Emoji)", ephemeral: true}) }
        let emoji = interaction.options.getString("emoji")?.trim();
        const name = interaction.options.getString("name")


        if (emoji.startsWith("<") && emoji.endsWith(">")) {

            const id = emoji.match(/\d{15,}/g)[0];


            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                .then(image => {
                    if (image) return "gif"
                    else return "png"
                }).catch(err => {
                    return "png"
                })
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }


        if (!emoji.startsWith("http")) {
            return await interaction.reply({ content: "**You cant add default emoji 🙄**" , ephemeral:true })




        }
        if (!emoji.startsWith("https")) {
            return await interaction.reply({ content: "**You cant add default emoji 🙄**", ephemeral:true })




        }
       
        if(!name) return interaction.reply ({content: "**You didnt write a name for the emoji 🙄 So you must write a name for it**", ephemeral:true})


        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
            .then(emoji => {

                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`**Done added emoji ${emoji}  with name  \`${name}\`  Successfully <a:red:1061422615757066240>** `)
                .setTimestamp();
                   
                 return interaction.reply({ embeds: [embed] , ephemeral:true });






            }).catch(err => {
                interaction.reply({ content: "**You cant not add more emojis Sorry 😣**" , ephemeral:true })




            }



            )
    }



}




