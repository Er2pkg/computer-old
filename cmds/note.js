const methods = ['лист', 'list', 'добавить', 'add', 'просмотр', 'show', 'просмотреть', 'удалить', 'remove', 'delete', 'изменить', 'edit'], noteHelp = {
ru: `заметка(и) лист - лист ваших заметок.
заметка добавить <текст> - добавить заметку.
заметка просмотр(еть) <номер заметки> - просмотреть заметку полностью.
заметка изменить <номер заметки> <текст> - изменить заметку.
заметка(и) удалить <номер|все> - удалить заметку(и).`,
en: `note(s) list - list of your own notes.
note add <text> - add a note.
note show <note num> - show a note fully.
note edit <note num> <text> - edit a note.
note(s) remove|delete <number|all> - delete note(s).`
}
module.exports.info = {
name: 'заметка',
engname: 'note',
desc: 'Заметки...',
engdesc: 'Notes...',
regex: '/[щз][ао]мь?[еэ]тк[аи]/',
engregex: '/nou?[td]e?s?/',
}
module.exports.run = (message, ph) =>
Comp.con.query(`SELECT * FROM notes WHERE user=${message.author.id}`, (err, rows) => {
let find
message.channel.startTyping()
if(!message.args[0] || (message.args[0] && (['помощь', 'помогай', 'помоги', 'help'].includes(message.args[0].toLowerCase()) || !methods.includes(message.args[0].toLowerCase())))) {message.channel.stopTyping(); return message.channel.send(noteHelp[message.lang]);}
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
let add = ad => {Comp.con.query(`INSERT INTO notes (user, id, name, text) VALUES ('${message.author.id}', ${ad}, '${message.args.slice(1).join(' ').replace(/\'/g, '\\\'').slice(0,10)}', '${message.args.slice(1).join(' ').replace(/\'/g, '\\\'')}')`)}
if(rows.length < 1) {add(1); message.channel.send(ph[3]+'1')}
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