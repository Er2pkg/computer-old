module.exports = db =>
new db.Schema({
id: String,
xp: {type: Number, default: 0},
lvl: {type: Number, min: 1, default: 1},
bg: {type: String, default: 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg'},
money: {type: Number, default: 0},
accent: {type: String, default: 'null'},
})