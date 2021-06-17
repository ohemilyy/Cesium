module.exports = (client) => {
  console.log(`This is: ${client.user.tag}`);
   let statuses = [
        {t:"WATCHING", m:"over demo.solexgames.com"},
        {t:"WATCHING", m:"over SolexGames"},
        {t:"LISTENING", m:"to help queries!"},
        {t:"PLAYING", m:"Like this bot contact Emily/Bunni!"}
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status['m'], { type: ["PLAYING", "WATCHING", "LISTENING", "STREAMNING"].includes(status['t']) ? status['t'] : "PLAYING" }); // Why? If you give a typing mistake it won't throw a error and it will automatically default to the 'PLAYING' state.
    }, 2000)

}
