module.exports.info = {
name: 'информация',
engname: 'information',
desc: 'Показывает информацию об этом боте',
engdesc: 'Shows information about this bot',
regex: 'инфо(рмация)?',
engregex: 'info(rmation)?',
}
module.exports.run = (message, ph) => {
let embed, info = [
`${Comp.beta?'[BETA] ':''}${ph[0]} ${Comp.client.user.tag}`,
{
key: `${ph[1]}, ${ph[2]}, ${ph[23]}`,
val: `${Comp.addCommas(Math.round(Comp.client.ws.ping))} ms, ${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ${ph[3]}, ${Comp.client.stats.cpu}`
},
{
key: ph[4],
val: `${ph[5][0]}${Comp.client.commands.cache.size}
${ph[5][1]}${Comp.client.commands.cache.filter(c => !c.info.private && !c.info.hidden).size}
${ph[5][2]}${Comp.addCommas(Math.ceil(Comp.client.commands.cache.filter(c => !c.info.hidden).size / 15))}`
},
{
key: `${ph[6]}, ${ph[7]}, ${ph[8]}`,
val: `${Comp.addCommas(Comp.client.stats.cmds.total)}, ${Comp.addCommas(Comp.client.stats.cmds.perHour)}, ${Comp.addCommas(Comp.client.stats.msgs)}`
},
{
key: `${ph[9]}, ${ph[13]}, ${ph[14]}`,
val: `${Comp.addCommas(Comp.client.users.cache.size)} ${ph[12]} (${Comp.declOfNum(Comp.client.stats.users.users, ph[10], 1)}, ${Comp.declOfNum(Comp.client.stats.users.bots, ph[11], 1)})
${Comp.addCommas(Comp.client.channels.cache.size)}, ${Comp.addCommas(Comp.client.guilds.cache.size)}`
},
{
key: `${ph[15]}, ${ph[16]}, ${ph[17]}`,
val: `${Comp.addCommas(Comp.client.emojis.cache.size)}, ${Comp.addCommas(Comp.client.voice.connections.size)}, ${Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ph[18], 1)} ${ph[19]} ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ph[20], 1)}`
},
{
key: `${ph[21]}, ${ph[22]}`,
val: `${Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} MSK, ${new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3)}`
}]
info.forEach(i=>!i.val?'':i.val=i.val.split('\n').map(x=>'> '+x).join('\n'))
if(message.flags.has('noembed') || !message.guild.me.hasPermission('EMBED_LINKS')) {
embed = info[0]+'\n'+
info.filter(i=>typeof i !=='string').map(i=>i.key+'\n'+i.val).join('\n')
} else {
embed = new Comp.Embed()
.setTitle(info[0])
.setThumbnail(Comp.client.user.displayAvatarURL({format: 'png'}))
.setColor(Comp.beta?'BLURPLE':'00fff0')
info
.filter(i=>typeof i !=='string')
.forEach(i=>embed.addField(i.key, i.val))
}
message.channel.send(embed)
}