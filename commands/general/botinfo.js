const Discord = require("discord.js")
const { sencolor, version, owners, developers } = require("../../config.js")
const moment = require("moment")
module.exports.run = (client, message, args) => {
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
   //code starts here
  var embed = new Discord.MessageEmbed()
  .setAuthor("Bot Information", client.user.displayAvatarURL())
  .setColor(`#FF8C00`)
  .setThumbnail(client.user.displayAvatarURL())
  .addField(`\:rotating_light: Uptime`, `Cesium has been spinning for ${duration}.`, true)
  //.addField("\:crossed_swords: Stats", "Number of times peopleran my commands: <number of commands ran> commands have been executed, as well as <how many were custom commands> custom commands")
  .addField("\:gear: Stats", `Working in ${client.guilds.cache.size} server, with a total ${client.users.cache.size} users.`, true)
  .addField("\u200B", "\u200B")
  .addField("\:mega: Version", `Currently running Cesium version 1.0.1`, true)
  .addField("\🇱", `Discord.js \n Node.js \n Javascript`, true)
  .addField("\u200B", "\u200B")
  .addField(":wrench: Developers", `ItzBunniYT`)
  .setFooter(`${client.user.username}`)
  console.log(`${duration}`)
  return message.channel.send(embed)
}

module.exports.help = {
  name: "botinfo",
  description: "Shows the bot information.",
  aliases: ["bi"],
  category: "general",
  usage: "botinfo"
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