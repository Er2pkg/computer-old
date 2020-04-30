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
Comp.DBid = (i, t) => {
let key = i.id?i.id:0
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
return key
}
Comp.DB = {}
Comp.DBB = new Comp.Discord.Collection()
Comp.structures = {}
Object.keys(Comp.DBtables).forEach(i => Comp.DB[i] = new Comp.Discord.Collection())
Object.values(Comp.DBtables).forEach(i => Comp.structures[i] = require('../structures/'+i))
Comp.classes = Comp.structures

const BManager = require('discord.js').BaseManager
class BaseManager extends BManager {
constructor(rows, manager) {
super(Comp.client, rows, (typeof manager == 'string'?Comp.structures[manager]:manager))
}
}
Comp.BaseManager = BaseManager

Object.keys(Comp.DBtables).forEach(t =>
Comp.db.query('SELECT * FROM '+t, (err, rows) => {
if(err) throw err
rows.forEach(i => {
let key = Comp.DBid(i, t), val = Comp.DBtables[t]
i.id = key
Comp.DB[t].set(key, new Comp.structures[val]('', i))
})
Comp.DBB.set(Comp.DBtables[t]+'Manager', new Comp.BaseManager(rows, Comp.DBtables[t]))
console.log('DB loaded',t)
}))
console.log('DB inited')
}