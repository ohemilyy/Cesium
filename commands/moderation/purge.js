 const Discord = require("discord.js")
 const ms = require("ms")
const { stripIndents } = require("common-tags");
module.exports.run = async (client, message, args) => {
  const channel = client.channels.cache.get('726612345664569395');
const amount = args.join(' '); // Amount of messages which should be deleted

if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

if (amount > 500) return message.reply('You can`t delete more than 500 messages at once!'); // Checks if the `amount` integer is bigger than 100
if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
    message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)});

    const log = new Discord.MessageEmbed()
    .setTitle("ACTION TRIGGERED | PURGED MESSAGES")
    .setColor("ORANGE")
    .setThumbnail("https://media1.tenor.com/images/a7a2035dc93d8d92fc423f1f600649ab/tenor.gif")
        .setDescription(`*Messages purged in \`${message.guild.name}\`* \n\n`
    + `• Messages Purged : \`${amount}\` \n`
    + `• Command Executed By : <@${message.author.id}> \n`
    + `• Channel  : <#${message.channel.id}>`)
    .setTimestamp()
    .setFooter("Arctic Logs")
    channel.send(log);
}
module.exports.help = {
  name: "clear",
  description: "Clear some messages",
  aliases: ["purge", "clean", "remo"],
  category: "moderation",
  usage: "clear <amount>"
}

module.exports.requirements = {
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: ["MANAGE_ROLES"],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 5,
  cooldown: 1e4
}