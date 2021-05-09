const Discord = require("discord.js")
const d = require('discord.js');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = (client, message, args, level) => {// eslint-disable-line no-unused-vars
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setColor(`#ff8c00`)
  .addField(`Owner`, `Dreamzy `, true)
  .addField('Location', message.guild.region, true)
  .addField('Server Name', `MineRIP`, true)
  .addField('Created', message.guild.createdAt.toLocaleString(), true)
  .addField('Roles', message.guild.roles.size, true)
  .setTimestamp()
  .setThumbnail(message.guild.iconURL)
  message.channel.send({embed}).catch(e => console.error(e));
};

module.exports.help = {
  name: "serverinfo",
  description: "Displays server information & statistic",
  aliases: ["stats", "serverstats", "guildinfo", "guildstats"],
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