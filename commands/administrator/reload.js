const Discord = require("discord.js")
const d = require('discord.js');
const c = require('../../settings.json');
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if(message.author.id !== c.adminID)
        return message.channel.send(`No permission.`);
    if (!args || args.size < 1) return message.channel.send('Must provide a command to reload.');
    message.delete()

    let command;
    if (client.commands.has(args[0])) {
        command = client.commands.get(args[0]);
    } else if (client.aliases.has(args[0])) {
        command = client.commands.get(client.aliases.get(args[0]));
    }
    if (!command) return message.channel.send(`The command \`${args[0]}\` doesn't seem to exist, nor is it an alias. Try again!`);

    if (command.db) await command.db.close();

    command = command.help.name;

    delete require.cache[require.resolve(`./${command}.js`)];
    const cmd = require(`./${command}`);
    client.commands.delete(command);
    if (cmd.init) cmd.init(client);
    client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
    });

    message.channel.send(`The command \`${command}\` has been reloaded`);
};


module.exports.help = {
  name: "reload",
  description: "Reloads a command that\'s been modified.",
  aliases: ["restart", "reboot", "asdasd"],
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