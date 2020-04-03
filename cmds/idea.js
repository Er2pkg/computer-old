module.exports.info = {
name: 'идея',
engname: 'idea',
desc: 'Создаёт идею',
regex: '/[ие]дь?[еэ]й?а/',
engregex: '/[ie]dey?a/',
}
module.exports.run = (message, ph) =>
Comp.con.query(`SELECT * FROM ideas WHERE user=${message.author.id}`, (err, rows) => {

})