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

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
let cd = Comp.cd.get(message.author.id)
if(cd && cd.xp && (cd.xp - Date.now()) > 0)
message.xp = 0
else if(!cd)
Comp.cd.set(message.author.id, {xp: Date.now() + 60000})
else if(cd.xp && cd.xp - Date.now() <= 0)
cd.xp = Date.now() + 60000
}

if(moduls.size > 0)
moduls.forEach(h => h.run(message, message.glang, emitted, locale))

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
//if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
Comp.client.stats.msgs++
let row = await Comp.models.get('User').findOne({id: message.author.id})
if(!row) row = new (Comp.models.get('User'))({id: message.author.id})
row.profile.xp = row.profile.xp + message.xp
row.save()
}

if(!message.prefix) return
else message.xp = 0

message.args = message.content.slice(message.prefix.length).trim().split(/ +/g)
message.flags = message.args.filter(i => i.match(/--(\w{1,})/gi)).map(i => i.slice(2))
message.args = message.args.filter(i => !i.match(/--(\w{1,})/gi))
message.devMode = message.flags.has('dev')
message.command = message.args.shift().toLowerCase()

if(Comp.blacklist.includes(message.author.id))
return message.react(Comp.emojis.deny)

if(!message.command) return message.reply(locale('events', 'message')[0])

let cmd = Comp.client.commands.cache.find(c => [c.info.regex, c.info.engregex].find(x => x?message.command.match(new RegExp(x, 'gi')):false))
if(cmd) {
let cdsecs = 5,
cd = Comp.cd.get(message.author.id)
if(cd && cd.cmds) {
let time = Math.ceil((cd.cmds - Date.now()) / 1000)||cdsecs
if(time <= 0) delete cd.cmds
else {
Comp.reactDel(message, 'wait', time*1000)
await Comp.sleep(time*1000)
Comp.reactDel(message, 'allow', 2000)
}
}
else
if(!cd)
Comp.cd.set(message.author.id, {cmds: Date.now() + cdsecs * 1000})
else cd.cmds = Date.now() + cdsecs * 1000
Comp.client.stats.cmds.total++, Comp.client.stats.cmds.perHour++
if (cmd.run) {
if(cmd.info.private && !Comp.owners.get(message.author.id))
return message.react(Comp.emojis.deny)
cmd.uses++
return cmd.run(message, locale('cmds', (cmd.info.engname||cmd.info.name)))
}

}
}
