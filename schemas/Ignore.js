module.exports = db =>
this.schema = new db.Schema({
id: String,
yes: {type: Number, default: 0},
reason: {type: String, default: ''},
time: {type: Number, default: 0},
})