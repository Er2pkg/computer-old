module.exports.info = {
name: 'жс',
engname: 'eval',
regex: 'д?жс',
engregex: 'eval|d?js',
args: '<код>',
engargs: '<code>',
desc: 'Эмулирует код',
engdesc: 'Evalute the code',
//private: true
}
module.exports.run = (message, ph) => {
message.channel.startTyping()
    try {const cpu = Comp.client.stats.cpu, brfck = Comp.brfck; let evaled = (Object.values(Comp.owners).includes(message.author.id)?eval(message.args.join(' ')):require('safe-eval')(message.args.join(' ').replace(/eval\((.*?)\)/g, ''), {cpu: cpu, brfck: brfck})); let eevaled = typeof evaled; if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: message.flags.has('nodepth')?2:0}); message.channel.stopTyping(); message.channel.send(`//${ph[0]} ✅\n//${ph[1]} ${eevaled}\n${message.author.id==Comp.owners.stalin?evaled:evaled.replace(/(http:\/\/|https:\/\/)?discord(app\.com\/invite|.\w{2}\/\w{3,})/gi, '[INVITE]')}`, {code: 'js', split: '\n'});} catch (err) {message.channel.stopTyping(); message.channel.send(`//${ph[2]} ❎\n${err}`, {code: 'js'});}
}