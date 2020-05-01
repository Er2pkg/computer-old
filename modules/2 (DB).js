module.exports.run = () => {
console.log('DB init')
const Collection = Comp.Discord.Collection
Comp.Collection = Collection
Comp.DBtables = [
'AFK', 'Ignore', 'Lang',
'Mute', 'Note', 'Pred',
'XP',
]
Comp.DBid = (i, t) => {
let key = i.id?i.id:0
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
return key
}
//Comp.DB = new Collection()
Comp.models = new Collection()
Comp.schemas = new Collection()
Comp.DBtables.forEach(i => {
Comp.schemas.set(i, new (require('../schemas/'+i))(Comp.db))
Comp.models.set(i, Comp.db.model(i, Comp.schemas.get(i)))

console.log('DB loaded',t)
})
console.log(Comp.schemas)
console.log('DB inited')
}