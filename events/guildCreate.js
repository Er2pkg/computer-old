module.exports.run = async guild => {
//if(!guild.roles.cache.find(r => r.name == 'Muted')) guild.createRole({name: 'Muted', permissions: 0})
let channels = guild.channels.cache.filter(c => c.type === 'text' && c.permissionsFor(guild.members.cache.get(Comp.client.user.id)).has('SEND_MESSAGES'))
if (channels.size > 0) channels.first().send(new Comp.Embed().setColor(Comp.beta?'BLURPLE':'00fff0').setAuthor(Comp.client.user.username, Comp.client.user.avatarURL()).setDescription(Comp.locale.find('events', 'gc').replace(/prefixes\d/gi, match => Comp.client.prefixes[parseInt(match.slice(-1))])))
}
