const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const { prefix, error } = require("../../config");
let settings = require('../../settings.json')
module.exports.run = async (client, message, args) => {
    const channel = client.channels.cache.get(`${settings.loggingchannelID}`);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join("  ")
    if(!member) {
      return message.channel.send(error + "Please mention a user to kick. \n **TIP:** Want to kick someone without mentioning them? \n Copy there id (`Must have developer mode on`) and use that instead mentions.")
    }
    if(!reason) {
      return message.channel.send(error + "Please enter a reason to kick this user.")
    }
    if(!member.kickable) {
        return message.channel.send(error + "You cannot ban this user.")
    }
    if(member.id === message.author.id) {
        return message.channel.send(error + "You cannot ban yourself.")
    }
    message.author.send(error + `You kicked ${member} for \`${reason}\``)
    member.send(`You got kicked in \`${message.guild.name}\`, for the following reason \`${reason}\` \n Kicked by: \`${message.author.tag}\``)
    await member.kick(reason).catch(err => {
        if (err) return message.author.send(`Well.... the kick didn't work out. Here's the error ${err}`)
    });
    const log = new Discord.MessageEmbed()
    .setTitle("ACTION TRIGGERED | MEMBER KICKED")
    .setColor("RED")
    .setThumbnail("https://img.pngio.com/download-atlas-compose-de-mappemondes-de-portulans-et-de-cartes-kicked-png-1600_1600.png")
        .setDescription(`*User has been kicked in \`${message.guild.name}\`* \n\n`
    + `• User Kicked : <@${member.id}> \n`
    + `• User Kicked By : <@${message.author.id}> \n`
    + `• Reason : \`${reason}\``)
    .setTimestamp()
    .setFooter(`${client.user.username} Logs`)
    channel.send(log);

}
module.exports.help = {
  name: "kick",
  description: "Kick an member!",
  category: "moderation",
  usage: "kick <@mentions/id> <reason>",
  aliases: ["k", "begone", "thot"]
}

module.exports.requirements = {
  userPerms: ["KICK_MEMBERS"],
  clientPerms: ["KICK_MEMBERS"],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 3,
  cooldown: 6e4
}