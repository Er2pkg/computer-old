module.exports.info = {
name: 'ранк',
engname: 'rank',
regex: '/[рт][ау]н[кг]/',
engregex: '/r[au]n[kg]/',
args: '[человек]',
engargs: '[member]',
desc: 'Показать свой или чужой XP',
engdesc: 'Show your or alien XP',
}
module.exports.run = async (message, ph) => {
let user
if(message.args[0]) user = Comp.client.users.cache.get(message.args[0]) || message.mentions.users.first()
if(!user) user = message.author
const rcard = async row => {
message.channel.startTyping()
avatar = await Comp.jimp.read(user.avatarURL({format: 'png'})),
mask = await Comp.jimp.read('./assets/avatarmask.png'),
bgmask = await Comp.jimp.read('./assets/bgmask.png'),
bg = await Comp.jimp.read(row.bg),
bar = await new Comp.jimp(700, 20, '#00000000'),
barr = await new Comp.jimp(Math.ceil(row.xp / (Comp.xpFormule(row.lvl) / 100) * 7), 20, ('#' + (row.accent && row.accent!=='null'?row.accent:(bg.getPixelColor(96, 100).toString(16).slice(0, -2))))),
fnt = await Comp.jimp.loadFont('./fonts/uni-sans-heavy-64-white.fnt')
await bar.composite(barr, 0, 0)
await avatar.resize(200, 200).mask(mask, 0, 0)
await bg.resize(934, 282).blur(5).mask(bgmask)
await Comp.jimp.read('./assets/xpmask.png').then(async xpmask => await bar.mask(xpmask.resize(700, 20), 0, 0))
await bg.brightness(-0.5)
await bar.resize(634, 40); if(Object.values(Comp.owners).includes(user.id)) await Comp.jimp.read('./assets/staff.png').then(async sicon => await bg.composite(sicon, 55, 5))
await Comp.jimp.read('./assets/'+user.presence.status+'.png').then(async status => await avatar.composite(status, 141, 151))
await bg
.composite(avatar, 50, 50)
.composite(bar, 255, 210)
.print(fnt, 255, 146, user.tag)
.print(fnt, 655, 0, 'lvl: ' + row.lvl)
.print(fnt, 350, 50, row.xp + '/' + Comp.xpFormule(row.lvl) + ' xp')
.print(fnt, 245, 0, 'money:$' + row.money)
.getBuffer(Comp.jimp.MIME_PNG, async (err, buff) => {
await message.channel.stopTyping()
message.channel.send('Made for ' + Math.ceil((Date.now() - (message.editedTimestamp?mesaage.editedTimestamp:message.createdTimestamp)) / 1000) + ' seconds ', {files: [await new Comp.Discord.MessageAttachment(buff, 'rank.png')]})
})}
const row = Comp.DB.xp.get(user.id)
if(!row) return message.reply(ph[0])
if(!['prev', 'preview'].includes(message.args[0])) rcard(row)
else rcard(new Comp.structures.get('XP')('', {id: user.id, lvl: 12, money: 228, xp: 768}))
}