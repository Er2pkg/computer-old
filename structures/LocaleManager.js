const BaseManager = require('discord.js').BaseManager
module.exports = class LocaleManager extends BaseManager {
constructor(locales) {
super(null, locales, require('./Locale'))
}
add(data) {
return super.add(data, true, {id: data.category})
}
}