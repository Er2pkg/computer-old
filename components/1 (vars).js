module.exports.run = () => {
console.log('[     vars]', 'Vars initialization...')

//Расширение дефолтных функций
Array.prototype.has = function(int) {return int===null?this.length>0:(this.find(i => i == int)?true:false)}
Math.avg = arr => {arr = arr.filter(i => parseInt(i)).map(i => parseInt(i)); return arr.reduce((a,b)=>a+b)/arr.length}
Comp.cap = (i, n = 1) => {if(Array.isArray(i))return i.map(x => Comp.cap(x,n));i=i.split('');i[n-1]?i[n-1]=i[n-1].toUpperCase():'';return i.join('')}
Comp.space = (i, len = 3, ind = '+', j = ' ') => {i=i.split('');if(i.length>=len)return i.join('');else{ind=='+'?i.push(j):i.unshift(j); return Comp.space(i.join(''),len,ind,j)}}
String.prototype.space = function(len,ind,j){return Comp.space(this,len,ind,j)}
String.prototype.capitalize = function(n){return Comp.cap(this,n)}
Array.prototype.capitalize = function(n){return Comp.cap(this,n)}

Comp.Embed = Comp.Discord.MessageEmbed
Comp.Collection = Comp.Discord.Collection

Comp.log = (m = 'unknown', ...c) => console.log(`[${m.space(9, '-')}]`, ...c)
Comp.locale = new (require('../structures/LocaleManager'))()
Comp.Pagination = new (require('discord-pagination'))(Comp.Discord)
Comp.brfck = require('brfck')
Comp.color = require('rgbcolor')
Comp.cpuse = require('cpuse')
Comp.os = require('os')
Comp.db = require('mongoose')
Comp.jimp = require('jimp')
Comp.fs = require('fs')
Comp.warnedFlood = new Set()
Comp.unxp = new Set()
Comp.cd = new Comp.Collection()

Comp.DBtables = [
'AFK', 'Guild', 'Ignore',
'Locale', 'Mute', 'Note',
'Pred', 'XP', 'User',
]

Comp.client.login(process.env.ClientToken).then(() => delete process.env.ClientToken).catch(() => console.log('CLIENT AUTH FAILED'))

Comp.blacklist = ['719171112604532817']

Comp.owners = new Comp.Collection()
Comp.owners.set('544031928358273045', 'er2')
Comp.owners.set('441954631539490857', 'vadim')

Comp.sleep = (ms=500) => new Promise(r => setTimeout(r,ms))
Comp.succ = (text, l='ru') => new Comp.Embed().setColor('55ff55').setAuthor(Comp.locale.find('funcs', 'succ', l),Comp.client.user.avatarURL()).setDescription(text?`**${text}**`:'')
Comp.sN = (a, b) => {if(a<b)return -1;if(a>b) return 1;return 0}
Comp.pS = Comp.Pagination.showPage
Comp.xpFormule = lvl => (5 * (lvl ^ 2) + 50 * lvl + 100)
Comp.send = (id, message) => id.send(message)
Comp.addCommas = int => `${int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
Comp.random = (min, max) => Math.floor(Math.random()*(max-min+1))+min
Comp.declOfNum = (number, titles, hmm) => (hmm && hmm == 1?Comp.addCommas(number)+' ':'') + titles[(number % 100 > 4 && number % 100 < 20)?2:[2, 0, 1, 1, 1, 2][(number % 10 < 5)?number % 10 : 5]]

Comp.pCh = l =>
new Promise(res => {
if(['ru','en'].includes(l)) l = Comp.locale.find('funcs', 'pC', l)
let h = (e, n) => {switch(e) {case 'choose': return l[0]; break; case 'choosed': return (l[1]).replace('a', n); break; case 'error': return l[2]; break}}
return res(h,l)
})
Comp.err = (a, b, c, l = 'ru') => {
l=Comp.locale.find('funcs', 'err', l),
embed = new Comp.Embed().setAuthor(l[0], Comp.client.user.avatarURL()).addField(l[1], a?a:l[2]).setColor('RED')
b?embed.addField(l[3],b):''
c?embed.addField(l[4],c):''
return embed
}

//SAFE EVAL

Comp.safeEval = function (code, context, opts) {
  let sandbox = {},
  resultKey = 'SEC_EVAL_' + Math.floor(Math.random() * 1000000)
  sandbox[resultKey] = {}
  const clr = c => {
  const keys = Object.getOwnPropertyNames(c).concat(['constructor'])
  keys.forEach(key => {
    const item = c[key]
    if (!item || typeof item.constructor !== 'function') return
      c[key].constructor = undefined
  })}
  code = 'Function = undefined; ('+clr+')(this)\n' + resultKey + '=' + code
  if (context) {
    Object.keys(context).forEach(k => {
      clr(context[k])
      sandbox[k] = context[k]
    })
  } 
  require('vm').runInNewContext(code, sandbox, opts)
  return sandbox[resultKey]
}

/// SAFE EVAL

Comp.log('vars', 'Vars were initialized')
}