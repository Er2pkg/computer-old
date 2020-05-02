module.exports.run = () => {

console.log('Инициализация переменных...')

//Расширение дефолтных функций
Array.prototype.has = function(int) {return int===null?this.length>0:(this.find(i => i == int)?true:false)}
Math.avg = arr => {arr = arr.filter(i => parseInt(i)).map(i => parseInt(i)); return arr.reduce((a,b)=>a+b)/arr.length}
Comp.space = (i, len = 3, ind = '+', j = ' ') => {if(i.length>=len)return i;else{i=i.split('');ind=='+'?i.shift(j):i.unshift(j); return Comp.space(i.join(''),len,ind,j)}}
String.prototype.space = function(len,ind,j){return Comp.space(this,len,ind,j)}

Comp.brfck = require('brfck')
Comp.cpuse = require('cpuse')
Comp.os = require('os')
Comp.db = require('mongoose')
Comp.jimp = require('jimp')
Comp.fs = require('fs')
Comp.locales = require('../locales.json')
Comp.warnedFlood = new Set()
Comp.unxp = new Set()

Comp.DBtables = [
'AFK', 'Ignore', 'Guild',
'Mute', 'Note', 'Pred',
'XP',
]

Comp.Collection = Comp.Discord.Collection

Comp.client.login(process.env.ClientToken).then(() => delete process.env.ClientToken).catch(() => console.log('CLIENT AUTH FAILED'))

Comp.owners = new Comp.Collection()
Comp.owners.set('stalin', '544031928358273045')
Comp.owners.set('lenin', '441954631539490857')

Comp.pS = (c, page, onOne, j) => c.slice(((page - 1) * onOne), (onOne) + ((page - 1) * onOne)).join(j?j:'\n')
Comp.xpFormule = lvl => (5 * (lvl ^ 2) + 50 * lvl + 100)
Comp.send = (id, message) => id.send(message)
Comp.addCommas = int => `${int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
Comp.random = (min, max) => Math.floor(Math.random()*(max-min+1))+min
Comp.declOfNum = (number, titles, hmm) => (hmm && hmm == 1?Comp.addCommas(number)+' ':'') + titles[(number % 100 > 4 && number % 100 < 20)?2:[2, 0, 1, 1, 1, 2][(number % 10 < 5)?number % 10 : 5]]

console.log('Переменные инициализированы')

}
