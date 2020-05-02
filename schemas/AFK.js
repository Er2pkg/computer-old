module.exports = db =>
new db.Schema({
id: String,
yes: {type: Number, default: 1},
reason: {type: String, default: ''},
})