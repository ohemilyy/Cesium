const Discord = require("discord.js")
const d = require('discord.js');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = (bot, m, args) => {
    const embed = new d.MessageEmbed();
    var msg = args.join(' ');
    if (!msg)
        return m.channel.send(`**Please add a Question!**`);
    var sayings = ["It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "I don\'t think so.",
        "No, cause i hate you.",
        "Yeah!!!",
        "Nope, i hate you!",
    ];

    var result = Math.floor((Math.random() * sayings.length) + 0);
    embed.setColor(`#ff8c00`)
    embed.addField(':question: Question', msg)
    embed.addField(':8ball: 8Ball\'s Answer', sayings[result])
    m.channel.send({embed});
};

module.exports.help = {
  name: "8ball",
  description: "Ask bot question",
  aliases: ["8", "magic", "magicball"],
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