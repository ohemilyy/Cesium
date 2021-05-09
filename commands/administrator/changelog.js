const Discord = require("discord.js")
const d = require('discord.js');
const c = require('../../settings.json');
const o_date = new Intl.DateTimeFormat;
const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
const m_date = o_date.formatToParts().reduce(f_date, {});
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = (bot, m, args) => {
    if(m.author.id !== c.ownerID && m.author.id !== c.adminID)
        return m.channel.send(`No permission.`);

    m.delete();
    let msg = args.join(' ');

    const embed = new Discord.MessageEmbed()
        .setTitle(`Changelog (` + m_date.day + '-' + m_date.month + '-' + m_date.year + `)`)
        .setColor(`${c.embedColor}`)
        .setTimestamp()
        .setDescription(msg)
        .setFooter(`From ${m.author.username}`);
    m.channel.send({embed})
};


module.exports.help = {
  name: "changelog",
  description: "Dev Changelog",
  aliases: ["devnote", "changes", "devannounce"]
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