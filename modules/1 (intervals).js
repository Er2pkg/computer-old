module.exports.run = () => {

console.log('Запуск модуля интервалов...')

Comp.cmdPH = setInterval(() => Comp.client.stats.cmds.perHour = 0, 3600000)

Comp.RS = setInterval(() => {
let i = 0,
status = [`ЭВМ им. Сталина.`, `${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.game.name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}, 5000)

Comp.cStat = setInterval(() =>
Comp.client.channels.get('695980819650576384').fetchMessage('695981096202010654').then(msg => 
msg.edit(new Comp.Discord.RichEmbed()
.setTitle(`Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL)
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ping))} мс`, true)
.addField('ОЗУ', `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ГБ`, true)
.addField('Команд', 'Всего: ' + Comp.client.commands.length + '\nДоступных всем: ' + Comp.client.commands.filter(c => !c.private && !c.hidden).length + '\nСтраниц в команде помощи: ' + Comp.addCommas(Math.ceil(Comp.client.commands.filter(c => !c.private && !c.hidden).length / 15)), true)
.addField('Использованных команд', Comp.addCommas(Comp.client.stats.cmds.total), true)
.addField('Команды за час', Comp.addCommas(Comp.client.stats.cmds.perHour), true)
.addField('Сообщений', Comp.addCommas(Comp.client.stats.msgs), true)
.addField('Товарищей', Comp.addCommas(Comp.client.users.size) + ` всего (${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}, ${Comp.declOfNum(Comp.client.stats.users.bots, ['бот', 'бота', 'ботов'], 1)})`, true)
.addField('Каналов', Comp.addCommas(Comp.client.channels.size), true)
.addField('Серверов', Comp.addCommas(Comp.client.guilds.size), true)
.addField('Эмодзи', Comp.addCommas(Comp.client.emojis.size), true)
.addField('Включенные голосовые каналы', Comp.addCommas(Comp.client.voiceConnections.size), true)
.addField('Работает', `${Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ['час', 'часа', 'часов'], 1)} и ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ['минуту', 'минуты', 'минут'], 1)}`, true)
.addField('Включен',Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}) + ' MSK', true)
.addField('Московское время', new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3), true)
//.addField(`Последний коммит`, '...', true)
.setColor('00fff0'))), 15000)

Comp.intDB = setInterval(() => {
Comp.client.stats.users = {users: Comp.client.users.filter(u => !u.bot).size, bots: Comp.client.users.filter(u => u.bot).size}
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

console.log('Модуль интервалов запущен')
}