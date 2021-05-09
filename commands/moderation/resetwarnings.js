const Discord = require("discord.js");
const functions = require("../../structures/functions");
const { prefix, error } = require("../../config");
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) {
    return message.channel.send(error + "Please enter a member to reset warns. \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  if(message.mentions.users.first().bot) {
    return message.channel.send(error + "This is a bot user. \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  const reason = args.slice(1).join("  ")
  if(!reason) {
    return message.channel.send(error + "Please enter a reason to reset warns! \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  if(message.author.id === member.id) {
    return message.channel.send(error + "You cannot reset your own warns. \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }

  let warnings = await db.get(`warnings_${message.guild.id}_${member.id}`)
  if(warnings === 5) {
    return message.channel.send(error + `**ERROR**! ${message.mentions.user.first().username} has already reached the maximum warns.`)
  }
  if(warnings === null) {
    db.delete(`warnings_${message.guild.id}_${member.id}`)
    member.send(error + "**RESET** Your warns have been reset in " + message.guild.name + " for " + '`' + reason + '`' + ". \n Your warns was reset by " + message.author.tag)
    await message.channel.send(error + "**SUCCESS!** You have resetted " + "<@" + member.id  + ">'s "  + "warns.")
  } else if(warnings !== null) {
     db.delete(`warnings_${message.guild.id}_${member.id}`)
     member.send(error + "**RESET** Your warns have been reset in " + message.guild.name + " for " + '`' + reason + '`' + ". \n Your warns was reset by " + message.author.tag)
     await message.channel.send(error + "**SUCCESS!** You have resetted " + "<@" + member.id  + ">'s "  + "warns.")

  }
};

module.exports.help = {
  name: "resetwarns",
  description: "reset warnings of a member",
  aliases: ["rwarn", "rw"],
  category: "moderation",
  usage: "resetwarn <@mention/id> <reason>"
};

module.exports.requirements = {
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  ownerOnly: false
};

module.exports.limits = {
  rateLimit: 4,
  cooldown: 1e4
};