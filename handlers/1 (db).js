module.exports.run = () => {

console.log('Подключение к БД...')

if(!Comp.devmode)
Comp.con = Comp.mysql.createConnection(Comp.db)

if(Comp.devmode) console.log('DB connect skipping')
else Comp.con.connect(err => {
if(err) console.log(err)
console.log('Подключен к БД'+(err?' !!!с ошибкой!!!':''))
})
}
