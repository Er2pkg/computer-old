module.exports = class Note {
constructor(db) {
this.schema = new db.Schema({
user: String,
id: {type: Number, min: 1, default: 1},
name: {type: String, default: ''},
text: {type: String, default: ''},
})
return this.schema
}}