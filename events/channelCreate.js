module.exports = (client, channel) => {
    console.log(`channelCreate: ${channel.name} ${channel.member.username}`);
}