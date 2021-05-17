const Discord = require("discord.js")
const d = require('discord.js');
const c = require('../../settings.json');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = (bot, m, args) => {
    if(m.author.id !== c.ownerID && m.author.id !== c.adminID)
        return m.channel.send(`No permission.`);

    m.delete();
    let msg = args.join(' ');

    const embed = new Discord.MessageEmbed()
        .setTitle(`Announcement`)
        .setColor(`${c.embedColor}`)
        .setTimestamp()
        .setThumbnail(`${c.serverIcon}`)
        .setDescription(msg)
        .setFooter(`From ${m.author.username}`);
    m.channel.send({embed})
};

module.exports.help = {
  name: "announcement",
  description: "Sends an announcemen",
  aliases: ["announcement", "announce", "alert"],
  category: "administrator"
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