module.exports.info = {
name: 'поддержка',
engname: 'support',
engregex: 's[ua]p(p)?or[td]',
regex: 'п[оа]ддер[жш]ка|с[ао]п{1,2}о(г|р[тд])',
desc: 'Официальный сервер поддержки',
engdesc: 'Official support server',
}
module.exports.run = (message, ph) => message.author.send(ph[0]+':\n\nhttps://discord.gg' + '/3Ehpp5P')