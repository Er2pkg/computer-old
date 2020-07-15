const Base = (require('discord.js')).Base
module.exports = class Locale extends Base {
constructor(client, data) {
super(client)
for(let i of Object.keys(data))
this[i] = data[i]
}}