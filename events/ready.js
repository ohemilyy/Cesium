module.exports = (client) => {
  console.log(`This is: ${client.user.tag}`);
   let statuses = [
        "demo.solexgames.com",
        "SolexGames",
        ";help",
        "Like this bot contact Emily/Bunni!"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"});

    }, 2000)

}