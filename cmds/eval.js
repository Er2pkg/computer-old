module.exports.info = {
name: 'жс',
engname: 'eval',
regex: 'д?жс',
engregex: 'eval|d?js',
args: '<код>',
engargs: '<code>',
desc: 'Эмулирует код',
engdesc: 'Evalute the code',
examples: ['\'2+2\'', "\"[\'hello\', \'world\'].capitalize()\""],
}
module.exports.run = (message, ph) => {
message.channel.startTyping()
    try {const cpu = Comp.client.stats.cpu, brfck = Comp.brfck, capitalize = Comp.cap; let evaled = (Comp.owners.get(message.author.id)?eval(message.args.join(' ')):Comp.safeEval(message.args.join(' ').replace(/eval\((.*?)\)/g, ''), {cpu: cpu, brfck: {...brfck}, capitalize: capitalize})); let eevaled = (Array.isArray(evaled)?'array':typeof evaled).capitalize(); if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: message.flags.has('nodepth')?2:0}); message.channel.stopTyping(); message.channel.send(`//${ph[0]} ✅\n//${ph[1]} ${eevaled}\n${Comp.owners.get(message.author.id)?evaled:evaled.replace(/(http:\/\/|https:\/\/)?discord(app\.com\/invite|.\w{2}\/\w{3,})/gi, '[INVITE]')}`, {code: 'js', split: '\n'});} catch (err) {message.channel.stopTyping(); message.channel.send(`//${ph[2]} ❎\n${err}`, {code: 'js'});}
}