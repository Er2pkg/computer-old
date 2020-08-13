module.exports.run = () => {

Core.log('DB', 'DB connection...')

Core.db.connect(process.env.MongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
delete process.env.MongoDB
if(err) Core.log('error', err)
Core.log('DB', 'DB connected'+(err?' !!!with error!!!':''))

Core.log('DB', 'DB init')

Core.DB = new Core.Collection
Core.FS.read('./src/models').then(a =>
a
.map(i=>require('../models/'+i)(Core.db))
.forEach((i,d)=>{
Core.DB.set(a[d].slice(0,-3), i)
Core.log('DB', 'Inited',a[d].slice(0,-3).space(6,'-'))
}))
.catch(e=>Core.emit('error',e))
})
}