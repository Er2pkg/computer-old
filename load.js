class Comp {
constructor() {
this.fs = require('fs')
this.handlers = []
this.msghandlers = []
this.modules = []
this.ltypes = ['handlers', 'modules']
this.ltypes.forEach(type =>
this.fs.readdir('./'+type, (err, data) => {
console.log('Starting', type)
let i = 0
if(err) throw err
if(type == 'modules') data.forEach(module => {this.modules.push({name: module.slice(0, -3), path: './modules/'+module, run: () => require('./modules/'+module).run() }); return this.modules.forEach(m => m.run())})
else data.forEach(handler => {
if(handler.startsWith('r')) 
this.msghandlers.push({
name: handler.slice(1, -3),
path: './handlers/'+handler,
run: message => require('./handlers/'+handler).run(message)
}),
console.log('Loaded message handler', handler.slice(1, -3)), i++
if(handler.startsWith('-') || handler.startsWith('r')) return
if(!handler.startsWith('0'))
i++,
console.log('Loaded handler', handler.slice(0, -3).split(' ')[0], handler.slice(0, -3).split(' ')[1])
this.handlers.push({
name: handler.slice(0, -3),
path: './handlers/'+handler,
run: () => require('./handlers/'+handler).run()
})
}); if(type == 'handlers') {console.log('Loaded', i, 'handlers'); this.handlers.forEach(h => h.run())}
}))
}}
global.Comp = new Comp()
