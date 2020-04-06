const methods = ['лист', 'list', 'добавить', 'add', 'просмотр', 'show', 'просмотреть', 'удалить', 'remove', 'delete', 'изменить', 'edit', 'оценить', 'rate'], noteHelp = {
ru: `идея(и) лист - лист ваших идей.
идея добавить <текст> - добавить идею.
идея просмотр(еть) <номер идеи> - просмотреть идею.
идея оценить <номер идеи> < + | - > - оценить идею.
идея изменить <номер идеи> <текст (причина для модераторов)> <для модераторов: статус> - изменить идею.
идея(и) удалить <номер|все> - удалить идею(и).`,
en: `idea(s) list - list of your own ideas.
idea add <text> - add an idea.
idea show <idea num> - show an idea.
idea rate <idea num> < + | - > - rate an idea.
idea edit <idea num> <text (reason for mods)> <for mods: status> - edit an idea.
idea(s) remove|delete <number|all> - delete an idea(s).`
}
module.exports.info = {
name: 'идея',
engname: 'idea',
desc: 'Создаёт/изменяет идею',
engdesc: 'Creates/changes an idea',
regex: '/[ие]дь?[еэ]й?[аи]/',
engregex: '/[ie]dey?as?/',
}
module.exports.run = (message, ph) =>
Comp.con.query(`SELECT * FROM ideas WHERE user=${message.author.id}`, (err, rows) => {
let find
message.channel.startTyping()
if(!message.args[0] || !methods.includes(message.args[0].toLowerCase())) {message.channel.stopTyping(); return message.channel.send(noteHelp[message.lang]);}
switch(message.args[0].toLowerCase()) {
case methods[0]:
case methods[1]:
message.channel.stopTyping()
if(rows.length < 1) return message.reply(ph[0])
else message.reply('\n'+rows.map(i => `${i.id} (${i.name}...)`).join('\n'))
break
case methods[2]:
case methods[3]:
message.channel.stopTyping()
if(!message.args[1]) return message.reply(ph[1])
let add = Comp.con.query(`INSERT INTO ideas (user, name, date, message) VALUES ('${message.author.id}', '${message.args.slice(1).join(' ').replace(/\'/g, '\\\'').slice(0,10)}', ${Date.now()} '${message.args.slice(1).join(' ').replace(/\'/g, '\\\'')}')`)
if(rows.length < 1) {message.channel.send(ph[3]+'1')}
else {add(rows.length+1); message.channel.send(ph[3]+(rows.length+1))}
break
case methods[4]:
case methods[5]:
case methods[6]:
message.channel.stopTyping()
if(!message.args[1]) return message.reply(ph[2])
if(isNaN(parseInt(message.args[1]))) return message.reply(ph[4])
find = rows.find(i => i.id == parseInt(message.args[1]))
if(!find) return message.reply(ph[5])
else message.reply('\n'+find.text)
break
case methods[7]:
case methods[8]:
case methods[9]:
message.channel.stopTyping()
if(!message.args[1]) return message.reply(ph[2]+ph[6])
if(!['all', 'все'].includes(message.args[1].toLowerCase()) && isNaN(parseInt(message.args[1]))) return message.reply(ph[4]+ph[6])
find = rows.find(i => i.id == parseInt(message.args[1]))
if(!find && ['all', 'все'].includes(message.args[1].toLowerCase())) find = 'all'
if(!find) return message.reply(ph[5])
else {
Comp.con.query(`DELETE FROM notes WHERE user='${message.author.id}' ${find!=='all'?'AND id='+find.id:''}`)
if(find !== 'all') rows.filter(row => row.id > find.id).forEach(row => Comp.con.query(`UPDATE notes SET id=${row.id-1} WHERE USER='${message.author.id}'`))
message.channel.send(find=='all'?ph[7]:ph[8]+find.id)}
break
case methods[10]:
case methods[11]:
message.channel.stopTyping()
if(!message.args[1]) return message.reply(ph[2])
if(isNaN(parseInt(message.args[1]))) return message.reply(ph[4])
find = rows.find(i => i.id == parseInt(message.args[1]))
if(!find) return message.reply(ph[5])
if(!message.args[2]) return message.reply(ph[9])
Comp.con.query(`UPDATE notes SET name='${message.args.slice(2).join(' ').replace(/\'/g, '\\\'').slice(0,10)}', text='${message.args.slice(2).join(' ').replace(/\'/g, '\\\'')}' WHERE user='${message.author.id}' AND id=${find.id}`)
message.channel.send(ph[10]+find.id+ph[11])
break
}})