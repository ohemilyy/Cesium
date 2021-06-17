const { readdir } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '..', "events");

module.exports.run = (client) => {
  const eventFiles = readdirSync(filePath);
  readdir(filePath, (err, files) => {
    if(err) throw err; // If there is a error throw it to our console.
    const event = require(`${filePath}/${eventFile}`); // Load our event.
    const eventName = eventFile.split(".").shift(); // Get the first value before the char of '.'
    client.on(eventName, event.bind(null, client)); // Create a new 'event listener' for this event and bind it with our client.
  });
  
  console.log(`Loaded ${eventFiles.length} events!`);
}
