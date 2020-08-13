module.exports = class BrainFuck {
constructor() {
this.Error = require('../classes/BFerror')
this.names = ['brf', 'bf', 'brainfuck']
this.chVals = {'[':'[',']':']'}
this.regex = '[^\>\<\+\-\[\]]'
this.cmds = {
'>': memory => memory.incrementPointer(),
'<': memory => memory.decrementPointer(),
'+': memory => memory.increment(),
'-': memory => memory.decrement(),
',': (memory, ths) => (memory.current = ths.input.shift() || 0),
'.': (memory, ths) => (ths.output += memory.currentChar),
'[': (memory, ths, position, chVals) => {
if (memory.current != 0)
position.incrementPointer(position.current)
else {
let cont = true, base = position.pointer, depth = 0
while (cont && position.current < ths.code.length) {
position.increment()
switch (ths.code.charAt(position.current)) {
case chVals['[']:depth++;break
case chVals[']']:if (depth > 0)depth--;elsecont = false;break;}}
if (cont == true) throw new this.Error(`Unmatched loop at index ${position.list[base]}`)
}},
']': (a, b, pos) => {if (pos.pointer == 0) throw new this.Error(`Unmatched loop at index ${pos.current}`); else {pos.decrementPointer();pos.decrement()}}
}
}}