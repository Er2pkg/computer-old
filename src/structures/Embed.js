let MessageEmbed = (require('discord.js')).MessageEmbed
class Embed extends MessageEmbed {
constructor(a) {
super(Object.assign({}, {
color: (Core.beta?'BLURPLE':'00fff0'),
}, a))
}
}
module.exports = Embed