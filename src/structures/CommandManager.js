const BaseManager = require('discord.js').BaseManager
module.exports = class CommandManager extends BaseManager {
constructor(cmds, client) {
super(client, cmds, require('./Command'))
}
add(data) {
return super.add(data, true, {id: (data.info.engname || data.info.name)})
}
}