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
const rcard = async (row, length, timer) => {
console.warn('rcard is running')
 message.channel.startTyping()
const {Canvas} = require('canvas-constructor')
Comp.jimp.read(user.avatarURL({format: 'png'})).then(async avatar => {
console.warn('avatar loaded')
await Comp.jimp.read('./assets/avatarmask.png').then(async mask => {
console.warn('avatar mask is loaded')
await avatar.resize(200, 200).mask(mask, 0, 0)
await Comp.jimp.read('./assets/bgmask.png').then(async bgmask => {
console.warn('bgmask is loaded')
await Comp.jimp.read(row.bg).then(async bg => {
console.warn('bg is loaded')
await bg.resize(934, 282).blur(5).mask(bgmask)
await Comp.jimp.read(new Canvas(700, 20).setColor('#' + bg.getPixelColor(96, 100).toString(16).slice(0, -2)).addRect(0, 0, Math.ceil(length), 20).toBuffer()).then(async bar => {
await Comp.jimp.read('./assets/xpmask.png').then(async xpmask => await bar.mask(xpmask.resize(700, 20), 0, 0))
console.warn('xpmask is applied')
await bar.resize(634, 40); if(user.id == Comp.owners.stalin) await Comp.jimp.read('./assets/staff.png').then(async sicon => await bg.composite(sicon, 55, 5))
//govnokod
if(user.presence.status === 'online') await Comp.jimp.read('./assets/online.png').then(async online => await avatar.composite(online, 141, 151)); if(user.presence.status === 'idle') await Comp.jimp.read('./assets/idle.png').then(async idle => await avatar.composite(idle, 141, 151)); if(user.presence.status === 'offline') await Comp.jimp.read('./assets/invisible.png').then(async offline => await avatar.composite(offline, 141, 151)); if(user.presence.status === 'dnd') await Comp.jimp.read('./assets/dnd.png').then(async dnd => await avatar.composite(dnd, 141, 151))
await Comp.jimp.loadFont('./fonts/uni-sans-heavy-64-white.fnt').then(async fnt => {
console.warn('font is loaded')
await bg
.composite(avatar, 50, 50)
.composite(bar, 255, 210)
.print(fnt, 255, 146, user.tag)
.print(fnt, 655, 0, 'lvl: ' + row.lvl)
.print(fnt, 350, 50, row.xp + '/' + Comp.xpFormule(row.lvl) + ' xp')
//.print(fnt, 245, 0, 'money:$' + (row.money.toString().length > 3?row.money.toString().slice(0, -(rpr.money.toString().length - 3)) + 'K':row.money))
.getBuffer(Comp.jimp.MIME_PNG, async(err, buff) => {
console.warn('pikabu is loaded')
await message.channel.stopTyping();
message.channel.send('Made for ' + Math.ceil((Date.now() - timer) / 1000) + ' seconds ', {files: [await new Comp.Discord.Attachment(buff, 'rank.png')]})})})})})})})})}
Comp.con.query(`SELECT * FROM xp WHERE id = ${user.id}`, (err, rows) => {
if(rows.length < 1) return message.reply(ph[0])
if(!['prev', 'preview'].includes(message.args[0])) rcard(rows[0], rows[0].xp / (Comp.xpFormule(rows[0].lvl) / 100) * 7, Date.now())
else rcard({bg: 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg', money: 228000, lvl: 12, xp: 769}, ((769 / ((5 * (12 ^ 2) + 50 * 12 + 100) / 100)) * 7), Date.now())
})}