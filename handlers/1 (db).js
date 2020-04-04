module.exports.run = () => {

console.log('Подключение к БД...')

Comp.con = Comp.mysql.createConnection(Comp.db)

Comp.con.connect(err => {
if(err) console.log(err)
console.log('Подключен к БД'+(err?' !!!с ошибкой!!!':''))
})
}
