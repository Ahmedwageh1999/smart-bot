const { Discord, EmbedBuilder, Interaction, Client} = require("discord.js")
module.exports = {
    name: 'getid',
    description: 'Get your id 😎',

    run: async (client, interaction) => {

        const u =   interaction.user.id;

        if (u) {
            if ( !interaction.user.id && !user && !u  ) return interaction.reply({content : `**This ${interaction.user} is not a user May be is a bot**`})

            const embed = new EmbedBuilder()
        
                .setDescription(`**The id yours is ${u}**`)
          return  await interaction.reply({ embeds: [embed] , ephemeral:true })

        };



    }







}















