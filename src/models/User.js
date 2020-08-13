module.exports = db =>
db.model('User', new db.Schema({
id: String,
AFK: {
isAFK: {type: Boolean, default: false},
reason: {type: String, default: ''},
},
profile: {
xp: {type: Number, min: 0, default: 0},
bg: {type: String, default: 'https://cdn.discordapp.com/attachments/696688365847707681/732628630727032923/unknown.png'},
money: {type: Number, default: 0},
bank: {type: Number, default: 0},
euro: {type: Number, default: 0},
accent: {type: String, default: 'null'},
theme: {type: String, default: 'dark'},
},
queries: {
weather: {type: String, default: ''},
},
notes: [{
name: {type: String, default: ''},
text: {type: String, default: ''},
}],
}))