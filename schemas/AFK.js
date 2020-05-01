module.exports = mongoose =>
new mongoose.Schema({
id: String,
yes: {type: Number, default: 1},
reason: {type: String, default: ''},
})