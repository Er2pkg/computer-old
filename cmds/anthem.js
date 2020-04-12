module.exports.info = {
name: 'гимн',
engname: 'anthem',
desc: 'Гимн СССР',
engdesc: 'Anthem of USSR',
regex: '/гиме?нь?/',
engregex: '/gime?n|anthem/',
}
module.exports.run = (message, ph) => {
if (!message.member.voice.channel) return message.channel.send(ph[0])
message.member.voice.channel.join().then(connection => {
message.channel.send(ph[1]+' <:USSR:560858037041102858>').then(msg => {
msg.react('❌')
const dispatcher = connection.play('./assets/anthem.mp3')
dispatcher.on('finish', () => {
message.guild.me.voice.channel.leave()
msg.delete()
})
const collector = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && user.id == message.author.id, {time: 300000})
collector.on('collect', async r => {
if (r.emoji.name === '❌') {
message.guild.me.voice.channel.leave()
msg.delete()
}})})})}