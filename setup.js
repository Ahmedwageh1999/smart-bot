const { ButtonBuilder } = require("@discordjs/builders")
const { Discord, Interaction, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: 'setup',
    description: 'Setup your information 😌',

    run: async (client, interaction) => {


        const embed = new EmbedBuilder()
            .setTitle("Waht i can do now")
            .setDescription("Follow one of the buttons in these messages below to get more information about your language support to get started with us.")
            .addFields({ name: `ماذا يمكننى ان افعل الان`, value: `اتبع أحد الأزرار الموجودة في هذه الرسائل أدناه للحصول على مزيد من المعلومات حول دعم لغتك لتبدأ معنا.` })
            .setImage("https://media.discordapp.net/attachments/1057017654541557873/1063883787089481810/IMG_20221229_034047.jpg")



        const db = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("check")
                    .setLabel("Arabic")
                    .setStyle(ButtonStyle.Secondary)


            )




        const aya = new EmbedBuilder()
            .setTitle("Developer tools")
            .setDescription(`Developer tools 
خادم discord الذي يهدف إلى مساعدة المبرمج وخاصة مبرمجي 
Discord.js ومستخدمي Discord ، نظرًا لأننا نقدم دعمًا على مدار الساعة طوال أيام الأسبوع والكثير من المكتبات لتعلم لغات البرمجة \n\n\n اتبع الازرار الموجودة فى هذه الرسائل ادناه للحصول على معلومات حول الخادم`)
            .setImage("https://media.discordapp.net/attachments/1039564096003121232/1058047193497477272/cs.png")




        //////// this button for lets start it 


        const gg = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("god")
                    .setLabel("Lets start it ")
                    .setStyle(ButtonStyle.Primary)





            )




        /////////when the user click on lets start it this should appear to him
        const ali = new EmbedBuilder()
            .setDescription(`
Developer Tools is a server of Discord-related developers of programmers, our goal is to develop personal information related to programming, websites, etc. We also help you to develop your project in the best way and solve all the software problems you face, we support all programmers and developers because we support most of the new bots in Discord 24 hours continuous support


`)
            .setFooter({ text: `Enjoy your time with us` })


        const mohamed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(`We have many server rules that you can learn by clicking on the buttons below the message
`)


        const ala = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(`Select your role that you decided to choose it`)



        /////// button for showing the rules
        const hh = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("hod")
                    .setLabel("Show the rules ")
                    .setStyle(ButtonStyle.Success)

            )


        //////// button when the user click on it , Multiple buttons will appear

        const ff = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("jod")
                    .setLabel("choosing the role")
                    .setStyle(ButtonStyle.Danger)

            )

        ////// when the user click the role will be added to him
        const dd = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("roles")
                    .setLabel("select your role")
                    .setStyle(ButtonStyle.Danger)

            )


        /////for example role 

        const hg = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("lk")
                    .setLabel("minecraft")
                    .setStyle(ButtonStyle.Primary)
            )



        ///// reply to buttons


        const message = await interaction.reply({ embeds: [embed], components: [db] })


        const collector = message.createMessageComponentCollector()
        collector.on("collect", async i => {

            if (i.customId === `check`) {


                await i.update({ embeds: [aya], components: [gg, hh, ff] })
            }

        });



        ///gg => lets start it

        /// hhh => view the rules

        //// ff => choose the roles




        const h = message.createMessageComponentCollector()
        h.on("collect", async m => {
            if (m.customId === "jod")

                await m.update({ embeds: [ala], components: [hg] })




        })


        const rolee = "1063576903342108733"
        const mando = interaction.guild.roles.cache.get(rolee)
        const emdo = new EmbedBuilder()
            .setDescription(`** Done the role <@&${rolee}> has been added successfully**`)

        const kkk = message.createMessageComponentCollector()
        kkk.on("collect", async s => {
            if (s.customId === "lk")
                await s.update({ embeds: [emdo], components: [], ephemeral: true })
            await s.member.roles.add(rolee)



        })


        //// the reply to rules button
        const xx = message.createMessageComponentCollector()

        xx.on("collect", async v => {
            if (v.customId === "hod")
                await v.update({ embeds: [mohamed], components: [] })


        })




        /////// the reply for the lets start it button

        const coll = message.createMessageComponentCollector()
        coll.on("collect", async b => {

            if (b.customId === `god`)

                await b.update({ embeds: [ali], components: [] })



        })







    }
}