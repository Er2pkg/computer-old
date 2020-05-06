module.exports = class Command {
constructor(a, cmd) {
this.info = cmd.info
this.run = cmd.run
this.uses = 0
}}