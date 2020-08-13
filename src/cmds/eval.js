module.exports = {
info: {
name: 'жс',
engname: 'eval',
regex: 'д?жс',
engregex: 'eval|d?js',
args: '<код>',
engargs: '<code>',
desc: 'Эмулирует код',
engdesc: 'Evalute the code',
examples: ['\'2+2\'', "\"[\'hello\', \'world\'].capitalize()\""],
private: true,
},
run: function(message, ph) {
message.channel.startTyping()
try {
const cpu = Core.stats.cpu, brfck = Core.brfck, capitalize = Core.cap
let evaled = eval(message.args.join(' ')),
eevaled = (Array.isArray(evaled)?'array':typeof evaled).capitalize()
if(typeof evaled!== 'string')
evaled = require('util').inspect(evaled, {depth: message.flags.has('nodepth')?2:0})
message.channel.stopTyping()
message.channel.send(`//${ph[0]} ✅\n//${ph[1]} ${eevaled}\n${evaled}`, {code: 'js', split: '\n'})
} catch (err) {
message.channel.stopTyping()
message.channel.send(`//${ph[2]} ❎\n${err}`, {code: 'js'})
}
}
}