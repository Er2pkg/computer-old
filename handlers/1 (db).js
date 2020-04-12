module.exports.run = () => {

console.log('Подключение к БД...')

if(!Comp.devmode) {
Comp.db = Comp.mysql.createConnection(Comp.db)
Comp.con = Comp.db // "symlink"
}

if(Comp.devmode) console.log('DB connect skipping')
else Comp.db.connect(err => {
if(err) console.log(err)
console.log('Подключен к БД'+(err?' !!!с ошибкой!!!':''))
})
}
