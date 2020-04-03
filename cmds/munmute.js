module.exports.info = {
name: '(раз|ун)мут',
engname: 'unmute',
regex: '/(ра[зс]|[ау]н)му{1,}[тд]/',
engregex: '/(ra[sz]|[au]n)m[uo]{1,}[td]/',
args: '<id> [reason]',
engargs: '<id> [reason]',
desc: 'Анмуд наххуй',
engdesc: 'Unmood naxxuy',
private: true,
}
module.exports.run = message => 
Comp.con.query(`SELECT * FROM zamuchen WHERE id = ${message.args[0]} AND guild=${message.guild.id}`, (err, rows) => {
if(rows.length < 1) return message.reply('-_-')
else {Comp.con.query(`DELETE FROM zamuchen WHERE id=${message.args[0]} AND guild=${message.guild.id}`); message.reply('ok')}
})