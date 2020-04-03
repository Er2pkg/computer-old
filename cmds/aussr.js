module.exports.info = {
name: 'СССР',
engname: 'USSR',
desc: 'Показывает символику СССР',
engdesc: 'Displays symbolic of USSR',
regex: '/(э)?сс(с)?р/',
engregex: '/(y)?uss(s)?r/',
}
module.exports.run = (message, ph) => message.channel.send(ph[0], { files: ['./assets/flag.png', './assets/gerb.png']})