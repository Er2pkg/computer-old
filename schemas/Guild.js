module.exports = db =>
new db.Schema({
id: String,
lang: {type: Number, min: 1, max: 2, default: 1},
modules: {type: Array, default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
})