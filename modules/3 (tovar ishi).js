module.exports.run = message => {
let msg = message.content.split(' '), arr = [], mtchs = 0
if((!msg[1] || (msg[1] && Comp.client.commands.cache.find(c => msg[1].match(new RegExp(c.regex))))) && Comp.client.prefixes.find(p => p == msg[0].toLowerCase())) return
msg.forEach((i, index) => arr.push({index: index, match: i.match(/(т[оа]в[оа]рь?)([А-Яа-яЁёA-Za-z]{1,})/i)}))
arr.forEach(i => {if(i.match) {msg[i.index] = `${i.match[1]} ${i.match[2]}`; mtchs++}})
if(mtchs > 0) message.channel.send(msg.join(' '))
}