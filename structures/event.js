const { readdirSync } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '..', "events");

module.exports.run = (client) => {
  const eventFiles = readdirSync(filePath);
  for (const eventFiles of readdirSync(filePath)) {
    const event = require(`${filePath}/${eventFiles}`);
    const eventName = eventFiles.split(".").shift();
    client.on(eventName, event.bind(null, client));

  }

  console.log(`Loaded ${eventFiles.length} events! YAYA`);
}


//REAL ONE THAT WORKS FOR ME

/*  const eventFiles = readdirSync(filePath);
  for(const eventFile of eventFiles) {
    const event = require(`${filePath}/${eventFile}`);
    const eventName = eventFile.split(".").shift();
    client.on(eventName, event.bind(null, client)); */
// okay that works

// const { readdirSync } = require("fs");
// > const { join } = require("path");
// > const filePath = join(__dirname, "..", "events");
// >
// > module.exports.run = (client) => {
// >     const eventFiles = readdirSync(filePath);
// >     for (const eventFiles of readdirSync(filePath)) {
// >         const event = require(`${filePath}/${eventFiles}`);
// >         const eventName = eventFiles.split(".").shift();
// >         client.on(eventName, event.bind(null, client));
// >     }
// >
// >     console.log(`${eventFiles.length} events chargés !`)