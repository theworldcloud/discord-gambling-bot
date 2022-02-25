
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Spil Coinflip")
        .addNumberOption(option =>
            option.setName("beløb")
                .setDescription("Skriv det beløb du vil satse")
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("type")
                .setDescription("Du kan vælge mellem Plat og Krone")
                .setRequired(true)
                .addChoice("Plat", "Plat")
                .addChoice("Krone", "Krone")
        ),
        async execute(interaction) {
            await interaction.reply("coinflip");
        }
}