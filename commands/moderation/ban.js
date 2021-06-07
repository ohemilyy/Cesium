 const Discord = require("discord.js")
const { stripIndents } = require("common-tags");
const { prefix, error } = require("../../config");
 let settings = require('../../settings.json')
module.exports.run = async (client, message, args) => {
  const channel = client.channels.cache.get(`${settings.loggingchannelID}`);
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join("  ")
  if(!member) {
    return message.channel.send(error + "Please mention a user to ban. \n **TIP:** Want to ban someone without mentioning them? \n Copy there id (`Must have developer mode on`) and use that instead mentions.")
  }
  if(!reason) {
    return message.channel.send(error + "Please enter a reason to ban this user.")
  }
        if (member.id === message.author.id) {
        return message.reply(error + "You can't ban yourself.")
    }
  if(!member.bannable) {
    return message.channel.send(error + "You cannot ban this user.")
  }
  message.author.send(`You banned ${member} for \`${reason}\``)
  member.send(`You got banned in \`${message.guild.name}\`, for the following reason  \`${reason}\` \n Banned by: \`${message.author.tag}\``)
  await member.ban(reason)
  const log = new Discord.MessageEmbed()
  .setTitle("ACTION TRIGGERED | MEMBER BANNED")
  .setColor("RED")
  .setThumbnail("https://media.tenor.com/images/04c17a71eaecd5db93d22d38184bb73d/tenor.gif")
      .setDescription(`*User has been Banned in \`${message.guild.name}\`* \n\n`
  + `• User Banned : <@${member.id}> \n`
  + `• User Banned By : <@${message.author.id}> \n`
  + `• Reason : \`${reason}\``)
  .setTimestamp()
  .setFooter(`${client.user.username} Logs`)
  channel.send(log);
}
module.exports.help = {
  name: "ban",
  description: "Ban a user",
  aliases: ["bye", "coffin", "getlost"],
  category: "moderation"
}

module.exports.requirements = {
  userPerms: ["BAN_MEMBERS"],
  clientPerms: ["BAN_MEMBERS"],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 5,
  cooldown: 1e4
}