module.exports.run = () => {

console.log('Запуск модуля интервалов...')

Comp.cmdPH = setInterval(() => Comp.client.stats.cmds.perHour = 0, 3600000)

Comp.devmode?console.log('Random status skipping'):Comp.RS = setInterval(() => {
Comp.client.stats.users = {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}
let i = 0,
status = [`ЭВМ им. Сталина.`, `${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.activities[0].name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}, 5000)

/*14*/ Comp.devmode?console.log('Auto status skipping'):Comp.cStat = setInterval(() =>
Comp.client.channels.cache.get('695980819650576384').messages.fetch('698508253205889144').then(msg => 
msg.edit(new Comp.Discord.MessageEmbed()
.setTitle(`Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL({format: 'png'}))
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ws.ping))} мс`, true)
.addField('ОЗУ', `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ГБ`, true)
.addField('Команд', 'Всего: ' + Comp.client.commands.length + '\nДоступных всем: ' + Comp.client.commands.filter(c => !c.private && !c.hidden).length + '\nСтраниц в команде помощи: ' + Comp.addCommas(Math.ceil(Comp.client.commands.filter(c => !c.private && !c.hidden).length / 15)), true)
.addField('Использованных команд', Comp.addCommas(Comp.client.stats.cmds.total), true)
.addField('Команды за час', Comp.addCommas(Comp.client.stats.cmds.perHour), true)
.addField('Сообщений', Comp.addCommas(Comp.client.stats.msgs), true)
.addField('Товарищей', Comp.addCommas(Comp.client.users.cache.size) + ` всего (${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}, ${Comp.declOfNum(Comp.client.stats.users.bots, ['бот', 'бота', 'ботов'], 1)})`, true)
.addField('Каналов', Comp.addCommas(Comp.client.channels.cache.size), true)
.addField('Серверов', Comp.addCommas(Comp.client.guilds.cache.size), true)
.addField('Эмодзи', Comp.addCommas(Comp.client.emojis.cache.size), true)
.addField('Включенные голосовые каналы', Comp.addCommas(Comp.client.voice.connections.size), true)
.addField('Работает', `${Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ['час', 'часа', 'часов'], 1)} и ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ['минуту', 'минуты', 'минут'], 1)}`, true)
.addField('Включен',Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}) + ' MSK', true)
.addField('Московское время', new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3), true)
//.addField(`Последний коммит`, '...', true)
.setColor('00fff0'))), 15000)

Comp.devmode?console.log('DB interval skipping'):Comp.intDB = setInterval(() => {
Comp.client.guilds.cache.forEach(g => {
let role = g.roles.cache.find(r => r.name.match(/[Mm]ut[ei][dt]|Замученные/))
if(!role) return
g.members.cache.forEach(m => {
Comp.con.query(`SELECT * FROM zamuchen WHERE guild=${g.id} AND id=${m.id}`, (err, rows) => {
let inmute = (rows&&rows[0]?rows[0].inmute:0)
if(inmute === 1 && rows && rows[0] && rows[0].unmute_time && rows[0].unmute_time <= Date.now()) inmute = 0, Comp.con.query(`DELETE FROM zamuchen WHERE id=${m.id} AND guild=${g.id}`), console.log('unmute')
if(inmute === 0 && rows && rows[0] && rows[0].unmute_time && rows[0].unmute_time > Date.now()) inmute = 1, Comp.con.query(`UPDATE zamuchen SET inmute=1, reason='${rows[0].reason?rows[0].reason+'\nauto fix':'auto fix'}', mute_time=${Date.now()} WHERE id=${m.id} AND guild=${g.id}`), console.log('mute')
if(inmute == 0 && m.roles.cache.has(role.id)) m.roles.remove(role.id).catch(() => console.log('fuck')), console.log('remove role')
if(inmute == 1 && !m.roles.cache.has(role.id)) m.roles.add(role.id).catch(() => console.log('fuck')), console.log('add role') 
})})})
Comp.client.users.cache.forEach(u => u.bot?'':Comp.con.query(`SELECT * FROM pred WHERE id = ${u.id}`, (err, rows) => {
if(rows.length < 1) Comp.con.query(`INSERT INTO pred (id) VALUES (${u.id})`)
}))
Comp.client.users.cache.forEach(u => u.bot?'':Comp.con.query(`SELECT * FROM ignores WHERE id = ${u.id}`, (err, rows) => {
if(rows.length < 1) Comp.con.query(`INSERT INTO ignores (id, time, reason) VALUES (${u.id}, '', '')`)
}))}, 5000)

Comp.devmode?console.log('DB sync skipping'):Comp.DBs = setInterval(() => {
Object.keys(Comp.DBtables).forEach(t =>
Comp.db.query('SELECT * FROM '+(t=='glangs'?'lang':(t=='mutes'?'zamuchen':(t=='preds'?'pred':t))), (err, rows) => {
if(err) throw err
rows.forEach(i => {
let key = i.id?i.id:0, val = Comp.DBtables[t]
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
const k = Comp.DB[t].get(key)
})}))
}, 3000/*00*/)

console.log('Модуль интервалов запущен')
}