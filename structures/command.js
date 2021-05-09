const { readdirSync } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '..', "commands");

module.exports.run = (client) => {
    readdirSync("./commands/").map(dir => {
        const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
                let prop = require(`../commands/${dir}/${cmd}`)
                console.log(`Loaded command ${prop.help.name}`)
                client.commands.set(prop.help.name, prop)
                if (prop.help.aliases) for (const alias of prop.help.aliases) {
                    client.aliases.set(alias, prop);
                }
            }
        )
    })
//   for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))) {
//     const prop = require(`${filePath}/${cmd}`)
//     client.commands.set(prop.help.name, prop);


//     if (prop.help.aliases) for (const alias of prop.help.aliases) {
//       client.aliases.set(alias, prop);
//     }
//   }

    console.log(`Loaded ${client.commands.size} commands!`);
}