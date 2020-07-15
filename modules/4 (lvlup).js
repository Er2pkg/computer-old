module.exports.run = async (message, z, emitted, locale) => {

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
//if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
let loc = locale('events', 'message'),
row = await Comp.models.get('User').findOne({id: message.author.id})
if(row && (row.profile.xp + message.xp) >= Comp.xpFormule(row.profile.lvl)) {
message.channel.send(new Comp.Discord.MessageEmbed()
.setTitle(loc[1])
.setColor(Comp.beta?'BLURPLE':'00fff0')
.addField(loc[2], row.profile.lvl + 1)).then(msg => msg.delete({timeout: 6500}))
}}
}