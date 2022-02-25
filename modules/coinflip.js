const Discord = require("./discord.js");
const Balance = require("./balance.js");
const Data = require("./data");

function Coin(interaction) {
    let money = interaction.options.get("beløb").value;
    if (Balance.CanAfford(interaction.user.id, money)) {
        let selection = interaction.options.get("type").value;
        let embed = Discord.Embed("Coinflip (@" + interaction.user.username + ")", "**" + interaction.user.username + "** har satset **" + money + "** poletter og valgt **" + selection + "**\n\n*Vent venligst, imens vi flipper mønten :)*");
        interaction.reply({embeds: [embed]});
        return setTimeout(function() {
            Flip(interaction);
        }, 2500)
    } else {
        let embed = Discord.Embed("Du har ikke råd!", "Du har ikke nok poletter til at satse **" + money + "** poletter!");
        return interaction.reply({embeds: [embed]});
    }
}

function Flip(interaction) {
    let self = interaction.options.get("type").value;
    let selections = {
        "Plat": 0,
        "Krone": 1
    }

    let select = "";
    let selection = Math.random(1, 10);
    selection = selection.toFixed(0);
    if (selection > 5) {
        select = "Krone";
    } else {
        select = "Plat";
    }

    if (select == interaction.options.get("type").value) {
        Win(interaction);
    } else {
        Lose(interaction);
    }
}

function Win(interaction) {
    let amount = interaction.options.get("beløb").value;
    let wonAmount = amount * 2;

    Balance.Give(interaction.user.id, wonAmount);

    let embed = Discord.Embed("Coinflip (@" + interaction.user.username + ")", "**" + interaction.user.username + "** har vundet **" + wonAmount + "** poletter på **" + interaction.options.get("type").value + "**");
    interaction.editReply({embeds: [embed]});
}

function Lose(interaction) {
    let amount = interaction.options.get("beløb").value;
    Balance.Take(interaction.user.id, amount);

    let embed = Discord.Embed("Coinflip (@" + interaction.user.username + ")", "**" + interaction.user.username + "** har tabt **" + amount + "** poletter på **" + interaction.options.get("type").value + "**");
    interaction.editReply({embeds: [embed]});
}

module.exports = { Coin, Flip };