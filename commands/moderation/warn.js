const Discord = require("discord.js");
const functions = require("../../structures/functions");
const { prefix, error } = require("../../config");
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) {
    return message.channel.send(error + "Please enter a member to warn \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  if(message.mentions.users.first().bot) {
    return message.channel.send(error + "You cannot warn a bot \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  const reason = args.slice(1).join("  ")
  if(!reason) {
    return message.channel.send(error + "Please enter a reason to warn! \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }
  if(message.author.id === member.id) {
    return message.channel.send(error + "You cannot warn yourself. \n" + `**USAGE:** \`${prefix ? prefix : client.prefix["default"]}warn <@mention/id> <reason>\``)
  }

  let warnings = await db.get(`warnings_${message.guild.id}_${member.id}`)
  if(warnings === 5) {
    return message.channel.send(error + `**ERROR**! ${message.mentions.user.first().username} has already reached the maximum warns.`)
  }
  if(warnings === null) {
    db.set(`warnings_${message.guild.id}_${member.id}`, 1, message.author.id)
    member.send(error + "**WARN** You have been warned  in " + message.guild.name + " for " + '`' + reason + '`' + ". \n You have been warned by " + message.author.tag)
    await message.channel.send(error + "**SUCCESS!** You have warned " + "<@" + member.id  + ">"  + ".")
  } else if(warnings !== null) {
     db.add(`warnings_${message.guild.id}_${member.id}`, 1, message.author.id)
    member.send(error + "**WARN** You have been warned  in " + message.guild.name + " for " + '`' + reason + '`' + ". \n You have been warned by " + message.author.tag)
    await message.channel.send(error + "**SUCCESS!** You have warned " + "<@" + member.id + ">"  + ".")

  }
};

module.exports.help = {
  name: "warn",
  description: "warn a member",
  aliases: ["warn", "w"],
  category: "moderation",
  usage: "warn <@mention/id> <reason>"
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