module.exports = db =>
new db.Schema({
id: String,
AFK: {
isAFK: {type: Boolean, default: false},
reason: {type: String, default: ''},
},
profile: {
xp: {type: Number, default: 0},
lvl: {type: Number, min: 1, default: 1},
bg: {type: String, default: 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg'},
money: {type: Number, default: 0},
bank: {type: Number, default: 0},
euro: {type: Number, default: 0},
accent: {type: String, default: 'null'},
theme: {type: String, default: 'white'},
},
warns: {
invite: {type: Number, default: 0},
spam: {type: Number, default: 0},
notRules: {type: Number, default: 0},
},
queries: {
weather: {type: String, default: ''},
},
notes: [{
id: {type: Number, min: 1, default: 1},
name: {type: String, default: ''},
text: {type: String, default: ''},
}],
})