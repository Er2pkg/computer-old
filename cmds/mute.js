module.exports.info = {
name: 'мут',
engname: 'mute',
regex: '/му{1,}[тд]/',
engregex: '/m[uo]{1,}[td]/',
args: '<id> <time (in ms)> [reason]',
engargs: '<id> <time (in ms)> [reason]',
private: true,
}
module.exports.run = message =>
Comp.con.query(`SELECT * FROM zamuchen WHERE id = ${message.args[0]} AND guild=${message.guild.id}`, (err, rows) => {
if(rows.length < 1) {Comp.con.query(`INSERT INTO zamuchen (guild, id, inmute, reason, mute_time, unmute_time) VALUES ('${message.guild.id}', '${message.args[0]}', 1, '${message.args.slice(2).join(' ') || ''}', ${Date.now()}, ${Date.now()+parseInt(message.args[1])})`); 
message.channel.send(['ok',
`Muted at ${new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(Date.now()+parseInt(message.args[1])).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`
])}
else return message.channel.send([
`This user is ${rows[0].inmute?'':'not '}muted`,
`Reason: ${rows[0].reason?rows[0].reason:'no reason'}`,
`Muted at ${new Date(parseInt(rows[0].mute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(parseInt(rows[0].unmute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`])
})