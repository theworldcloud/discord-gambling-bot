const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bal")
        .setDescription("Siger hvor mange poletter du har."),
        async execute(interaction) {
            await interaction.reply("Du har **" + Balance.Get(interaction.user.id) + "** *poletter*.");
        }
}