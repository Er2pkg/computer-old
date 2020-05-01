module.exports = class AFK {
constructor(db) {
this.schema = new db.Schema({
id: String,
yes: {type: Number, default: 1},
reason: {type: String, default: ''},
})
return this.schema
}}