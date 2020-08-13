const types = [
{name: 'components'},
],
Corr = require('../../etc/core')
class Core extends Corr {
constructor() {
super(
process.env.ClientToken, undefined, 
require('../../package').ver
)
}
init() {
delete process.env.ClientToken
this.on('error', e => this.log('error', 'An error was occurred.', e/*.toString()*/))
this.types = new (this.structures.get('TypeManager'))([], this)
for(let type of types)
this.FS.read('./src/'+type.name).then(data => {
this.log('core', 'Loading<',type.name)
this.types.add({type: type.name, disabled: type.ign?true:undefined, elements: data.map(d => {
this.log('core', 'Loaded <', type.name.slice(0,-1), d.slice(0,-3))
return d
})})
this.log('core', 'Loaded',data.length,type.name)
if(this.types.cache.size==types.length)
this.types.cache.forEach((i,d) => i.elements.filter(o=>!o.disabled).forEach(h => h.run()))
})
.catch(e=>this.emit('error',e))

const ths = this
//Расширение дефолтных функций
Array.prototype.has = function(int) {return int===null?this.length>0:(this.find(i => i == int)?true:false)}
Math.avg = arr => {arr = arr.filter(i => parseInt(i)).map(i => parseInt(i)); return arr.reduce((a,b)=>a+b)/arr.length}
String.prototype.space = function(len,ind,j){return ths.space(this,len,ind,j)}
String.prototype.capitalize = function(n){return ths.cap(this,n)}
Array.prototype.capitalize = function(n){return ths.cap(this,n)}
Array.prototype.each = function(...a){this.forEach(...a); return this}

Object.defineProperty(this, 'xpLvls', 
{value: new Array(500).fill(0).map((d,i)=>this.xpFormule(i))})
}
get structures(){return require('../structures/list')()}
get fs(){return require('fs')}

get support(){return 'https://discord.gg/3Ehpp5P'}
get package(){return require('../../package')}
get ver(){return this.package.ver}
get version(){return this.ver.version}
get builder(){return this.ver.builder}
get build(){return this.ver.build}
get beta(){return this.ver.beta}

cap(i, n = 1) {if(Array.isArray(i))return i.map(x => this.cap(x,n));i=i.split('');i[n-1]?i[n-1]=i[n-1].toUpperCase():'';return i.join('')}
blacklist = ['719171112604532817']
Embed = this.structures.get('Embed')
Collection = this.Discord.Collection
locale = require('../../etc/locale')
Pagination = new (require('../../etc/discord-pagination'))(this.Discord)
brfck = require('../../etc/brfck')
cpuse = require('../../etc/cpuse')
os = require('os')
db = require('mongoose')
cd = new this.Collection
emojis = {
deny: '711931218383601695',
allow: '711931328320372766',
wait: '711931270778585261',
unknown: '711931378916130848',
crown: '735874648574656605',
copper: '735862582639984650',
}
getEmoji(em){return this.emojis[em]?`<:${em}:${this.emojis[em]}>`:''}
reactDel(m, em, t = 5000){m.react(this.emojis[em]||em).then(e=>this.sleep(t).then(()=>e.users.remove(m.client.user.id)))}
owners = new this.Collection([
['544031928358273045', 'er2'],
['441954631539490857', 'vadim'],
['734445504032669786', 'er22'],
])
sleep(ms=500){return new Promise(r=>setTimeout(r,ms))}
succ(text, l='ru', ne=false){return ne?(this.locale[l].funcs.succ+(text?`\n**${text}**`:'')):(new this.Embed().setColor('55ff55').setAuthor(this.locale[l].funcs.succ,this.client.user.avatarURL()).setDescription(text?`**${text}**`:''))}
sS(a,b){if(a<b)return -1;if(a>b)return 1;return 0}

xpFormule(lvl){return(5 * (lvl ** 2) + 50 * lvl + 100)}
getLvlRxp(xp){
let rxp = xp, lvl = 0
for(; rxp >= this.xpLvls[lvl]; rxp-=this.xpLvls[lvl], lvl++) 1
return [lvl, rxp]
}
getLvl(xp){return this.getLvlRxp(xp)[0]}
getRxp(xp){return this.getLvlRxp(xp)[1]}
getLvlXp(xp){return this.xpLvls[this.getLvl(xp)]}

addCommas(int){return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
random(a,b){return Math.floor(Math.random()*(b-a+1))+a}
declOfNum(n,t,h){return (h&&h==1?this.addCommas(n)+' ':'')+t[(n%100>4&&n%100<20)?2:[2,0,1,1,1,2][(n%10<5)?n%10:5]]}
pCh(l){
return new Promise(r => {
if(['ru','en'].includes(l)) l = this.locale[l].funcs.pC
let h = (e, n) => {switch(e) {case 'choose': return l[0]; break; case 'choosed': return (l[1]).replace('a', n); break; case 'error': return l[2]; break}}
return r(h,l)
})
}
err(a,b,c,l='ru',ne=false){
l=this.locale[l].funcs.err,
embed = ne?(`${l[0]}\n${l[1]}\n${a?a:l[2]}`):(new this.Embed().setAuthor(l[0], this.client.user.avatarURL()).addField(l[1], a?a:l[2]).setColor('RED'))
b?ne?embed+=`\n${l[3]}\n${b}`:embed.addField(l[3],b):''
c?ne?embed+=`\n${l[4]}\n${c}`:embed.addField(l[4],c):''
return embed
}
}
module.exports = Core
module.exports.run = () => null