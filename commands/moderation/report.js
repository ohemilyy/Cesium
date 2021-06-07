const { stripIndents } = require("common-tags");

const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
//code starts here
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        
        const channel = message.guild.channels.cache.find(c => c.name === "logs")
            
        if (!channel)
            return message.channel.send("Couldn't find a `#logs` channel").then(m => m.delete(5000));

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
            **- Reported by:** ${message.member}
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);}

module.exports.help = {
  name: "report",
  description: "Report a user.",
  category: "moderation"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 50,
  cooldown: 6e4
}