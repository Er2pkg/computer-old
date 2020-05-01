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
module.exports.run = async (message, ph) => {
const row = await Comp.models.get('AFK').findOne({id: message.author.id})
message.channel.startTyping()
if(!row) {await Comp.models.get('AFK').create({id: message.author.id, yes: 2, reason: message.args.join(' ')})
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)}
if(row.yes == 1) {
row.yes = 2
row.reason = message.args.join(' ')
row.save()
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[1]}\n${message.args.join(' ')}`)
}
else {
row.remove()
message.channel.stopTyping()
return message.channel.send(`${ph[0]+' '+message.member.displayName+' '+ph[2]}`)}
}