const { owners } = require("../config");


module.exports = async (client, message) => {
  if(message.author.bot) return;  

  const levelInfo = await client.db.get(`level-${message.guild.id}-${message.author.id}`, {
     level: 1,
     xp: 0,
     totalXp: 0
  })
   
  const generatedXp = Math.floor(Math.random() * 16); // Generate a random number (e.g 0.23), multiply it by x16 and then raise to the next full integer. 
  levelInfo.xp += generatedXp;
  levelInfo.totalXp += generatedXp;
  
  if(levelInfo.xp >= levelInfo.level * 40) { // If the XP is greater than or equal to the level multiplied by 40, incremete their level, reset the xp and send a level up message.
    levelInfo.level++;
    levelInfo.xp = 0;
    message.reply(`You have leveled up! **${levelInfo.level}**`);
  }

  await client.db.set(`level-${message.guild.id}-${message.author.id}`, levelInfo).catch()
  
  if(!message.content.toLowerCase().startsWith(client.prefix)) return;
  
  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.prefix.length).toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);
  
  if(!cmd) return;
  if(!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;
  
  if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
    return message.reply("Only authorised personnel, can execute this command!");
  
  if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
    return message.reply(`You must have the following permissions: ${missingPerms(message.member, cmd.requirements.userPerms)}`);
  
  
  if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
    return message.reply(`I'm missing the following permissions: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);
  
  if(cmd.limits) {
    const current = client.limits.get(`${command}-${message.author.id}`);
  
    if(!current) client.limits.set(`${command}-${message.author.id}`, 1);
    else if(!(current >= cmd.limits.rateLimit)) client.limits.set(`${command}-${message.author.id}`, current + 1);
  
    setTimeout(() => {
      client.limits.delete(`${command}-${message.author.id}`);
    }, cmd.limits.cooldown);
  
  
  }  
  
  
  
  cmd.run(client, message, args);
}

const missingPerms = (member, perms) => {
  const missingPerms = member.permissions.missing(perms);
  .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
  
  return missingPerms.length > 1 ? 
    `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
  missingPerms[0];
}
