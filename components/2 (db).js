module.exports.run = () => {

console.log('Подключение к БД...')

if(Comp.devmode) console.log('DB connect skipping')
else Comp.db.connect(process.env.MongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
delete process.env.MongoDB
if(err) console.log(err)
console.log('Подключен к БД'+(err?' !!!с ошибкой!!!':''))

console.log('——DB—init')
const Collection = Comp.Collection

Comp.DB = new Collection()
Comp.models = new Collection()
Comp.schemas = new Collection()
Comp.DBtables.forEach(i => {
Comp.schemas.set(i, require('../schemas/'+i)(Comp.db))
Comp.models.set(i, Comp.db.model(i, Comp.schemas.get(i)))
Comp.DB.set(i, Comp.models.get(i))

console.log('—'+i.space(8,'-','—'))
})})
}