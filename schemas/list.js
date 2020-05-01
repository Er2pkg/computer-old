module.exports = db => {
let Discord = require('discord.js'),
schemas = new Discord.Collection()
require('fs').readdir(__dirname, (err, data) => 
data.filter(i => !['list.js'].includes(i)).forEach(i => schemas.set(i.slice(0, -3), new (require('./'+i))(db) )))
return schemas
}