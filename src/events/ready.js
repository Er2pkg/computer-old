module.exports.run = async () => {

Core.log('client', 'Logged on as '+Core.client.user.tag)

//SDC
if(!Core.beta) {
let SDC = new (require('../../etc/sdc-api'))(process.env.SDCtoken)
delete process.env.SDCtoken
if(SDC.setAutoPost)
SDC.setAutoPost(Core)
}

let pref = {
'beta': ['beta', 'b.', 'б.', 'бю', 'бета'],
'rel': ['comp', 'c.', 'к.', 'кю', 'комп'],
}

Core.prefixes = [...(Core.beta?pref.beta:pref.rel), `<@${Core.user.id}>`, `<@!${Core.user.id}>`]
Core.user.setActivity(`${Core.prefixes[1]}help | Computer ${Core.beta?'Beta':'Stable'}`)

Core.cpuse.usageAvg().then(i =>
Core.stats = {cmds: {total: 0, perHour: 0}, users: {users: Core.users.cache.filter(u => !u.bot).size, bots: Core.users.cache.filter(u => u.bot).size}, msgs: 0, cpu: i})

Core.FS.read('./src/cmds').then(cmds => {
Core.commands = 
new (require('../structures/CommandManager'))
(cmds.filter(i => !i.startsWith('-')).map(i => require('../cmds/'+i)))
let i=Core.client.commands.cache.size
Core.log('commands', 'Loaded', i, 'commands')
}).catch(e=>Core.emit('error',e))

Core.log('client', 'Client was loaded')
}