module.exports.run = () => {

console.log('Инициализация переменных...')

//Отсталые, стрелки не саппортит :-1:
Array.prototype.has = function(int) {return this.find(i => i == int)}

Comp.permissions = {
FLAGS: {
  CREATE_INSTANT_INVITE: 1 << 0,
  KICK_MEMBERS: 1 << 1,
  BAN_MEMBERS: 1 << 2,
  ADMINISTRATOR: 1 << 3,
  MANAGE_CHANNELS: 1 << 4,
  MANAGE_GUILD: 1 << 5,
  ADD_REACTIONS: 1 << 6,
  VIEW_AUDIT_LOG: 1 << 7,
  PRIORITY_SPEAKER: 1 << 8,
  STREAM: 1 << 9,
  VIEW_CHANNEL: 1 << 10,
  READ_MESSAGES: 1 << 10,
  SEND_MESSAGES: 1 << 11,
  SEND_TTS_MESSAGES: 1 << 12,
  MANAGE_MESSAGES: 1 << 13,
  EMBED_LINKS: 1 << 14,
  ATTACH_FILES: 1 << 15,
  READ_MESSAGE_HISTORY: 1 << 16,
  MENTION_EVERYONE: 1 << 17,
  EXTERNAL_EMOJIS: 1 << 18,
  USE_EXTERNAL_EMOJIS: 1 << 18,
  CONNECT: 1 << 20,
  SPEAK: 1 << 21,
  MUTE_MEMBERS: 1 << 22,
  DEAFEN_MEMBERS: 1 << 23,
  MOVE_MEMBERS: 1 << 24,
  USE_VAD: 1 << 25,
  CHANGE_NICKNAME: 1 << 26,
  MANAGE_NICKNAMES: 1 << 27,
  MANAGE_ROLES: 1 << 28,
  MANAGE_ROLES_OR_PERMISSIONS: 1 << 28,
  MANAGE_WEBHOOKS: 1 << 29,
  MANAGE_EMOJIS: 1 << 30,
}
}

Comp.db = {
host: process.env.DBhost,
user: process.env.DBuser,
password: process.env.DBpass,
database: process.env.DBuser,
}
Comp.os = require('os')
Comp.Discord = require("discord.js")
Comp.client = new Comp.Discord.Client({disableEveryone: true})
Comp.mysql = require('mysql2')
Comp.jimp = require('jimp')
Comp.fs = require('fs')
Comp.locales = require('../locales.json')
Comp.warnedFlood = new Set()
Comp.unxp = new Set()
Comp.muted = '561165692896804895'

Comp.client.login(process.env.ClientToken).then(() => delete process.env.ClientToken).catch()

Comp.owners = {
'stalin': '544031928358273045',
'lenin': '441954631539490857',
}

Comp.xpFormule = lvl => (5 * (lvl ^ 2) + 50 * lvl + 100)
Comp.send = (id, message) => id.send(message)
Comp.addCommas = int => `${int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
Comp.random = (min, max) => Math.floor(Math.random()*(max-min+1))+min
Comp.declOfNum = (number, titles, hmm) => (hmm && hmm == 1?Comp.addCommas(number)+' ':'') + titles[(number % 100 > 4 && number % 100 < 20)?2:[2, 0, 1, 1, 1, 2][(number % 10 < 5)?number % 10 : 5]]

console.log('Переменные инициализированы')

}
