module.exports.info = {
name: 'помощь',
engname: 'help',
regex: '(п[оа]м[оа]г[аи]{1,}й?)|помо[щш]ь?|х[еэ]л{1,}[пб]|hel{1,}[pb]',
desc: 'меню помощи',
engdesc: 'help menu',
args: '[команда|страница]',
engargs: '[command|page]',
examples: ['', "message.lang=='ru'?arr.random().info.name:arr.random().info.engname", '1']
}
module.exports.run = async (message, ph) => {
let arr = Comp.client.commands.cache.filter(c => !c.info.hidden).sort((a,b)=>message.lang=='ru'?Comp.sN(a.info.name,b.info.name):Comp.sN((a.info.engname||a.info.name),(b.info.engname||b.info.name))),
orr = arr.map(i=>i),
page = parseInt(message.args[0])
if(message.args[0] && isNaN(page)) {
const cb = ([a,b]) =>
b.edit(new Comp.Embed()
.setAuthor(ph[0], message.author.avatarURL())
.setColor(Comp.beta?'BLURPLE':'00fff0')
.addField(ph[2], message.lang=='ru'?res[a-1].info.name:res[a-1].info.engname)
.addField(ph[3], message.lang=='ru'?res[a-1].info.desc:res[a-1].info.engdesc)
.addField(ph[4], message.lang=='ru'?(res[a-1].info.args?`\``+res[a-1].info.args+`\``:ph[7]):res[a-1].info.engargs?`\``+res[a-1].info.engargs+`\``:ph[7])
.addField(ph[5], !res[a-1].info.examples?(message.lang=='ru'?res[a-1].info.name:res[a-1].info.engname):(res[a-1].info.examples.map(i => (message.lang=='ru'?res[a-1].info.name:res[a-1].info.engname)+(eval(i)?(' **'+eval(i)+'**'):'')).join('\n')))
)
let r, q = message.args[0],
res = orr.filter(i => [i.info.regex, i.info.engregex].find(x => x?q.match(new RegExp(x, 'gi')):false))
if(res.length == 0) return message.reply(ph[1])
else if(res.length == 1) return cb([1, await message.channel.send('...')])
else return Comp.pCh(message.lang).then(c=> Comp.Pagination.optionChooser(message, res.map(cmd => `**${cmd.info.name} ${cmd.info.args?`\`${cmd.info.args}\``:''} -** ${cmd.info.desc?cmd.info.desc:''}`), c, false).then(cb))
}
arr = [...orr]
orr = orr.map((cmd, ind) => /*${ind+1}. */`${(cmd.info.private && !Comp.owners.get(message.author.id))?Comp.getEmoji('deny'):Comp.getEmoji('allow')} **`) //**${Comp.client.prefixes[7]}`)
if(message.lang == 'ru')
orr = arr.map((cmd, ind) => `${orr[ind]} ${cmd.info.name} ${cmd.info.args?`\`${cmd.info.args}\``:''} -** ${cmd.info.desc?cmd.info.desc:''} ${cmd.info.private? '(могут исполнить только создатели)' : ''}`)
else orr = arr.map((cmd, ind) => `${orr[ind]} ${cmd.info.engname} ${cmd.info.engargs?`\`${cmd.info.engargs}\``:''} -** ${cmd.info.engdesc?cmd.info.engdesc:(cmd.info.desc?cmd.info.desc:'')} ${cmd.info.private? '(can run only owners)' : ''}`)
let ren = c => (new Comp.Embed().setAuthor(ph[0], message.author.displayAvatarURL()).setColor(Comp.beta?'BLURPLE':'00fff0').setDescription(c.content.join('\n')).setFooter(`${ph[6]} ${c.page}/${c.totalPages}`))
if(message.flags.has('noembed') || !message.guild.me.hasPermission('EMBED_LINKS'))
ren = c => `**${ph[0]}**\n${c.content.join('\n')}\n${ph[6]} ${c.page}/${c.totalPages}`
Comp.Pagination.message(message, ren, orr, 15, page||1)
}