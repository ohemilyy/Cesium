const moment = require("moment");
const { sencolor } = require("../config.js")
const Discord = require("discord.js")
module.exports = async (client, member, message) => {
    let channel =  await client.db.get(`welcome-${member.guild.id}`)
    if(channel === null){
        return;
    }
    let joinrole = await client.db.get(`joinrole-${member.guild.id}`)
    const embed = new Discord.MessageEmbed()
        .setColor(sencolor)
        .setThumbnail(member.guild.iconURL())
        .setTitle(`Welcome To \`${member.guild.name}\``)
        .setDescription("Make sure you invite your friends! \n\n"
            + `**Member** - \`${member.user.tag}\` \n`
            + `**Total Members** - \`${member.guild.memberCount}\` \n`
            + `**Created** - \`${moment(member.user.createdTimestamp).format('LL LTS')}\``)
        .setFooter(`${member.guild.name}`, member.guild.iconURL())
    client.channels.cache.get(channel.id).send(embed)
    member.roles.add(joinrole ? joinrole.id : null)

    let lchannel =  await client.db.get(`log-${member.guild.id}`)
    if(lchannel === null){
        return;
    }
    const lembed = new Discord.MessageEmbed()
        .setColor(sencolor)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(":plus: `ALERT!` **A MEMBER HAS JOINED** \n\n"
            + `**MEMBER ID** - \`${member.id}\` \n`
            + `**MEMBER TAG** - \`${member.user.tag}\` \n`
            + `**ACCOUNT CREATED** - \`${moment(member.user.createdTimestamp).format('LL LTS')}\` \n`)
        .setFooter(`${member.guild.name} Logs`, member.guild.iconURL())
    client.channels.cache.get(lchannel.id).send(lembed)
}