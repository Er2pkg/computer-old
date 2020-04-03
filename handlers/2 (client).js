module.exports.run = () => {

console.log('Инициализация клиента...')

Comp.fs.readdir('./events', (err, data) => {
let i = 0
if(err) throw err
data.forEach(event => {
if(event.startsWith('-')) return
i++
console.log('Загружен ивент', event.slice(0,-3))
Comp.client.on((event.slice(0, -3)), (a, b) => require('../events/'+event).run(a, b))
}); console.log('Загружено', i, Comp.declOfNum(i, ['ивент', 'ивента', 'ивентов'])) })

console.log('Клиент инициализирован')

}
