const Base = (require('discord.js')).Base
module.exports = class Command extends Base {
constructor(client, cmd) {
super(client)
this.info = cmd.info
this.run = cmd.run
this.uses = 0
}}