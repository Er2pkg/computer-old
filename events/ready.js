module.exports.run = async () => {

Comp.log('client', 'Logged on as '+Comp.client.user.tag)
Comp.log('client', 'Client loading...')

//SDC
if(!Comp.beta) {
Comp.SDC = new (require('@megavasiliy007/sdc-api'))(process.env.SDCtoken)
delete process.env.SDCtoken
Comp.SDC.setAutoPost(Comp.client)
}

Comp.client.prefixes = Comp.beta?['бета', 'бэта', 'бето', 'бэто', `<@${Comp.client.user.id}>`, 'beta', 'beto', 'b.', 'б.', 'бю', `<@!${Comp.client.user.id}>`]:['комп', 'комб', 'компутер', 'компутатор', `<@${Comp.client.user.id}>`, 'comp', 'comb', 'c.', 'к.', 'кю', `<@!${Comp.client.user.id}>`]
Comp.client.user.setActivity(`${Comp.client.prefixes[7]}help | Computer ${Comp.beta?'Beta':'Stable'}`)

Comp.cpuse.usageAvg().then(i =>
Comp.client.stats = {cmds: {total: 0, perHour: 0}, users: {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}, msgs: 0, cpu: i})

Comp.fs.readdir('./cmds', (a,cmds) => {
let cmdz = cmds.filter(i => !i.startsWith('-')).map(i => require('../cmds/'+i))
Comp.client.commands = new (require('../structures/CommandManager'))(cmdz)
let i=Comp.client.commands.cache.size
Comp.log('commands', 'Loaded', i, 'commands')
})

Comp.log('client', 'Client was loaded')
}