module.exports.info = {
name: '(раз|ун)мут',
engname: 'unmute',
regex: '/(ра[зс]|[ау]н)му{1,}[тд]/',
engregex: '/(ra[sz]|[au]n)m[uo]{1,}[td]/',
args: '<id> [reason]',
engargs: '<id> [reason]',
desc: 'Анмут',
engdesc: 'Unmute',
private: true,
}
module.exports.run = message => {
const row = Comp.DB.mutes.get(message.guild.id+'_'+message.author.id)
if(!row) return message.reply('-_-')
else {row._deleted = true; message.reply('ok')}
}