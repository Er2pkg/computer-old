module.exports.info = {
name: 'ссср',
engname: 'ussr',
desc: 'Показывает символику СССР',
engdesc: 'Displays symbolic of USSR',
regex: 'э?с{2,}р',
engregex: 'y?us{2,}r',
}
module.exports.run = (message, ph) => message.channel.send(ph[0], { files: ['./assets/flag.png', './assets/gerb.png']})