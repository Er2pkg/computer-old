module.exports = class Lang {
constructor(db) {
this.schema = new db.Schema({
id: String,
lang: {type: Number, default: 1},
})
return this.schema
}}