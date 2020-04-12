module.exports.info = {
name: 'verify',
regex: '/в[еи]р[ие]ф[ие]|v[ei]r[ei]f[iy]/',
hidden: true
}
module.exports.run = message => {
message.channel.startTyping()
message.delete({timeout: 1500})
let i = 0, captcha = Math.random().toString(36).substr(2, 6), user = message.member,
authorized = message.guild.roles.cache.find(r => r.name.toLowerCase().match(new RegExp(/auth(orized)?|member|мембер|участник|человек|граждан(е|ин)/)))
if(!authorized) {message.channel.stopTyping(); return message.reply('роль не нашлась :( Создайте одну из ролей и поставьте её ниже самой высокой роли бота: member, человек, участник, гражданин и пр.')}
else authorized = authorized.id
if(!message.author.bot && (['verify', 'verification', 'верифи', 'верификация'].includes(message.channel.name) || [/*some ids*/'561921259429167117'].includes(message.channel.id))){
Comp.jimp.read("https://santehlux.by/upload/iblock/1a3/white_textile.jpg").then(bg => {
Comp.jimp.loadFont(Comp.jimp.FONT_SANS_32_BLACK).then(fnt => {
bg
.resize(750, 350)
.print(fnt, Math.random() * 400, Math.random() * 200, captcha)
.getBuffer(Comp.jimp.MIME_PNG, (err, buff) => {
message.channel.stopTyping()
        message.reply(new Comp.Discord.MessageEmbed()
            .setTitle("Верификация (Verification)")
            .setDescription("Введите капчу (Enter the captcha)")
            .addField("Попытки (Attempts)", "Всего 3 попытки (Total 3 attempts)")
            .setColor("RANDOM")
            .attachFiles([new Comp.Discord.MessageAttachment(buff, "captcha.png")])
            .setTimestamp() ).then(m => m.delete({timeout: 120000}))
})})
})} else return
const collector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 })
collector.on('collect', msg => {
msg.delete({timeout: 2000})
if(msg.content === captcha){ message.guild.member(message.author).roles.add(authorized); message.channel.send('Авторизован').then(msg => msg.delete({timeout: 1500})); collector.stop() }
else if(i!==3) i++
else {
message.channel.send('Попытки окончены. Начните заново').then(m => m.delete({timeout: 1500}))
collector.stop()
}})}