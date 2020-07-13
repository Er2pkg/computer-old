module.exports.run = async (message, emitted) => {
if (!message || !message.guild || message.author.bot) return

let gld = await Comp.models.get('Guild').findOne({id: message.guild.id})
if(!gld) {gld = new (Comp.models.get('Guild'))({id: message.guild.id, lang: 1}); gld.save()}
message.glang = gld.lang
message.lang = message.glang==1?'ru':'en'
message.xp = Comp.random(15, 25)
message.prefix = Comp.client.prefixes.find(p => message.content.toLowerCase().startsWith(p))

const moduls = Comp.types.cache.get('modules').elements.filter(i => !i.disabled && gld.modules.find(x => i.name.startsWith(x.toString()))),
locale = (a,b) => Comp.locale.find(a, b, message.lang)

if(moduls.size > 0)
moduls.forEach(h => h.run(message, message.glang, emitted, locale))

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
Comp.client.stats.msgs++
let row = await Comp.models.get('XP').findOne({id: message.author.id})
if(!row) row = new (Comp.models.get('XP'))({id: message.author.id, xp: message.xp})
else {
row.xp = row.xp + message.xp
if(message.xp <= 0 && row.lvl >= 1) row.xp += message.xp
if(message.xp <= 0 && row.xp + message.xp <= 0 && row.lvl > 1) {row.xp = Comp.xpFormule(row.lvl-1)+message.xp; row.lvl = row.lvl-1; return row.save()}
if(row.xp + message.xp >= Comp.xpFormule(row.lvl)) row.xp = 0, row.lvl = row.lvl + 1
}
row.save()
}

if(!message.prefix) return
else message.xp = 0

message.args = message.content.slice(message.prefix.length).trim().split(/ +/g)
message.flags = message.args.filter(i => i.match(/--(\w{1,})/gi)).map(i => i.slice(2))
message.devMode = message.flags.has('dev')
message.command = message.args.shift().toLowerCase()

if(Comp.blacklist.includes(message.author.id))
return message.react('🚫')

if(!message.command) return message.reply(locale('events', 'message')[0])

let cmd = Comp.client.commands.cache.find(c => [c.info.regex, c.info.engregex].find(x => x?message.command.match(new RegExp(x, 'gi')):false))
if(cmd) {
let cdsecs = 10
if(Comp.cd.get(message.author.id)) {
let time = Math.ceil((Comp.cd.get(message.author.id).ts - Date.now()) / 1000)||cdsecs
if(time <= 0) Comp.cd.delete(message.author.id)
else return message.reply(locale('events', 'message')[3]+time +' '+Comp.declOfNum(time, locale('events', 'message')[4])).then(o=>o.delete({timeout: time*1000}))
}
else if(!Comp.owners.get(message.author.id)) Comp.cd.set(message.author.id, {ts: Date.now() + cdsecs * 1000})
Comp.client.stats.cmds.total++, Comp.client.stats.cmds.perHour++
if ((!cmd.info.private || Comp.owners.get(message.author.id)) && cmd.run) {cmd.uses++; return cmd.run(message, locale('cmds', (cmd.info.engname||cmd.info.name)))}
}
}
