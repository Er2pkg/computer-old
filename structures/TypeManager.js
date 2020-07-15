const BaseManager = require('discord.js').BaseManager
module.exports = class TypeManager extends BaseManager {
constructor(data, client) {
super(client, data, require('./Type'))
}
add(data) {
return super.add(data, true, {id: data.type})
}
}