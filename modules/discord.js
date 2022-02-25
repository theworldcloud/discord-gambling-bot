const { MessageEmbed } = require('discord.js');

function Embed(title, description, fields) {
    let embed = new MessageEmbed()
        .setColor("#ff8c00")
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter("© Copyright 2021 - Gambling Bot")

    if (fields != undefined) {
        for (let field of fields) {
            embed.addField(field.name, field.value, (field.inline == undefined) ? true : field.inline);
        }
    }

    return embed;
}

module.exports = { Embed };