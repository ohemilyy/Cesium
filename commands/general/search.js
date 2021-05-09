const { MessageEmbed } = require("discord.js")
const functions = require("../../structures/functions")


module.exports.run = (client, message, args) => {
  if(!args[0] || !args[1]) return message.reply("Please provide a keyword and a page number.")
  const page = functions.pages(message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(args[0].toLowerCase())).map(m => m.user.tag), 5, args[1]);
  if(!page) return message.channel.send("No page with this keyword found!")
  
  
  return message.channel.send(new MessageEmbed()
.setAuthor(`Results for ${args[1]}`, message.guild.iconURL())
                              .setDescription(page.join("\n"))
                              .setColor("BLUE")
                             )
}

module.exports.help = {
  name: "search",
  description: "Search the Members List",
  category: "general",
  aliases: ["find"]
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 3,
  cooldown: 1e4
}