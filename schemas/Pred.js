module.exports = class Pred {
constructor(db) {
this.schema = new db.Schema({
id: String,
invite: {type: Number, default: 0},
spam: {type: Number, default: 0},
notRules: {type: Number, default: 0},
})
return this.schema
}}