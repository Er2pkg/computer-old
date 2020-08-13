class Request {
constructor() {
let v = {
stringify: (require('querystring')).stringify,
req: (require('https')).request,
}
for(let i of Object.keys(v))
Object.defineProperty(this, i, {value: v[i]})
}
api = {
hostname: 'api.server-discord.com',
botsPath: 'https://bots.server-discord.com',
version: 2,
}
isLib(lib, c) {
try {
lib = require.cache[require.resolve(lib)]
return lib && c instanceof lib.exports.Client
} catch (e) {return null}
}
isSupported(c) {
return Boolean(
['discord.js', 'eris'].find(i=>this.isLib(i, c))
)
}
#send = (p, pd) =>
new Promise((r,j) => {
let q = this.req(p, e => {
e.setEncoding('utf8')
e.on('data', d => {
try {
r(JSON.parse(d))
} catch(e) {j(e)}
})
})
q.on('error', j)
if(pd)
q.write(pd)
q.end()
})
request(p) {
let pd
if(p.body) {
pd = this.stringify(p.body)
p.headers['Content-Type'] = 'application/x-www-form-urlencoded'
p.headers['Content-Length'] = Buffer.byteLength(pd)
}
return this.#send(p, pd)
.then(i=>i, e => this.log('Ошибка в работе', e))
}
sendStat(c, p) {
let d = {servers: 0, shards: 0},
a = [[c.shard, 'count'], [c.shards, 'size']]
a.find(i => (i[0]&&i[0][i[1]]!==1)?(d.shards=i[0][i[1]]):'')
if(c.guilds.cache)
d.servers = c.guilds.cache.size
else d.servers = c.guilds.size
p.body = d
this.request(p)
.then(r =>
(r.error?this.log('Автопост', 'Ошибка в работе\n'+r.error.message)
:this.log('Автопост', 'Статистика для '+c.user.tag+' опубликована успешно.\n'+encodeURI(this.api.botsPath+'/'+c.user.id))),
e => this.log('Автопост', 'Ошибка в работе', e))
}
log(...a) {
let b = '[sdc-api] '+a.join(' | ')
console.log(b)
return b
}
}
class SDC extends Request {
#token
constructor(token) {
super()
if(!token) {
this.log('Ошибка аргументов', 'Не указан API ключ!')
return {}
}
this.#token = token
//API
let
a = {
guild: i => '/guild/'+i,
guildPlace: i => '/guild/'+i+'/place',
guildRated: i => '/guild/'+i+'/rated',
userRated: i => '/user/'+i+'/rated',
warns: i => '/warns/'+i,
},
b = {
guild: 'Не указан ID сервера!',
user: 'Не указан ID человека!',
}
for(let i of Object.keys(a)) {
let x = b[Object.keys(b).find(x=>x.startsWith(i))]
this[i] = id => {
if(!id)
return this.log('Ошибка аргументов', x)
return this.request(this.#options(a[i](id)))
}}
}
#options = (url, meth = 'GET') => {
if(!url)
return this.log('Ошибка в работе модуля', 'Не указан адрес метода.')
meth = meth.toString()
if(!meth.match(/get|post/gi))
return this.log('Ошибка в работе метода', 'Указан неверный метод запроса')
return {
method: meth.toUpperCase(),
hostname: this.api.hostname,
path: `/v${this.api.version}${url}`,
headers: {
'User-Agent': `ersdc (${url})`,
'Authorization': 'SDC '+this.#token
}}}
setAutoPost = (c, i) => {
i = parseInt(i)||1800000
if(!c)
return this.log('Ошибка аргументов', 'Не указан клиент бота!')
if(!this.isSupported(c))
return this.log('Ошибка аргументов', 'Библиотека бота не поддерживается!')
if(i < 900000)
return this.log('Ошибка аргументов', 'Укажите интервал в миллисекундах, который больше 15 минут')
let a = () => this.sendStat(c, this.#options(`/bots/${c.user.id}/stats`, 'POST'))
a()
return setInterval(a, i)
}
}
module.exports = SDC