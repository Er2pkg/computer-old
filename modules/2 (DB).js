module.exports.run = () => {
console.log(Date.now(), ': :notredi:')
Comp.DB = {}
Comp.DBtables = {
'afkshit': 'AFK',
'ignores': 'Ignore',
'glangs': 'Lang',
'mutes': 'Mute',
'notes': 'Note',
'preds': 'Pred',
'xp': 'XP',
}
Object.keys(Comp.DBtables).forEach(i => Comp.DB[i] = new Comp.Discord.Collection())
Comp.classes = {}
Comp.fs.readdir('./classes', (err, data) => {if(err) throw err; data.forEach(d => Comp.classes[d.slice(0, -3)] = require('../classes/'+d))})
Object.keys(Comp.DBtables).forEach(t =>
Comp.db.query('SELECT * FROM '+(t=='glangs'?'lang':(t=='mutes'?'zamuchen':(t=='preds'?'pred':t))), (err, rows) => {
if(err) throw err
rows.forEach(i => {
let key = i.id?i.id:0, val = Comp.DBtables[t]
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
Comp.DB[t].set(key, new Comp.classes[val](i))
})}))
console.log(Date.now(), ': :redi:')
}