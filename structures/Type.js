const Collection = (require('discord.js')).Collection
module.exports = class Type {
constructor(a, data) {
this.type = data.type
this.elements = new Collection()
data.elements.forEach(i =>
this.elements.set(i.slice(i.startsWith('-')?1:0,-3), {
disabled: i.startsWith('-'),
name: i.slice(i.startsWith('-')?1:0,-3),
path: `./${this.type}/`+i,
run: i.startsWith('-')?'':require(`../${this.type}/`+i).run,
}))
}}