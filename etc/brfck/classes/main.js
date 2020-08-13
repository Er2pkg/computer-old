class Main {
constructor() {
this.output = ''
this.input = []
this.max_steps = 1000000
}
exec(code, input = '', lang = 'brf', normNums = false) {
if(!this.getLang(lang.toLowerCase()))
throw new this.Error('Language is not found', new this.Result)
else lang = this.getLang(lang)
this.output = ''
this.input = input.split('').map(c =>
(normNums && !isNaN(parseInt(c)))?c:c.charCodeAt(0) % 256)
this.code = code.replace(/\n/gim, '').replace(new RegExp(lang.regex, 'gim'), '')
if(this.code.length<1) throw new this.Error('Provide a normal code', new this.Result)
let memory = new this.memory,
position = new this.memory(65536),
steps = 0,
time = Date.now()
for(; position.current<this.code.length; position.increment()) {
let char = this.code.charAt(position.current), cmds = lang.cmds
if(!cmds || (cmds && !cmds[char])) throw new this.Error(`Invalid operator '${char}'`, new this.Result(this.output, memory, steps, time))
else {
if(steps++ == this.max_steps) throw new this.Error(`Too many steps (${steps} reached)`, new this.Result(this.output, memory, steps, time))
cmds[char](memory, this, position, lang.chVals || {})
}
}
let res = new this.Result(this.output, memory, steps, time)
this.output = ''
this.input = []
this.code = ''
return res
}

getLang = lang => this.langs.find(i => i.names.find(x => x == lang.toLowerCase()))

ascii = (text = '') => text.toString().split('').map(i=>i.charCodeAt(0))

version = require('../package.json').version
memory = require('./memory')
RLE = require('./RLE')
LZ77 = require('./LZ77')
Error = require('./BFerror')
Result = require('./result')
langs = require('../langs/langs')
}
module.exports = Main