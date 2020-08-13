const Collection = (require('discord.js')).Collection,
Base = (require('discord.js')).Base
module.exports = class Type extends Base {
constructor(client, data) {
super(client)
this.type = data.type
this.elements = new Collection()
data.elements.forEach(i =>
this.elements.set(i.slice(i.startsWith('-')?1:0,-3), {
disabled: data.disabled||i.startsWith('-'),
name: i.slice(i.startsWith('-')?1:0,-3),
path: `./${this.type}/`+i,
run: i.startsWith('-')?()=>null:require(`../${this.type}/`+i).run,
}))
}}