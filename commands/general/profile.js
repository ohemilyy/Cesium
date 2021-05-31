const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: '`Discord Employee`',
	DISCORD_PARTNER: '`Discord Partner`',
	BUGHUNTER_LEVEL_1: '`Bug Hunter (Level 1)``',
	BUGHUNTER_LEVEL_2: '`Bug Hunter (Level 2)``',
	HYPESQUAD_EVENTS: '`HypeSquad Events`',
	HOUSE_BRAVERY: '`House of Bravery`',
	HOUSE_BRILLIANCE: '`House of Brilliance`',
	HOUSE_BALANCE: '`House of Balance`',
	EARLY_SUPPORTER: '`Early Supporter`',
	TEAM_USER: '`Team User`',
	SYSTEM: '`System`',
	VERIFIED_BOT: '`Verified Bot`',
	VERIFIED_DEVELOPER: '`Verified Bot Developer`'
};

const status = {
  online: ":green_circle: `Online`",
  idle: ":yellow_circle: `Idle/Afk`",
  dnd: ":red_circle: `Do Not Disturb`",
  offline: ":x: `Offline/Invisible`"
}
const device = {
  desktop: "Desktop",
  mobile: "Phone",
  web: "Website Browser"
}


module.exports.run = (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   //code starts here
  var isOnlyOnMobile = message.author.presence.clientStatus
      ? JSON.stringify(Object.keys(message.author.presence.clientStatus)) ===
        JSON.stringify(["mobile"])
      : false;
    var isOnDesktop = message.author.presence.clientStatus
      ? JSON.stringify(Object.keys(message.author.presence.clientStatus)) ===
        JSON.stringify(["desktop"])
      : false;
    var isOnlyOnWeb = message.author.presence.clientStatus
      ? JSON.stringify(Object.keys(message.author.presence.clientStatus)) ===
        JSON.stringify(["web"])
      : false;

    if (isOnlyOnMobile) {
      var app = `📱 \`Mobile app\``;
    } else if (isOnDesktop) {
      app = `:desktop: \`Desktop app\``;
    } else if (member.user.presence.status === `offline`) {
      app = `\`OFFLINE\``;
    } else {
      app = `:globe_with_meridians: \`Web Browser\``;
    }

		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);


		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'ORANGE')
    .setTitle(`${member.user.username}'s Profile`)
			// .addField('User', [
			// 	`\`\`Username »\`\` ${member.user.username}`,
			// 	`\`\`Discriminator »\`\` ${member.user.discriminator}`,
			// 	`\`\` ID »\`\` ${member.id}`,
			// 	`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
			// 	`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
			// 	`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			// 	`**❯ Status:** ${member.user.presence.status}`,
			// 	`**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
			// 	`\u200b`
			// ])
    .addField("User:plus:", `\`\`\`js\n`
             + `${member.user.tag} \`\`\``, true)
    .addField("User ID", `\`\`\`js\n`
             + `${member.user.id}\`\`\``, true)
    .addField("Nickname", `\`\`\`js\n`
             + `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"} \`\`\``, true)
    .addField("\u200b", "\u200b")
    .addField("Bot", `\n`
      + `${member.user.bot ? `:robot: \`True\`` : `:person_fencing: \`False\``}`, true)
    .addField("Status", `\n`
             + `${status[member.user.presence.status]}`, true)
    .addField("Device", `\n`
             + `${app}`, true)
        .addField("\u200b", "\u200b", true)
    .addField("Badge(s)", `\n`
             + `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`)
    .addField("Created at", `\`\`\`js\n`
             + `${moment(member.user.createdTimestamp).format('UTC |')} ${moment(member.user.createdTimestamp).format('LL LTS')} ${moment(member.user.createdTimestamp).fromNow()}\`\`\``)
    .addField("Activity ⚒️", `\`\`\`js\n`
             + `${member.GuildMember.presence.game} \`\`\``)
    .addField("Roles 🛡️", `\n`
             + `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`)
// .addField('Member', [
			// 	`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
			// 	`**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
			// 	`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
			// 	`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
			// 	`\u200b`
			// ]);
		return message.channel.send(embed);
}

module.exports.help = {
  name: "profile",
  description: "View a user's profile/info.",
  aliases: ["userinfo"],
  category: "general",
  usage: "profile"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false
}

module.exports.limits = {
  rateLimit: 2,
  cooldown: 1e4
}