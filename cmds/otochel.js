module.exports.info = {
name: 'отошёл',
engname: 'afk',
regex: '/[оа]т[оа]ш[ёео]л/',
engregex: '/af([ei])?ka?/',
args: '[причина]',
engargs: '[reason]',
desc: 'Скажет, что ты отошёл',
engdesc: 'Will say you left to AFK',
}
module.exports.run = (message, ph) => {
const row = Comp.DB.afkshit.get(message.author.id)
message.channel.startTyping()
if(!row) { Comp.DB.afkshit.set(message.author.id, new (Comp.structures.get('AFK'))('', {id: message.author.id, yes: 2, reason: message.args.join(' ')}))
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)}
if(row.yes == 1 || row._deleted) {
row.yes = 2
row.reason = message.args.join(' ')
row._deleted = false
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)
}
else {
row._deleted = true
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[2]}`)}
}