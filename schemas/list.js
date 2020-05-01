module.exports = class List {
constructor(db) {
this.Discord = require('discord.js')
this.schemas = new Discord.Collection()
require('fs').readdir(__dirname, (err, data) => data.filter(i => !['list.js'].includes(i)).forEach(i => this.schemas.set(i.slice(0, -3), new (require('./'+i))(db) )))
return this.schemas
}}