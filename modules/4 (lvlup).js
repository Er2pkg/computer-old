module.exports.run = async (message, z, emitted) => {

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
let row = await Comp.models.get('XP').findOne({id: message.author.id})
if(row && (row.xp + message.xp) >= Comp.xpFormule(row.lvl)) {
if (message.lang == 'ru') message.channel.send(new Comp.Discord.MessageEmbed()
.setTitle("У вас новый уровень!")
.setColor('00fff0')
.addField("Уровень", row.lvl + 1)).then(msg => msg.delete({timeout: 5500}))
else message.channel.send(new Comp.Discord.MessageEmbed()
.setTitle("You get a new level!")
.setColor('00fff0')
.addField("Level", row.lvl + 1)).then(msg => msg.delete({timeout: 5500}))
}}
}