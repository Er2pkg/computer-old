const BaseManager = require('discord.js').BaseManager
module.exports = class CommandManager extends BaseManager {
constructor(cmds) {
super(null, cmds, require('./Command'))
}
add(data) {
return super.add(data, true, {id: (data.info.engname || data.info.name)})
}
}