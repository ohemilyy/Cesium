const { token, prefix } = require("./config");
const { Client, Collection } = require("discord.js");
const { VultrexDB } = require("vultrex.db");
const fs = require('fs');
const client = new Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
})

const db = new VultrexDB({
  provider: "sqlite",
  table: "main",
  fileName: "main"
});

db.connect().then(() => {
 client.prefix = prefix;
  client.aliases = new Collection();
  client.categories = fs.readdirSync("./commands/")
client.commands = new Collection();
client.limits = new Map();
  client.warns = new Collection();
client.snipes = new Map();
client.db = db;
const commands = require("./structures/command");
commands.run(client)

const events = require("./structures/event");
events.run(client)
console.log("helloe")
})

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(chnl => chnl.id === `798253468871295028`);
  channel.send(`:wave: Welcome to the SolexGames Discord, ${member}`);
});

const Discord = require('discord.js')
module.exports.run = async (client, message) => {
      const channel = client.channels.cache.get('830778673279533106');
client.on("guildBanAdd", function(guild, user) {
  const log = new Discord.MessageEmbed()
  .setTitle("ACTION TRIGGERED | MEMBER BANNED")
  .setColor("YELLOW")
      .setDescription(`*User has been banned in \`${guild.name}\`* \n\n`
  + `• User Kicked : <@${user}> \n`)
  .setTimestamp()
  .setFooter("SolexGames Logs / This was recorded by the audit-log checker.")
  channel.send(log);
});  
}
client.login(token)
