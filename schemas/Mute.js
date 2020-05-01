module.exports = class Mute {
constructor(db) {
this.schema = new db.Schema({
guild: String,
id: String,
inmute: {type: String, default: 0},
reason: {type: String, default: 'no reason'},
mute_time: {type: Number, default: 0},
unmute_time: {type: Number, default: 0},
})
return this.schema
}}