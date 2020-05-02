module.exports = db =>
new db.Schema({
user: String,
id: {type: Number, min: 1, default: 1},
name: {type: String, default: ''},
text: {type: String, default: ''},
})