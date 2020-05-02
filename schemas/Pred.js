module.exports = db =>
new db.Schema({
id: String,
invite: {type: Number, default: 0},
spam: {type: Number, default: 0},
notRules: {type: Number, default: 0},
})