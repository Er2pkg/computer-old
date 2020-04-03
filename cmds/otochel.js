module.exports.info = {
name: 'отошёл',
engname: 'afk',
regex: '/[оа]т[оа]ш[ёо]л/',
engregex: '/af([ei])?ka?/',
args: '[причина]',
engargs: '[reason]',
desc: 'Скажет, что ты отошёл',
engdesc: 'Will say you left to AFK',
}
module.exports.run = (message, ph) =>
Comp.con.query(`SELECT * FROM afkshit WHERE id = ${message.author.id}`, (err, rows) => {
message.channel.startTyping()
if(rows.length < 1) { Comp.con.query(`INSERT INTO afkshit (id, yes, reason) VALUES (${message.author.id}, 2, '${message.args.join(' ')}')`)
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)}
if(rows[0].yes === 1) {
Comp.con.query(`UPDATE afkshit SET yes = 2, reason='${message.args.join(' ')} WHERE id = ${message.author.id}`)
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)
}
else {
Comp.con.query(`DELETE FROM afkshit WHERE id = ${message.author.id}`)
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[2]}`)}
})