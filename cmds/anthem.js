module.exports.info = {
name: 'гимн',
engname: 'anthem',
desc: 'Гимн СССР',
engdesc: 'Anthem of USSR',
regex: '/гиме?нь?/',
engregex: '/gime?n|anthem/',
}
module.exports.run = (message, ph) => {
if (!message.member.voiceChannel) return message.channel.send(ph[0])
message.member.voiceChannel.join().then(connection => {
message.channel.send(ph[1]+' <:USSR:560858037041102858>').then(msg => {
msg.react('❌')
const dispatcher = connection.playFile('./assets/anthem.mp3')
dispatcher.on('end', () => {
message.guild.me.voiceChannel.leave()
msg.delete()
})
const collector = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && user.id == message.author.id, {time: 300000})
collector.on('collect', async r => {
if (r.emoji.name === '❌') {
message.guild.me.voiceChannel.leave()
msg.delete()
}})})})}