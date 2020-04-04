module.exports.run = () => {

console.log('Запуск клиента...')

Comp.client.prefixes = ['товарищ', 'таварищ', 'таварищь', 'товарищь', `<@${Comp.client.user.id}>`, 'comrade', 'comrad']
Comp.client.stalinguild = Comp.client.guilds.get('560681320431222842')
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ЭВМ им. Сталина.`)

Comp.client.stats = {cmds: {total: 0, perHour: 0}, msgs: 0}
Comp.client.glangs = []
Comp.client.ignores = []
Comp.client.commands = []

setInterval(() => Comp.client.stats.cmds.perHour = 0, 3600000)

Comp.client.rstatus = () => {
let i = 0,
status = [`ЭВМ им. Сталина.`, `${Comp.declOfNum(Comp.client.stalinguild.members.filter(member => !member.user.bot).size, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.game.name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}

setInterval(() => Comp.client.rstatus(), 5000)

setInterval(() =>
Comp.client.channels.get('695980819650576384').fetchMessage('695981096202010654').then(msg => 
msg.edit(new Comp.Discord.RichEmbed()
.setTitle(`Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL)
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ping))} мс`, true)
.addField('ОЗУ', `${Comp.addCommas(Math.round(process.memoryUsage().rss / 1024 / 1024 ))} / 512 МБ`, true)
.addField('Команд', 'Всего: ' + Comp.commands.length + '\nДоступных всем: ' + Comp.commands.filter(c => !c.private && !c.hidden).length + '\nСтраниц в команде помощи: ' + Comp.declOfNum(Math.ceil(Comp.commands.filter(c => !c.private && !c.hidden).length / 15), ['страница', 'страницы', 'страниц'], 1), true)
.addField('Использованных команд', Comp.addCommas(Comp.client.stat.cmds.total), true)
.addField('Команды за час', Comp.addCommas(Comp.client.stats.cmds.perHour), true)
.addField('Сообщений', Comp.addCommas(Comp.client.stats.msgs), true)
.addField('Товарищей', Comp.addCommas(Comp.client.users.size), true)
.addField('Каналов', Comp.addCommas(Comp.client.channels.size), true)
.addField('Серверов', Comp.addCommas(Comp.client.guilds.size), true)
.addField('Эмодзи', Comp.addCommas(Comp.client.emojis.size), true)
.addField('Включенные голосовые каналы', Comp.addCommas(Comp.client.voiceConnections.size), true)
.addField('Работает', `${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60 * 60)), ['час', 'часа', 'часов'], 1)} и ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ['минута', 'минуты', 'минут'], 1)}`, true)
.addField('Включен',Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}) + ' MSK', true)
.addField('Московское время', new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3), true)
//.addField(`Последний коммит`, '...', true)
.setColor('00fff0'))), 15000)

setInterval(() => {
Comp.client.guilds.forEach(g =>
g.members.forEach(m => {
let role = m.guild.roles.find(r => r.name.match(/[Mm]ut[ei][dt]|Замученные/))
if(!role) return
Comp.con.query(`SELECT * FROM zamuchen WHERE guild=${g.id} AND id=${m.id}`, (err, rows) => {
let inmute = (rows&&rows[0]?rows[0].inmute:0)
if(inmute === 1 && rows && rows[0] && rows[0].unmute_time && rows[0].unmute_time <= Date.now()) inmute = 0, Comp.con.query(`DELETE FROM zamuchen WHERE id=${m.id} AND guild=${g.id}`), console.log('unmute')
if(inmute === 0 && rows && rows[0] && rows[0].unmute_time && rows[0].unmute_time > Date.now()) inmute = 1, Comp.con.query(`UPDATE zamuchen SET inmute=1, reason='${rows[0].reason?rows[0].reason+'\nauto fix':'auto fix'}', mute_time=${Date.now()} WHERE id=${m.id} AND guild=${g.id}`), console.log('mute')
if(inmute == 0 && m.roles.has(role.id)) m.removeRole(role.id), console.log('remove role')
if(inmute == 1 && !m.roles.has(role.id)) m.addRole(role.id), console.log('add role') 
})}))
Comp.client.users.forEach(u => u.bot?'':Comp.con.query(`SELECT * FROM pred WHERE id = ${u.id}`, (err, rows) => {
if(rows.length < 1) Comp.con.query(`INSERT INTO pred (id) VALUES (${u.id})`)
}))
Comp.client.users.forEach(u => u.bot?'':Comp.con.query(`SELECT * FROM ignores WHERE id = ${u.id}`, (err, rows) => {
if(rows.length < 1) Comp.con.query(`INSERT INTO ignores (id, time, reason) VALUES (${u.id}, '', '')`)
}))}, 5500)

Comp.con.query(`SELECT * FROM lang`, (err, rows) => {
for (let i = 0; i < Comp.client.guilds.size; i++) {
console.log(rows[i].id, '-', (rows[i].lang || 1))
Comp.client.glangs.push({
gid: rows[i].id,
lang: rows[i].lang || 1,
})}})

Comp.fs.readdir('./cmds', (err, cmds) => {
let i = 0
if (err) throw err
cmds.forEach(comad => {
if(comad.startsWith('-')) return
i++
const cmmd = require(`../cmds/${comad}`)
Comp.client.commands.push({
name: cmmd.info.name,
engname: cmmd.info.engname || cmmd.info.name,
regex: cmmd.info.regex.toString().slice(1, -1),
engregex: cmmd.info.engregex.toString().slice(1, -1),
args: cmmd.info.args,
engargs: cmmd.info.engargs,
desc: cmmd.info.desc,
engdesc: cmmd.info.engdesc,
run: message => require('../cmds/'+comad).run(message, Comp.ruen[message.lang][(cmmd.info.engname?cmmd.info.engname:cmmd.info.name).toLowerCase()]),
engrun: cmmd.engrun || cmmd.run,
private: cmmd.info.private || false,
hidden: cmmd.info.hidden || false,
uses: 0
})
console.log('Загружена команда', (cmmd.info.engname || cmmd.info.name))
})
Comp.client.commands.push({regex: 's(et)?(-)?lang(uage)?|у(ст[оа]н[ао]вить)?(-)?я(зы[кг])?', hidden: true, uses: 0})
Comp.client.commands.push({regex: 'п[оа]м[оа]г[аи]й?|hel{1,}[pb]', hidden: true, uses: 0})
console.log('Загружено', i, Comp.declOfNum(i, ['команда', 'команды', 'команд']))
})

console.log('Клиент запущен')
}