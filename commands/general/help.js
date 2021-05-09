 const Discord = require("discord.js")
const { stripIndents } = require("common-tags");
const { prefix } = require("../../config");

module.exports.run = async (client, message, args) => {
 if(args[0] && client.commands.has(args[0])) {
const cmd = client.commands.get(args[0])  
const cmdhelp = new Discord.MessageEmbed()
  .setAuthor(`HELP | ${cmd.help.name}`, client.user.displayAvatarURL())
.setColor("BLUE")
.addField("Name:", `\`${cmd.help.name}\``)
.addField("Description", `${cmd.help.description}`)
.addField("Aliases", cmd.help.aliases || `No Aliases`)
.addField("Category", cmd.help.category || `N/A`)
.setFooter(`Requested by ${message.author.tag}`)
return message.channel.send(cmdhelp); 
}

var embed = new Discord.MessageEmbed()
.setAuthor(`HELP | ${client.user.username}`, client.user.displayAvatarURL())
.setColor("ORANGE")
.setDescription(client.commands.map(cmd => `\`${cmd.help.name}\``).join(" › "))
.setFooter(`${client.prefix}help <name> - MineRIP`)
return message.channel.send({embed})

}
module.exports.help = {
  name: "testeee",
  description: "List of commands",
  aliases: ["testee", "testeee", "testee"]
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
  // if(args[0] && client.commands.has(args[0])) {
// const cmd = client.commands.get(args[0])  
// const cmdhelp = new Discord.MessageEmbed()
//   .setAuthor(`HELP | ${cmd.help.name}`, client.user.displayAvatarURL())
// .setColor("ORANGE")
// .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`)
// return message.channel.send(cmdhelp);
// }

// var embed = new Discord.MessageEmbed()
// .setAuthor(`HELP | ${client.user.username}`, client.user.displayAvatarURL())
// .setColor("ORANGE")
// .setDescription(client.commands.map(cmd => cmd.help.name).join(", "))
// .setFooter(`${client.prefix}help <name> - PhantomSystem`)
// return message.channel.send({embed})
