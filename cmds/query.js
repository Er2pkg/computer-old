module.exports.info = {
name: 'запрос',
engname: 'query',
regex: '/з[ао]про[сз]/',
engregex: '/[qk]y?uer{1,}[yi]/',
private: true,
hidden: true,
}
module.exports.run = message =>
Comp.models.get(message.args[0])[message.args[1]](eval('Object('+message.args.slice(2).join(' ')+')'), (err, rows) => {
if(err) return message.channel.send(err, {code: 'js', split: '\n'})
message.channel.send(require('util').inspect(rows), {code: 'js', split: '\n'})
})