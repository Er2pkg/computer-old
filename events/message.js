module.exports.run = async (message, emitted) => {
if (!message.guild || message.author.bot) return

let gld = await Comp.models.get('Guild').findOne({id: message.guild.id})
if(!gld) {gld = new (Comp.models.get('Guild'))({id: message.guild.id, lang: 1}); gld.save()}
message.glang = gld.lang
message.lang = message.glang==1?'ru':'en'
message.xp = Comp.random(15, 25)
message.prefix = Comp.client.prefixes.find(p => message.content.toLowerCase().startsWith(p))

const moduls = Comp.modules.filter(i => !i.disabled && gld.modules.find(x => i.name.startsWith(x.toString())))

if(moduls.array().length > 0)
moduls.forEach(h => h.run(message, message.glang, emitted))

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
Comp.client.stats.msgs++
let row = await Comp.models.get('XP').findOne({id: message.author.id})
if(!row) row = new (Comp.models.get('XP'))({id: message.author.id, xp: message.xp})
else {
row.xp = row.xp + message.xp
if(message.xp <= 0 && row.lvl >= 1) row.xp = row.xp+message.xp
if(message.xp <= 0 && row.xp + message.xp <= 0 && row.lvl > 1) {row.xp = Comp.xpFormule(row.lvl-1)+message.xp; row.lvl = row.lvl-1; return row.save()}
if(row.xp + message.xp >= Comp.xpFormule(row.lvl))
row.xp = 0, row.lvl = row.lvl + 1
}
row.save()
}

if(!message.prefix) return
else message.xp = 0

message.args = message.content.slice(message.prefix.length).trim().split(/ +/g)
message.flags = message.args.filter(i => i.match(/--(\w{1,})/gi)).map(i => i.slice(2))
message.devMode = message.flags.has('dev')
message.command = message.args.shift().toLowerCase()

if(!message.command) {
if(message.glang === 1) return message.reply('Я тут. '+(Comp.client.ignores.includes(message.author.id)?'Однако прости, ты в игноре бота':'Введи команду'))
else return message.reply('I\'m there. '+(Comp.client.ignores.includes(message.author.id)?'However sorry, you are in the ignore of bot':'Enter the command'))
}

const cmd = [Comp.client.commands.find(c => message.command.match(new RegExp(c.regex))), Comp.client.commands.find(c => message.command.match(new RegExp(c.engregex?c.engregex:c.regex)))]
if(Comp.client.ignores.includes(message.author.id) && (cmd[0].name && cmd[0].name!=='verify')) return message.react('⛔')
if(cmd[0] || cmd[1]) Comp.client.stats.cmds.total++, Comp.client.stats.cmds.perHour++
if (message.glang == 1 && cmd[0] && (!cmd[0].private || Comp.owners.find(i => i == message.author.id)) && cmd[0].run) cmd[0].uses+=1, cmd[0].run(message)
if (message.glang == 2 && cmd[1] && (!cmd[1].private || Comp.owners.find(i => i == message.author.id)) && cmd[1].run) cmd[1].uses+=1, cmd[1].run(message)

if(message.command.match(/(п[оа]м[оа]г[аи]й?)|помощь?/)) {
if(message.glang !== 1) return message.reply('this command allow only on :flag_ru: language, but for this guild will setting up an :flag_us: language.')
const arr = Comp.client.commands.filter(c => !c.hidden).map(cmd => `<:USSR:560858037041102858> **${Comp.client.prefixes[0]} ${cmd.name} ${cmd.args?`\`${cmd.args}\``:''} -** ${cmd.desc?cmd.desc:''} ${cmd.private? '(Требуется товарищ Сталин для её выполнения)' : ''}`)
arr.push(`<:USSR:560858037041102858> **${Comp.client.prefixes[0]} у-я ` + '`<язык>`' + ` -** Изменить язык`)
message.channel.send(arr.join('\n'))
}

if(message.command.match(/hel{1,}[pb]/)) {
if(message.glang !== 2) return message.reply('эта команда разрешена только на :flag_us: языке, но у этого сервера стоит :flag_ru: язык. Используйте к.помощь');
const arr = Comp.client.commands.filter(c => !c.hidden).map(cmd => `<:USSR:560858037041102858> **${Comp.client.prefixes[5]} ${cmd.engname} ${cmd.engargs?`\`${cmd.engargs}\``:''} -** ${cmd.engdesc?cmd.engdesc:(cmd.desc?cmd.desc:'')} ${cmd.private? '(Need comrade Stalin for run this command)' : ''}`);
arr.push(`<:USSR:560858037041102858> **${Comp.client.prefixes[5]} set-lang ` + '`<language>`' + ` -** Change a language`)
message.channel.send(arr.join('\n'))
}

if(message.command.match(/s(et)?(-)?lang(uage)?|у(ст[оа]н[ао]вить)?(-)?я(зы[кг])?/)) {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('вы не имеете права **Управление сервером**\nYou haven\'t got a permission **Manage guild**')
if(!message.args[0]) return message.reply('укажите язык\nPlease, provide a language')
let lag = message.args[0].toLowerCase()
if(!lag.match(/ru(s)?(sian)?|ру(с)?(ский)?|en(g)?(lish)?|ан(г)?(лийский)?/)) return message.reply('Languages: **ru**, **en**\nЯзыки: **рус**, **анг**')
else {
if(lag.match(/ru(s)?(sian)?|ру(с)?(ский)?/)) lag = 1
else lag = 2
if(!gld) gld = new (Comp.models.get('Guild'))({id: message.guild.id, lang: lag})
else gld.lang = lag
row.save()
if(lag == 1) message.reply('установлен :flag_ru: язык')
else message.reply('language will updated to :flag_us:')
}}
}