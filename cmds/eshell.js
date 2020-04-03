module.exports.info = {
name: 'шелл',
engname: 'shell',
regex: '/шел(л)?/',
engregex: '/shell/',
args: '<код товарища Сталина>',
engargs: '<code of comrade Stalin>',
desc: 'Эмулирует код товарища Сталина',
engdesc: 'Emulate a code of comrade Stalin',
private: true
}
module.exports.run = (message, ph) => {message.channel.startTyping(); message.channel.send(ph[0]).then(msg => {message.channel.stopTyping(); msg.edit(require('child_process').execSync(message.args.join(' ')).toString('utf8') + ' ')})}