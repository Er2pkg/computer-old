module.exports.run = () => {
console.log('DB init')
const Collection = Comp.Discord.Collection
Comp.Collection = Collection
Comp.DBid = (i, t) => {
let key = i.id?i.id:0
if(['notes'].includes(t)) key = i.user+'_'+i.id
if(['mutes'].includes(t)) key = i.guild+'_'+i.id
return key
}
//Comp.DB = new Collection()
Comp.models = new Collection()
Comp.schemas = require('../schemas/list')(Comp.db)
Comp.schemas.keyArray().forEach(i => {
Comp.models.set(i, Comp.db.model(i, Comp.schemas.get(i)))

console.log('DB loaded',t)
})
console.log('DB inited')
}