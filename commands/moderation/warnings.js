const Discord = require("discord.js");
const functions = require("../../structures/functions");
const db = require('quick.db')
 const { prefix, error, sencolor } = require("../../config");
module.exports.run = async (client, message, args) => {
//code starts here
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)
  let warner = db.get(`warnings_${message.guild.id}_${member.id}`, message.author.id)
  if(warnings === null) warnings = 0;
  const warns  = new Discord.MessageEmbed()
  .setDescription(`Warnings for ${member}\n`
                + `**${warnings}** \n`
                + `Warned by <@${warner}>`)
 .setColor(`#FF8C00`)
  .setFooter(`${client.user.username} Warn Checker`)
  message.channel.send(warns)
}

module.exports.help = {
  name: "warnings",
  description: "warn a member",
  aliases: ["warns", "w", "infractions"],
  category: "moderation"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 4,
  cooldown: 1e4
}