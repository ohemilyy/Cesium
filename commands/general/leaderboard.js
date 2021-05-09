const Discord = require("discord.js");
const functions = require("../../structures/functions");
module.exports.run = async (client, message, args) => {
//code starts here
let data = await client.db.getAll(`level-${message.guild.id}`);
  data = data.sort((a, b) => b.value.totalXp - a.value.totalXp)
  data = await Promise.all(data.map(async (data, index) => {
    const user = await client.users.fetch(data.key.split("-")[2]).catch(() => null);
    if (user) {
      return {
        tag: user.tag,
        level: data.value.level,
        rank: index + 1
      }
    }
  }));
  
  if(!data.length) return message.reply("This server doesn't have a leaderboard yet...");

  const page = functions.pages(data, 10, args[0] || 1);
  if(!page) return message.reply("This page doesn't exist!")

  const embed = new Discord.MessageEmbed()
    .setTitle(`Leaderboard | \`${message.guild.name}\``)
  .setThumbnail(message.guild.iconURL())
  .setColor("GREEN")
  .setDescription(page.map(e => `\`#${e.rank}\` | **${e.tag}** (__Level__ ${e.level})`))
return message.channel.send(embed)
}

module.exports.help = {
  name: "leaderboard",
  description: "View the leaderboard for this server!",
  aliases: ["lb", "top"],
  category: "general"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 4,
  cooldown: 1e4
}