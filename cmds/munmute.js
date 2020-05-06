module.exports.info = {
name: 'анмут',
engname: 'unmute',
regex: '(ра[зс]|[ау]н)му{1,}[тд]',
engregex: '(ra[sz]|[au]n)m[uo]{1,}[td]',
args: '<айди>',
engargs: '<id>',
desc: 'Анмут',
engdesc: 'Unmute',
private: true,
examples: ['Comp.client.users.cache.random().id'],
}
module.exports.run = async message => {
const row = await Comp.models.get('Mute').findOne({guild: message.guild.id, id: message.author.id})
if(!row) return message.reply('-_-')
else {row.remove(); message.reply('ok')}
}