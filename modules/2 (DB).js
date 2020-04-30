module.exports.run = () => {
console.log('DB init')
Comp.DBtables = {
'afkshit': 'AFK',
'ignores': 'Ignore',
'glangs': 'Lang',
'mutes': 'Mute',
'notes': 'Note',
'preds': 'Pred',
'xp': 'XP',
}
Comp.DB = {}
Comp.structures = {}
Object.keys(Comp.DBtables).forEach(i => Comp.DB[i] = new Comp.Discord.Collection())
Object.values(Comp.DBtables).forEach(i => Comp.structures[i] = require('../structures/'+i))
Comp.classes = Comp.structures

Object.keys(Comp.DBtables).forEach(t =>
Comp.db.query('SELECT * FROM '+t, (err, rows) => {
if(err) throw err
rows.forEach(i => {
let key = i.id?i.id:0, val = Comp.DBtables[t]
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
Comp.DB[t].set(key, new Comp.structures[val]('', i))
})
console.log('DB loaded',t)
}))
console.log('DB inited')
}