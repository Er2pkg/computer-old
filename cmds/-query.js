module.exports.info = {
name: 'query',
engname: 'query',
regex: 'quer{1,}y',
engregex: 'quer{1,}y',
args: '<код товарища сталина>',
engargs: '<code of comrade Stalin>',
desc: 'Общение с базой данных',
engdesc: '...',
private: true
}
module.exports.run = message => {
Comp.client.commands.find(c => c.engname == 'eval').run({channel: message.channel, author: {id: message.author.id}, args: ['Comp.con.query(`',message.args.join(' '),'`, (err, rows) => err?err:(let arr = []; for(let i=0;i<rows.length;i++) arr.join(rows[i]))']})
}
module.exports.engrun = message => {
Comp.client.commands.find(c => c.engname == 'eval').engrun({channel: message.channel, author: {id: message.author.id}, args: ['Comp.con.query(',message.args,')']})
}