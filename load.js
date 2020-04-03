class Comp {
constructor() {
this.fs = require('fs')
this.handlers = []
this.msghandlers = []
this.fs.readdir('./handlers', (err, data) => {
let i = 0
if(err) throw err
data.forEach(handler => {
if(handler.startsWith('r')) 
this.msghandlers.push({
name: handler.slice(1, -3),
path: './handlers/'+handler,
run: (message, glang) => require('./handlers/'+handler).run(message, glang)
}),
console.log('Загружен хандлер сообщений', handler.slice(1, -3)), i++
if(handler.startsWith('-') || handler.startsWith('r')) return
if(!handler.startsWith('0'))
i++,
console.log('Загружен хандлер', handler.slice(0, -3).split(' ')[0], handler.slice(0, -3).split(' ')[1])
this.handlers.push({
name: handler.slice(0, -3),
path: './handlers/'+handler,
run: () => require('./handlers/'+handler).run()
})
}); console.log('Загружено', i, ['хандлер', 'хандлера', 'хандлеров'][(i % 100 > 4 && i % 100 < 20)?2:[2, 0, 1, 1, 1, 2][(i % 10 < 5)?i % 10 : 5]])
this.handlers.forEach(h => h.run())
})}}
global.Comp = new Comp()
