module.exports.info = {
name: 'информация',
engname: 'information',
desc: 'Показывает информацию об этом боте',
engdesc: 'Shows information about this bot',
regex: '/инфо(рмация)?/',
engregex: '/info(rmation)?/',
}
module.exports.run = (message, ph) =>
message.channel.send(`${ph[0]+' '+Comp.client.user.tag}:
${ph[ 1]+' '+Comp.os.arch+' '+ph[2]+' '+Comp.os.platform+' '+ph[3]+' '+Comp.os.cpus()[0].model+' '+ph[4]+' '+Comp.os.cpus()[0].speed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (Comp.os.cpus()[0].speed.toString().length < 4?ph[5]:ph[6])}
${ph[ 7]+' '+Comp.addCommas(Math.floor(Comp.client.ping))} ms
${ph[ 8]+' '+Comp.addCommas((process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2))} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)+' '+ph[9]}
${ph[10]+' '+Comp.declOfNum(Comp.client.users.size, ph[11], 1)}
${ph[12]+' '+Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ph[13], 1)+' '+ph[14]+' '+Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60)) % 60, ph[15], 1)}
${ph[16]+' '+Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)
`)