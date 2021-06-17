module.exports = {
    pages(arr, itemsPerPage, page = 1) {
      const maxPages = Math.ceil(arr.length / itemsPerPage);
      if (page < 1 || page > maxPages) return null;
      return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    },
  
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase(); // Changes string to lowercase.

        let target = message.guild.members.fetch(toFind); // Tries fetching the member from the passed value.
        
        if (!target && message.mentions.members) // If the target is null, and if they provided mentions for members set the new target to the first mentioned member.
            target = message.mentions.members.first();

        if (!target && toFind) { // If the target was null and we have a value to our query, try finding the member via the dispayName or try checking if they're tag includes the query.
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) // If the target is null again, just provide who ran the command.
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    }
}
