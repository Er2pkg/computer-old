module.exports.info = {
name: 'мут',
engname: 'mute',
regex: '/му{1,}[тд]/',
engregex: '/m[uo]{1,}[td]/',
args: '<id> <time (in ms)> [reason]',
engargs: '<id> <time (in ms)> [reason]',
private: true,
}

module.exports.run = message => {
const row = await Comp.models.get('Mute').findOne(i => i.guild == message.guild.id && i.id == message.author.id)
if(!row) {Comp.DB.mutes.set(message.guild.id+'_'+message.author.id, new (Comp.structures.get('Mute'))('', {guild: message.guild.id, id: message.author.id, inmute: 1, reason: (message.args.slice(2).join(' ') || 'no reason'), mute_time: Date.now(), unmute_time: (Date.now()+parseInt(message.args[1])) }))
message.channel.send(['ok',
`Muted at ${new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(Date.now()+parseInt(message.args[1] || 0)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`
])}
else return message.channel.send([
`This user is ${row.inmute?'':'not '}muted`,
`Reason: ${row.reason?row.reason:'no reason'}`,
`Muted at ${new Date(parseInt(row.mute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(parseInt(row.unmute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`])
}