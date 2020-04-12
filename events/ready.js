module.exports.run = () => {

console.log('Запуск клиента...')

//SDC
if(!Comp.beta) {
Comp.SDC = require("@megavasiliy007/sdc-api")
Comp.SDC = new Comp.SDC(process.env.SDCtoken)
delete process.env.SDCtoken
if(Comp.devmode) console.log('SDC monitoring skipping')
else Comp.SDC.setAutoPost(Comp.client)
}

Comp.client.prefixes = Comp.beta?['бета', 'бэта', 'бето', 'бэто', `<@${Comp.client.user.id}>`, 'beta', 'beto', 'b.', 'б.', 'бю']:['товарищ', 'таварищ', 'таварищь', 'товарищь', `<@${Comp.client.user.id}>`, 'comrade', 'comrad', 'c.', 'к.', 'кю']
Comp.devmode?'':Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ЭВМ ${Comp.beta?'бета':'им. Сталина.'}`)

Comp.client.stats = {cmds: {total: 0, perHour: 0}, users: {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}, msgs: 0}
Comp.client.ignores = []
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
engregex: cmmd.info.engregex?cmmd.info.engregex.toString().slice(1, -1):'',
args: cmmd.info.args,
engargs: cmmd.info.engargs,
desc: cmmd.info.desc,
engdesc: cmmd.info.engdesc,
run: message => require('../cmds/'+comad).run(message, Comp.locales[message.lang][(cmmd.info.engname?cmmd.info.engname:cmmd.info.name).toLowerCase()]),
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