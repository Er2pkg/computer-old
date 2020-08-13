module.exports = () => {
const structures = new (require('discord.js')).Collection,
s = [
'Command',
'CommandManager',
'Embed',
'Type',
'TypeManager',
]
s.forEach(i => structures.set(i, require('./'+i)))
return structures
}