module.exports = mongoose =>
new mongoose.Schema({
id: String,
yes: {type: Number, default: 0},
reason: {type: String, default: ''},
time: {type: Date, default: 0},
})