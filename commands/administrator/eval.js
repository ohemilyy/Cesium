const { inspect } = require('util');
const { stripIndents } = require('common-tags')
const { VultrexHaste } = require('vultrex.haste');
const Discord = require('discord.js');
const haste = new VultrexHaste();

module.exports.run = async (client, message, args) => {
 if(!args[0]) return message.channel.send('Please provide a javascript code to evaluate.')
  
  try {
      const start = process.hrtime();
    let output = eval(args.join("  "));
    const difference = process.hrtime(start);
    if(typeof output !== "string") output = inspect(output, { depth: 2 });
    
    return message.channel.send(stripIndents`
      *Executed in ${difference[0] > 0 ? `${difference[0]}s` : ""}${difference[1] / 1e6}ms*
  \`\`\`js
 ${output.length > 1950 ? await haste.post(output) : output}
\`\`\`


`);
  } catch(err) {
   return message.channel.send(stripIndents`
    Error:
   \`${err}\`

`)
  }
}

module.exports.help = {
  name: "eval",
  description: "eval command",
  category: "administrator"
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: true
}

module.exports.limits = {
  rateLimit: 999,
  cooldown: 6e4
}