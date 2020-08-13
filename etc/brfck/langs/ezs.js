const BFP = require('./bfp')
module.exports = class EZscript extends BFP {
// (c) Er2 EZscript xD
constructor() {
super()
this.names = ['ezs', 'ezscript']
this.regex = '[^NPLMOISE]'
this.chVals = {
'+': 'L',
'-': 'M',
'>': 'N',
'<': 'P',
'[': 'S',
']': 'E',
'.': 'O',
',': 'I',
'#': 'R',
}
this.ocmds = this.cmds
this.cmds = {}
Object.keys(this.ocmds).forEach(k => this.cmds[this.chVals[k]] = this.ocmds[k])
delete this.ocmds
}}