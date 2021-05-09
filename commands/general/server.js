const Discord = require("discord.js")
const d = require('discord.js');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = async (client, message, args) => {
    const embed = new d.MessageEmbed();
    embed.setColor(`FFD700`)
    embed.setTitle(`Server`)
    embed.setDescription(`IP: **mine.rip**\nStatus: Whitelisted`)
    message.channel.send({embed})
};


module.exports.help = {
  name: "ip",
  description: "MineRIP Server Info",
  aliases: ["server", "connect", "address"],
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