module.exports = db => {
let schemas = new (require('discord.js')).Collection()
require('fs').readdir(__dirname, (err, data) => data.filter(i => !['list.js'].includes(i)).forEach(i => schemas.set(i.slice(0, -3), require('./'+i)(db) )))
return schemas
})