module.exports.run = async guild => {
if(!guild.roles.find(r => r.name === 'Muted')) guild.createRole({name: 'Muted', permissions: 0})
const row = await Comp.models.get('Lang').findOne({id: guild.id})
if(!row) await Comp.models.get('Lang').create({id: guild.id, lang: 1})
Comp.client.glangs.push({gid: guild.id, lang: 1})
let channels = guild.channels.filter(c => c.type === 'text' && c.permissionsFor(guild.members.get(Comp.client.user.id)).has('SEND_MESSAGES'))
if (channels.size > 0) channels.first().send(`Спасибо за приглашение бота на сервер. Стандартный язык: :flag_ru:. Сменить язык можно командой ${Comp.client.prefixes[0]} у-я.
Thank you for inviting this bot. Standart language is :flag_ru:. Change the language can command ${Comp.client.prefixes[5]} set-lang.
P.S. Извиняемся, если я написал это не в нужный канал.
P.S. Sorry, if I type this not in the right channel.
`)
}
