module.exports.info = {
name: 'инвайт',
engname: 'invite',
regex: 'инвай[тд]',
engregex: 'inv(a)?i[td]',
desc: 'Пригласите этого бота на ваш сервер',
engdesc: 'Invite this bot to your server',
}
module.exports.run = message => message.reply(`\nhttps://discordapp.com/api/oauth2/authorize?client_id=${Comp.client.user.id}&permissions=8&scope=bot`)