module.exports.info = {
name: 'ранк',
engname: 'rank',
regex: '[рт][ау]н[кг]',
engregex: 'r[au]n[kg]',
args: '[человек]',
engargs: '[member]',
desc: 'Показать свой или чужой XP',
engdesc: 'Show your or alien XP',
examples: ['', '"<@"+message.guild.members.cache.filter(i=>!i.user.bot).random().id+">"', 'message.guild.members.cache.filter(i=>!i.user.bot).random().id'],
}
module.exports.run = async (message, ph) => {
let user,
xcords = {d: 0, o: 3, i: 10}
if(message.args[0]) user = Comp.client.users.cache.get(message.args[0]) || message.mentions.users.first()
if(!user) user = message.author
const rcard = async row => {
let st = user.presence.status.toString(),
avatar = await Comp.jimp.read(user.avatarURL({format: 'png'})),
bar = await new Comp.jimp(1024, 200),
bg = await Comp.jimp.read(row.bg),
barr = await new Comp.jimp(Math.ceil(row.xp / (Comp.xpFormule(row.lvl) / 100) * 8)+10, 30, ('#' + (row.accent && row.accent!=='null'?row.accent:(bg.getPixelColor(100, 100).toString(16).slice(0, -2))))),
xpb = await Comp.jimp.read('https://cdn.discordapp.com/attachments/696688365847707681/702882414183055390/xpbar.png'),
statuz = await Comp.jimp.read('https://cdn.discordapp.com/attachments/696688365847707681/702882413814218762/status.png'),
status = await Comp.jimp.read('./assets/'+user.presence.status + '.png'),
fnt1 = await Comp.jimp.loadFont('./fonts/segoeui-28-black.fnt'),
fnt2 = await Comp.jimp.loadFont('./fonts/segoeui-28-white.fnt'),
fnt3 = await Comp.jimp.loadFont('./fonts/uni-sans-heavy-32-white.fnt')
await bg.resize(1024, 200).blur(5).brightness(-0.5).mask(await Comp.jimp.read('https://cdn.discordapp.com/attachments/696688365847707681/706883367261569104/5a439e7a16251d42.png'), 0, 0)
if(Comp.owners.find(i => i==message.author.id)) 
await bg.print(fnt2, 350, 45, 'STAFF')
await bar.composite(barr, 225, 170)
await avatar.resize(200, 200).mask(await Comp.jimp.read('https://cdn.discordapp.com/attachments/696688365847707681/702882413386268742/avatarmask.png'), 0, 0)
bar.mask(xpb, 0, 0).composite(statuz, 0, 0)
await bar.composite(await status.resize(30, 30), 137, 170)

await bg
.composite(avatar, 0, 0)
.composite(bar, 0, 0)
.print(fnt2, xcords[st[0]]+143, 165, st[0])
.print(fnt1, 170, 165, st.slice(1))
.print(fnt3, 245, 0, user.tag)
.print(fnt2, 245, 75, 'lvl: ' + row.lvl)
.print(fnt2, 330, 75, 'money:' + row.money)
.print(fnt2, 245, 105, row.xp + '/' + Comp.xpFormule(row.lvl) + ' xp')
.getBuffer(Comp.jimp.MIME_PNG, (err, buff) => {
if(err) return message.reply(err)
message.channel.send('Made for '+Math.ceil((Date.now() - (message.editedTimestamp?message.editedTimestamp:message.createdTimestamp)) / 1000) + ' seconds', {files: [new Comp.Discord.MessageAttachment(buff, 'rank.png')]})
})
}
const row = await Comp.models.get('XP').findOne({id: user.id})
if(!row) return message.reply(ph[0])
if(!['prev', 'preview'].includes(message.args[0])) rcard(row)
else rcard(new (Comp.models.get('XP'))({id: user.id, lvl: 12, money: 228, xp: 768}))
}