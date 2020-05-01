module.exports = class Ignore {
constructor(db) {
this.schema = new db.Schema({
id: String,
yes: {type: Number, default: 0},
reason: {type: String, default: ''},
time: {type: Date, default: 0},
})
return this.schema
}}