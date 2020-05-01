module.exports = mongoose =>
new mongoose.Schema({
id: String,
lang: {type: Number, default: 1},
})