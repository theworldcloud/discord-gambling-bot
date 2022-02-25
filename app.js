const Token = require("./config/token.json");
const Config = require("./config/config.json");

const Balance = require("./modules/balance.js");
const User = require("./modules/user.js");
const Coinflip = require("./modules/coinflip.js");
const Discord = require("./modules/discord.js");

const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const client = new Client({intents: Intents.FLAGS.GUILDS});
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(Token.token);
const fs = require("fs");
const { config } = require("process");

client.on("ready", function() {
    console.log("Bot Started!");
})

client.login(Token.token);

const Commands = [];
let files = fs.readdirSync("./commands");

for (let file of files) {
    let command = require("./commands/" + file);
    Commands.push(command.data);
}

rest.put(Routes.applicationGuildCommands(Config.id.client, Config.id.guild), { body: Commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);


client.on("interactionCreate", async function(interaction) {
    if (interaction.isCommand() != true) return;
    if (interaction.commandName === "balance" || interaction.commandName === "bal") {
        if (User.Exists(interaction.user.id)) {
            let embed = Discord.Embed("Tilgængelige Poletter", "Du har **" + Balance.Get(interaction.user.id) + "** poletter");
            interaction.reply({embeds: [embed]});            
        } else {
            let embed = Discord.Embed("Du er ikke oprettet", "Skriv **/join** for at oprette dig selv!");
            interaction.reply({embeds: [embed]});
        }
    }
    if (interaction.commandName === "join") {
        if (User.Exists(interaction.user.id) == false) {
            User.Join(interaction.user.id);
            let embed = Discord.Embed("Du er nu oprettet", "Du har oprettet dig selv med **" + Config.amount.start + "** poletter!");
            interaction.reply({embeds: [embed]});
        } else {
            let embed = Discord.Embed("Du er allerede oprettet!", "");
            interaction.reply({embeds: [embed]});
        }
    }
    if (interaction.commandName === "coinflip") {
        if (User.Exists(interaction.user.id)) {
            Coinflip.Coin(interaction);
        }
    } 
})

