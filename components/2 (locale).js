module.exports.run = () => {
let locales = [],
local = [],
locale = {}
require('fs')
.readdirSync('./locales')
.filter(i=>!i.startsWith('-'))
.map(i=>i.endsWith('.json')?i.slice(0,-5):i)
.forEach(i=>locale[i]=require('../locales/'+i))
let langs = Object.keys(locale)
for(let x of langs)
for(let i of Object.keys(locale[x])) {
locale[x][i].category = i
locale[x][i].lang = x
local.push(locale[x][i])
}
for(let i of local) {
let l = locales.findIndex(x=>x.category==i.category),
ll = l<0?undefined:locales[l],
la = i.lang+''
let a = {category: i.category}
delete i.category
delete i.lang
a[la] = i
if(!ll)
locales.push(a)
else ll[la] = i
}
Comp.locale = new (require('../structures/LocaleManager'))(locales, Comp.client)
console.log(Comp.locale)
}