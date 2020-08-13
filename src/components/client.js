module.exports.run = () => {

Core.log('client', 'Client initialization...')

Core.FS.read('./src/events').then(data => {
let i = 0
for(let e of data.filter(i=>!i.startsWith('-')))
i++,
Core.on((e.slice(0, -3)), require('../events/'+e).run),
Core.log('client', 'Loaded event', e.slice(0,-3))
Core.log('client', 'Loaded', i, 'events')
}).catch(e=>Core.emit('error',e))

Core.log('client', 'Client was initialized')
}