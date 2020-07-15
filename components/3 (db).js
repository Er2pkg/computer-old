module.exports.run = () => {

Comp.log('DB', 'DB connection...')

if(Comp.devmode) console.log('DB connect skipping')
else Comp.db.connect(process.env.MongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
delete process.env.MongoDB
if(err) console.log(err)
Comp.log('DB', 'DB connected'+(err?' !!!with error!!!':''))

Comp.log('DB', 'DB init')
const Collection = Comp.Collection

Comp.DB = new Collection()
Comp.models = new Collection()
Comp.schemas = new Collection()
Comp.DBtables.forEach(async i => {
Comp.schemas.set(i, require('../schemas/'+i)(Comp.db))
Comp.models.set(i, Comp.db.model(i, Comp.schemas.get(i)))
Comp.DB.set(i, Comp.models.get(i))

Comp.log('DB', 'Inited',i.space(6, '-'))
})})
}