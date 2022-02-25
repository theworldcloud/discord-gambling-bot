
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Joins the casino"),
        async execute(interaction) {
            await interaction.reply("joined");
        }
}