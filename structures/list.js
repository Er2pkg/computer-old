let Discord = require('discord.js'),
structures = new Discord.Collection()
require('fs').readdir(__dirname, (err, data) => data.filter(i => !['list.js'].includes(i)).forEach(i => structures.set(i.slice(-3), require('./'+i))))
module.exports = structures