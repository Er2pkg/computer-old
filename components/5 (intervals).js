const map = (u,x,p) => `${p+1}. ${(u||{}).tag||'unknown#0000'}${Comp.owners.get(x.id)?Comp.getEmoji('crown'):''} - ${Comp.getLvl(x.profile.xp)} lvl ${Comp.getRxp(x.profile.xp)}/${Comp.getLvlXp(x.profile.xp)} xp`,
pl = 15,
m = ['wait', 'unknown', 'copper']
module.exports.run = () => {
Comp.log('intervals', 'Interval module initialization...')

Comp.cmdPH = setInterval(() => {
Comp.client.stats.cmds.perHour = 0
Comp.client.user.setActivity(`${Comp.client.prefixes[7]}help | Computer ${Comp.beta?'Beta':'Stable'}`)
}, 3600000)

Comp.RS = setInterval(() => {
if(!Comp.client.stats) return
Comp.cpuse.usageAvg().then(i => Comp.client.stats.cpu = i)
Comp.client.stats.users = {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}
}, 5000)

Comp.cStat = setInterval(() => {
Comp.client.channels.cache.get('695980819650576384').messages.fetch(Comp.beta?'698508253205889144':'695981096202010654').then(msg => 
msg.edit(new Comp.Embed()
.setTitle(`${Comp.beta?'[BETA] ':''}Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL({format: 'png'}))
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ws.ping))} мс`, true)
.addField('ОЗУ', `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ГБ`, true)
.addField('Процессор', Comp.client.stats.cpu, true)
.addField('Команд', 'Всего: ' + Comp.client.commands.cache.size + '\nВидны и нет ограничения прав: ' + Comp.client.commands.cache.filter(c => !c.info.private && !c.info.hidden).size + '\nСтраниц в команде помощи: ' + Comp.addCommas(Math.ceil(Comp.client.commands.cache.filter(c => !c.info.hidden).size / 15)), true)
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
.setColor(Comp.beta?'BLURPLE':'00fff0')))
if(Comp.beta) return
Comp.client.channels.cache.get('695980819650576384').messages.fetch('735846116532158555').then(msg => {
Comp.DB.get('User').find({}).then(async i=> {
i = i
.sort((a,b)=>b.profile.xp-a.profile.xp)
.filter((x,p)=>x.profile.xp>0&&(p+1)<=pl)
i = await Promise.all(i.map((x, p) =>
Comp.client.users.fetch(x.id)
.then(u=>x=map(u,x,p))
.catch(e=>x=map({},x,p))
))
for(let x=0;x<m.length;x++)
i[x] = Comp.getEmoji(m[x]) + i[x].slice(2)
msg.edit(
new Comp.Embed()
.setColor('00fff0')
.addField('ТОП '+pl, i)
)
.catch(e =>msg.edit(new Comp.Embed().setColor('ff0055').setTitle('ОШИБКА').setDescription(e)))
})
.catch(e =>msg.edit(new Comp.Embed().setColor('ff0055').setTitle('ОШИБКА').setDescription(e)))
})
}, 15000)

Comp.log('intervals', 'Interval module was initialized')
}