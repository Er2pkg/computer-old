module.exports.run = () => {

console.log('Запуск клиента...')

Comp.client.prefixes = ['товарищ', 'таварищ', 'таварищь', 'товарищь', `<@${Comp.client.user.id}>`, 'comrade', 'comrad']
Comp.client.stalinguild = Comp.client.guilds.get('560681320431222842')
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ЭВМ им. Сталина.`)

Comp.client.glangs = []
Comp.client.ignores = []

Comp.client.rstatus = () => {
let i = 0,
status = [`ЭВМ им. Сталина.`, `${Comp.declOfNum(Comp.client.stalinguild.members.filter(member => !member.user.bot).size, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.game.name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}

setInterval(() => Comp.client.rstatus(), 5000)

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

Comp.client.commands = []

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