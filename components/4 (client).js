module.exports.run = () => {

Comp.log('client', 'Client initialization...')

Comp.fs.readdir('./events', (err, data) => {
let i = 0
if(err) throw err
data.filter(i=>!i.startsWith('-')).forEach(event => {
i++
console.log('[   client] Loaded events', event.slice(0,-3))
Comp.client.on((event.slice(0, -3)), require('../events/'+event).run)
}); console.log('[   client] Loaded', i, 'events') })

Comp.log('client', 'Client was initialized')
}
