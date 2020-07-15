const BaseManager = require('discord.js').BaseManager
module.exports = class LocaleManager extends BaseManager {
constructor(locales, client) {
super(client, locales, require('./Locale'))
}
add(data) {
return super.add(data, true, {id: data.category})
}
find(category, element, lang='ru') {
let c = this.cache.get(category.toString())[lang]
if(element.toString().length>0)
return c[element.toString()]
else return c
}
}