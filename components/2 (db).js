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

if(i == 'Locale') {
let locales = await Comp.models.get('Locale').find({})
locales.find(i => i.category == 'events').ru.gc = 'Спасибо за приглашение бота на сервер. Стандартный язык: :flag_ru:. Сменить язык можно командой prefixes0 у-я.\nThank you for inviting this bot. Standart language is :flag_ru:. Change the language can with command prefixes5 set-lang.\nP.S. Извиняемся, если я написал это не в нужный канал.\nP.S. Sorry, if I type this not in the right channel.\n'
Comp.locale = new (require('../structures/LocaleManager'))(locales)
Comp.locale.find = (m, c, l='ru') => Comp.locale.cache.get(m.toString())[l][c.toString()]
}

Comp.log('DB', 'Inited',i.space(6, '-'))
})})
}