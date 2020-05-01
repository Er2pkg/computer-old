module.exports.run = () => {

console.log('Запуск модуля интервалов...')

Comp.cmdPH = setInterval(() => Comp.client.stats.cmds.perHour = 0, 3600000)

Comp.devmode?console.log('Random status skipping'):Comp.RS = setInterval(() => {
if(!Comp.client.stats) return
Comp.cpuse.usageAvg().then(i => Comp.client.stats.cpu = i)
Comp.client.stats.users = {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}
let i = 0,
status = [`ЭВМ ${Comp.beta?'бета':'им. Сталина.'}`, `${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.activities[0].name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}, 5000)

Comp.devmode?console.log('Auto status skipping'):Comp.cStat = setInterval(() =>
Comp.client.channels.cache.get('695980819650576384').messages.fetch(Comp.beta?'698508253205889144':'695981096202010654').then(msg => 
msg.edit(new Comp.Discord.MessageEmbed()
.setTitle(`${Comp.beta?'[BETA] ':''}Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL({format: 'png'}))
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ws.ping))} мс`, true)
.addField('ОЗУ', `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ГБ`, true)
.addField('Процессор', Comp.client.stats.cpu, true)
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
let role = g.roles.cache.find(r => r.name.toLowerCase().match(/(mut[ei]?)[dt]|замучен{1,}ые/))
if(!role) return
g.members.cache.forEach(m => {
const row = Comp.DB.mutes.get(g.id+'_'+m.id)
let inmute = (row && row.inmute?row.inmute:0)
if(row && row._deleted) inmute = 0
if(inmute == 1 && row && row.unmute_time && row.unmute_time <= Date.now()) inmute = 0, row._deleted = true, console.log('unmute')
if(inmute == 0 && row && !row._deleted && row.unmute_time && row.unmute_time > Date.now()) inmute = 1, row.inmute=1, row.reason=(row.reason?row.reason+'\nauto fix':'auto fix'), row.mute_time=Date.now(), console.log('mute')
if(inmute == 0 && m.roles.cache.has(role.id)) m.roles.remove(role.id).catch(() => console.log('fuck')), console.log('remove role')
if(inmute == 1 && !m.roles.cache.has(role.id)) m.roles.add(role.id).catch(() => console.log('fuck')), console.log('add role') 
})})

Comp.client.users.cache.forEach(u => u.bot?'':Comp.DB.preds.get(u.id)?'':Comp.DB.preds.set(u.id, new (Comp.structures.get('Pred'))('', {id: u.id})))
Comp.client.users.cache.forEach(u => u.bot?'':Comp.DB.ignores.get(u.id)?'':Comp.DB.ignores.set(u.id, new (Comp.structures.get('Ignore'))('', {id: u.id})))
}, 5000)

Comp.devmode?console.log('DB sync skipping'):Comp.DBs = setInterval(() => {
console.log('sync DB')
Object.keys(Comp.DBtables).forEach(t =>
Comp.db.query('SELECT * FROM '+t, (err, rows) => {
if(err) throw err
rows.forEach(i => {
let key = Comp.DBid(i, t),
type,
keyz = (key.split('_')[1]?key.split('_'):[0, key]),
row = Comp.DB[t].get(key)
oldDB = Object.values(i), newDB = Object.values(row || []), keys = Object.keys(row || []).filter(k => !['_', 'iid', 'idn', 'id'].find(i => k.startsWith(i))), unmatches = []
if(newDB.length > 0 && keys.length > 0) oldDB.forEach((o, ind) => newDB[ind] !== o?unmatches.push({index: ind, key: keys[ind]}):'')
if(unmatches) unmatches = unmatches.filter(i => i.key)
if(newDB.length > 0 && row && row._deleted) type = 'delete'
else if(unmatches.length > 0 && newDB.length > 0 && !row._deleted) type = 'update'
else if(newDB.length < 1) type = 'insert'
console.log(['oldDB:', oldDB, 'newDB:', newDB, 'keys:', keys, 'keyz:', keyz, 'unmatches:', unmatches, 'type:', type])
if(type == 'delete') {Comp.DB[t].delete(key); Comp.db.query(`DELETE FROM ${t} WHERE id = ${keyz[1]+(i.guild?' AND guild = '+i.guild:'')}`)}
if(type == 'update') Comp.db.query(`UPDATE ${t} SET ${unmatches.map(i => i.key+' = \''+newDB[i.index]+'\'').join(', ')} WHERE id = '${keyz[1]+(i.guild?('\' AND guild = \''+i.guild):'')}'`)
if(type == 'insert') Comp.db.query(`INSERT INTO ${t} (${keys.join(', ')}) '${newDB.join('\', \'')}`)
})}))
console.log('sync DB completed')
}, 120000)

console.log('Модуль интервалов запущен')
}