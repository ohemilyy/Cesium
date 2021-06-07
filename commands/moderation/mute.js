 const Discord = require("discord.js")
 const ms = require("ms")
const { stripIndents } = require("common-tags");
 let settings = require('../../settings.json')
module.exports.run = async (client, message, args) => {
  const channel = client.channels.cache.get(`${settings.loggingchannelID}`);
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  // const reason = args.slice(2).join("  ")
  if(!member) {
    return message.channel.send(":x: Please enter mention/id of a user to mute.")
  }
var muterole = message.guild.roles.cache.get(`${settings.muteroleID}`);
if(!muterole) return message.channel.send(":x: There is no mute role in this server.")
  
  var mutetime = args[1]
  
  if(!mutetime) return message.channel.send(":x: How long are you going to mute this user?")
  
  await(member.roles.add(muterole.id))
  message.channel.send(`:white_check_mark: ${member} is now muted for ${mutetime}`)
  
  setTimeout(() => {
    member.roles.remove(muterole.id)
    member.send(":white_check_mark: You have been unmuted!")
  }, ms(mutetime))
}
module.exports.help = {
  name: "mute",
  description: "mute a user",
  aliases: ["m", "shutup", "hush"],
  category: "moderation",
  usage: "mute <mention/id> <time> <reason>"
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
    // if(!reason) {
  //   return message.channel.send(" Please enter a reason to mute.")
  // }
  //       if (member.id === message.author.id) {
  //       return message.reply(" You cannot mute yourself.")
  //   }
  // if(!member.bannable) {
  //   return message.channel.send(" You cannot mute this user.")
  // }
  // if(!member.kickable) {
  //   return message.channel.send(" You cannot mute this user.")
  // }
  // const log = new Discord.MessageEmbed()
  // .setTitle("ACTION TRIGGERED | MEMBER BANNED")
  // .setColor("RED")
  // .setThumbnail("https://media.tenor.com/images/04c17a71eaecd5db93d22d38184bb73d/tenor.gif")
  //     .setDescription(`*User has been Banned in \`${message.guild.name}\`* \n\n`
  // + `• User Banned : <@${member.id}> \n`
  // + `• User Banned By : <@${message.author.id}> \n`
  // + `• Reason : \`${reason}\``)
  // .setTimestamp()
  // .setFooter("Azurite Logs")
  // channel.send(log);
/*
 if(!muterole) {
    message.channel.send("<:alert:729518094367588384> Creating `muted` role.")
      muterole = await message.guild.roles.create({
            data: {
              name: "muted",
              color: "#000000",
              permissions: []
            },
            reason: 'Mute Time ayyy!'
          })
    message.channel.send(" Created `mute` role, adding overrides.")
      const textChannels = message.guild.channels.cache.filter(channel => channel.type === 'text');
  if (!textChannels.every(channel => channel.permissionOverwrites.get(muterole.id))) {
    textChannels.forEach(async (channel, id) => {
      await channel.overwritePermissions(muterole, {
       SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    })
    // message.guild.channels.cache.forEach(async (channel, id) => {
    //   await channel.overwritePermissions(muterole, {
    //     SEND_MESSAGES: false,
    //     ADD_REACTIONS: false,
    //   });
    // });
     message.channel.send(" Added overrides, you can now use the mute command.")
  }
    const mutetime = args[1]
  if(!mutetime) {
    return message.channel.send(" You didn't specify a time!")
  }
  member.roles.add(muterole.id, "Added Mute")
  return message.channel.send(`<:alert:729518094367588384> <@${member.id}> has been muted until ${ms(ms(mutetime))}`)
    return message.channel.send(`<:alert:729518094367588384> You have been muted in \`${message.guild.name}\` for ${ms(mutetime)}`)
  .setTimeout(function(){
    member.removeRole(muterole.id);
    member.send(`<:alert:729518094367588384> You have been unmuted on \`${message.guild.name}\` you can now talk again.`)
  }, ms(mutetime))

}*/