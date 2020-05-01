module.exports.run = () => {

console.log('Подключение к БД...')

if(Comp.devmode) console.log('DB connect skipping')
else Comp.db.connect(process.env.MongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
delete process.env.MongoDB
if(err) console.log(err)
console.log('Подключен к БД'+(err?' !!!с ошибкой!!!':''))
})
}
