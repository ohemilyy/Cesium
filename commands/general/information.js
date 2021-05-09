const d = require('discord.js')
let settings = require('../../settings.json')
exports.run = async (client, message, args) => {
    const embed = new d.MessageEmbed();
    embed.setColor(`${settings.embedColor}`)
    embed.setTitle(`Information`)
    embed.setDescription(`Welcome to MineRIP! We are a small PvP Network based in the NA Region.

**Address** - The server address for the test network is mine.rip`)
    message.channel.send({embed})
};
module.exports.help = {
  name: "information",
  description: "Server Information",
  aliases: ["info"],
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