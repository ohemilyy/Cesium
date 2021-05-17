 const Discord = require("discord.js")
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { prefix } = require("../../config");

module.exports.run = async (client, message, args) => {
 const embed = new Discord.MessageEmbed()
 .setColor("ORANGE")
 .setFooter(`${prefix}help`, client.user.displayAvatarURL)
 .setAuthor(`HELP | ${client.user.username}`, message.guild.iconURL)
 .setThumbnail(message.guild.iconURL)
  if(!args[0]) {
    const categories = readdirSync("./commands/")
    embed.setDescription(`These are the avaliable commands for ${client.user.username} \n Current Prefix is set to \`${prefix}\``)
    console.log(categories)
    categories.forEach(category => {
      const dir = client.commands.filter(c => c.help.category === category)
      const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
      try {
         embed.addField(`» ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.help.name}\``))
      } catch(err) {
        console.log(err)
      }
    })
    return message.channel.send(embed)
    
    } else {
      let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
      if(!command) return message.channel.send(embed.setTitle("Invaild Command").setDescription(`\`${prefix}help for the list of commands\``))
      command = command.help
      embed.setDescription(stripIndents`The bot's prefix is \`${prefix}\`\n
            **COMMAND:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} 
            **DESCRIPTION:** ${command.description || "There was no description for this command provided."}
            **USAGE:** ${command.usage || "There was no usage for this command provided."}
            **ALIASES:** \`${command.aliases ? command.aliases.join(", ") : "No aliases for this command provided."}\`
`)
                  
      return message.channel.send(embed)
    }
}
module.exports.help = {
  name: "help",
  description: "List of commands",
  aliases: ["h", "cmds", "commands"]
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
  // if(args[0] && client.commands.has(args[0])) {
// const cmd = client.commands.get(args[0])  
// const cmdhelp = new Discord.MessageEmbed()
//   .setAuthor(`HELP | ${cmd.help.name}`, client.user.displayAvatarURL())
// .setColor("ORANGE")
// .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`)
// return message.channel.send(cmdhelp);
// }

// var embed = new Discord.MessageEmbed()
// .setAuthor(`HELP | ${client.user.username}`, client.user.displayAvatarURL())
// .setColor("ORANGE")
// .setDescription(client.commands.map(cmd => cmd.help.name).join(", "))
// .setFooter(`${client.prefix}help <name> - PhantomSystem`)
// return message.channel.send({embed})
