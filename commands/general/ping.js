module.exports.run = (client, message, args) => {
  message.reply(`Pong! ${client.ws.ping.toFixed(2)}ms`);
}

module.exports.help = {
  name: "ping",
  description: "Shows the latceny of the Discord API connected to the bot.",
  aliases: ["beep"],
  category: "general"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 2,
  cooldown: 1e4
}
