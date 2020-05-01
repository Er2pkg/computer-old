module.exports = mongoose =>
new mongoose.Schema({
user: String,
id: {type: Number, default: 1},
name: {type: String, default: ''},
text: {type: String, default: ''},
})