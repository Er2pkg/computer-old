module.exports.info = {
name: 'ранк',
engname: 'rank',
regex: '/р[ау]н[кг]/',
engregex: '/r[au]n[kg]/',
args: '[человек]',
engargs: '[member]',
desc: 'Показать свой или чужой XP',
engdesc: 'Show your or alien XP',
}
module.exports.run = (message, ph) => {
message.channel.startTyping()
let user
if(message.args[0]) user = Comp.client.users.get(message.args[0]) || message.mentions.users.first()
if(!user) user = message.author
Comp.con.query(`SELECT * FROM xp WHERE id = ${user.id}`, (err, rows) => {
message.channel.stopTyping()
if(rows.length < 1) return message.reply(ph[0])
message.channel.send(`XP: ${rows[0].xp}\n${ph[1]+rows[0].lvl}`)
})
}