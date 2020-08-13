const BF = require('./brf')
module.exports = class BrainfuckPP extends BF {
// (c) Er2 Brainfuck++ xD
constructor() {
super()
this.names = ['bfp', 'brainfuckpp', 'bfpp']
this.regex = '[^#<>\+\-,.\[\]]'
this.cmds['#'] = memory => memory.current = 0
}}