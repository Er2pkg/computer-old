module.exports.info = {
name: 'цвет',
engname: 'color',
regex: 'к[оа]л[оа]р|цве[тд]',
engregex: 'c[oa]l[oa]r',
desc: 'Показывает информацию о цвете',
engdesc: 'Shows information about the color',
args: '<цвет>',
engargs: '<color>',
examples: ["'00fff0'", "'Aqua'"],
}
module.exports.run = (message, ph) => {
if(!message.args[0]) return message.channel.send(Comp.err(ph[0], '', message.command+' #123123', message.lang))
const col = new Comp.color(message.args.join(' ').toLowerCase())
message.channel.send(new Comp.Embed()
.setAuthor(`${col.ok?ph[1]:ph[2]} ${message.args[0].toString().toUpperCase()}`, Comp.client.user.avatarURL())
.setThumbnail(`http://singlecolorimage.com/get/${col.ok?col.toHex().toString().slice(1):'2C2F33'}/100x100`)
.addField('HEX', col.ok?col.toHex():ph[2])
.addField('RGB', col.ok?col.toRGB():ph[2])
.addField('RGBA', col.ok?col.toRGBA():ph[2])
.setColor(col.ok?col.toHex():'2C2F33'))}