module.exports.info = {
name: 'reload',
engname: 'reload',
regex: '/r[ei]loa[dt]/',
engregex: '/r[ei]loa[dt]/',
args: '[type (unrequired if command)] <file>',
engargs: '[type (unrequired if command)] <file>',
desc: 'reload',
engdesc: 'reload',
private: true
}
module.exports.run = message => {
let type, ged = 1, types = {cmd: ['command', 'cmd'], hndlrs: ['handler', 'hndlr']}
types.all = types.cmd.concat(types.hndlrs)
if(!types.all.includes(message.args[0])) type = 'cmd', ged = 0
else type = message.args[0]
Comp.fs.readdir('./'+(types.cmd.includes(type)?'cmds':'handlers'), (err, data) => {
let file = data.find(d => d.match(new RegExp(message.args[ged])))
try {delete require.cache[require.resolve(`../${types.cmd.includes(type)?'cmds':'handlers'}/${file}`)]
message.channel.send(`Перезагружен${types.cmd.includes(type)?'а команда':' хандлер'}${file.startsWith('r')&&types.hndlrs.includes(type)?' сообщений':''} ${file}`)}
catch (e) {message.channel.send(`Укажи нормальный файл для перезапуска..`)}
})}