const Discord = require("discord.js")
const d = require('discord.js');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = async (client, message, args) => {
    const embed = new d.MessageEmbed();
    embed.setColor(`#FF8C00`)
    embed.setTitle(`Server Robot`)
    embed.setDescription(`This server is running **Cesium vBETA**

Developed by **Bunni**
`)
    message.channel.send({embed})
};

module.exports.help = {
  name: "devinfo",
  description: "Shows the Dev of the Bot",
  aliases: ["developer", "dev", "botinfo"],
  category: "general"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 5,
  cooldown: 1e4
}