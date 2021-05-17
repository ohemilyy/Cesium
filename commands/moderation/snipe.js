const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
//code starts here
  
  const msg = client.snipes.get(message.channel.id);
  if(!msg) return message.channel.send("No recently deleted messages!")
  
  const embed = new Discord.MessageEmbed()
 .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
  .setColor("ORANGE")
  .setDescription(`CONTENT: \n${msg.content}`)
  
  
  if (msg.image) embed.setImage(msg.image);
  return message.author.send(embed)
}

module.exports.help = {
  name: "snipe",
  description: "View a recently deleted message!",
  category: "moderation"
}

module.exports.requirements = {
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 3,
  cooldown: 6e4
}