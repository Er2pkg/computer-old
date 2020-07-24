module.exports.run = async (message, z, emitted, locale) => {

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
//if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
let loc = locale('events', 'message'),
row = await Comp.models.get('User').findOne({id: message.author.id})
if(!row) return
if(Comp.getLvl(row.profile.xp+message.xp) > Comp.getLvl(row.profile.xp))
//console.log('Lvlup', 'Level:', Comp.getLvl(row.profile.xp)+1, 'User:', message.author.tag),
message.reply(loc[1].replace('x', Comp.getLvl(row.profile.xp)+1))
}
}