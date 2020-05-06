module.exports.info = {
name: 'установить-язык',
engname: 'set-language',
desc: 'устанавливает язык',
engdesc: 'installing the language',
args: '<язык>',
engargs: '<language>',
regex: 's(et)?(-)?lang(uage)?|у(ст[оа]н[ао]вить)?(-)?я(зы[кг])?',
examples: ["'рус'", "'en'"],
}
module.exports.run = async (message, ph) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply(ph[0])
if(!message.args[0]) return message.reply(ph[1]+ph[2])
let lag = message.args[0].toLowerCase()
if(!lag.match(/ru(s{1,})?(ian)?|ру(с{1,})?(кий)?|eng?(lish)?|[ае]нг?(лийский|лишь?)?/)) return message.reply(ph[2])
else {
if(lag.match(/ru(s{1,})?(ian)?|ру(с{1,})?(кий)?/)) lag = 1
else lag = 2
let gld = await Comp.models.get('Guild').findOne({id: message.guild.id})
if(!gld) gld = new (Comp.models.get('Guild'))({id: message.guild.id, lang: lag})
else gld.lang = lag
gld.save()
if(lag == 1) message.reply(ph[3])
else message.reply(ph[4])
}}