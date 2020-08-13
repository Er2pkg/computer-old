const BF = require('./brf')
module.exports = class RediScript extends BF {
// (c) Er2 RediScript++ xD
constructor() {
super()
this.names = ['rsc', 'redi', 'redisc', 'rediscript']
this.regex = '[^REDIPL\{\}]'
this.chVals = {
'+': 'E',
'-': 'D',
'>': 'L',
'<': 'P',
'[': '{',
']': '}',
'.': 'I',
}
this.ocmds = this.cmds
this.cmds = {
'R': memory => memory.current = 0,
}
delete this.ocmds[',']
Object.keys(this.ocmds).forEach(k => this.cmds[this.chVals[k]] = this.ocmds[k])
delete this.ocmds
}}