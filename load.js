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
data.forEach(d => {
if(type == 'handlers' && d.startsWith('r')) 
this.msghandlers.push({
name: d.slice(1, -3),
path: './'+type+'/'+d,
run: message => require('./'+type+'/'+d).run(message)
}),
console.log('Loaded message handler', d.slice(1, -3)), i++
if(d.startsWith('-') || d.startsWith('r')) return
if(!d.startsWith('0'))
i++,
console.log('Loaded', type.slice(0, -1), d.slice(0, -3))
this[type].push({
name: d.slice(0, -3),
path: './'+type+'/'+d,
run: () => require('./'+type+'/'+d).run()
})
}); console.log('Loaded', i, type); this[type].forEach(h => h.run())
}))}}
global.Comp = new Comp()