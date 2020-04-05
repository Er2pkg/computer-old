module.exports.run = () => {

console.log('Инициализация переменных...')

Comp.db = {
host: process.env.DBhost,
user: process.env.DBuser,
password: process.env.DBpass,
database: process.env.DBuser,
}
Comp.os = require('os')
Comp.Discord = require("discord.js")
Comp.client = new Comp.Discord.Client({disableEveryone: true})
Comp.mysql = require('mysql2')
Comp.jimp = require('jimp')
Comp.fs = require('fs')
Comp.locales = require('../locales.json')
Comp.warnedFlood = new Set()
Comp.unxp = new Set()
Comp.muted = '561165692896804895'

Comp.client.login(process.env.ClientToken).then(() => delete process.env.ClientToken).catch()

Comp.owners = {
'stalin': '544031928358273045',
'lenin': '441954631539490857',
}

Comp.xpFormule = lvl => (5 * (lvl ^ 2) + 50 * lvl + 100)
Comp.send = (id, message) => id.send(message)
Comp.addCommas = int => `${int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
Comp.random = (min, max) => Math.floor(Math.random()*(max-min+1))+min
Comp.declOfNum = (number, titles, hmm) => (hmm && hmm == 1?Comp.addCommas(number)+' ':'') + titles[(number % 100 > 4 && number % 100 < 20)?2:[2, 0, 1, 1, 1, 2][(number % 10 < 5)?number % 10 : 5]]

console.log('Переменные инициализированы')

}
