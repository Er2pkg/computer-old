module.exports.info = {
name: 'шелл',
engname: 'shell',
regex: 'шел{2}',
engregex: 'shel{2}',
args: '<код>',
engargs: '<code>',
desc: 'Запускает команду в bash',
engdesc: 'Runs command in bash',
private: true,
examples: ['\'ls\'', '\'mkdir folder\''],
}
module.exports.run = (message, ph) => {message.channel.startTyping(); message.channel.send(ph[0]).then(msg => {message.channel.stopTyping(); msg.delete(); message.channel.send(require('child_process').execSync(message.args.join(' ')).toString('utf8'), {code: 'sh', split: '\n'})})}