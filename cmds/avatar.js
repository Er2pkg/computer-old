module.exports.info = {
name: 'аватар',
engname: 'avatar',
regex: 'ава(тар|тарка)?',
engregex: 'ava(tar)?',
desc: 'Покажет твою или чужую аватарку',
engdesc: 'Shows your or alien avatar',
args: '[@человек|люди]',
engargs: '[@member|people]',
}
module.exports.run = (message,ph) => {
let t = [],
user = (message.mentions.users.first() || Comp.client.users.cache.get(message.args[0])),
uAva = c => {console.log(c); return new Comp.Embed().setAuthor(ph[0],Comp.client.user.avatarURL()).setColor(Comp.beta?'BLURPLE':'00fff0').setDescription(c.content[0].tag).setImage(c.content[0].ava).setTimestamp().setFooter(`${ph[1]} ${c.page}/${c.totalPages}`)}
if(!user) user = message.author
if(message.args.length<2) t.push({ava: user.avatarURL({format: 'png'}), tag: user.tag})
else
message.mentions.users.forEach(i=>t.push({ava: i.avatarURL({format: 'png'}), tag: i.tag}))
Comp.Pagination.message(message, uAva, t, 1)
}