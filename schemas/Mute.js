module.exports = mongoose =>
new mongoose.Schema({
guild: String,
id: String,
inmute: {type: String, default: 0},
reason: {type: String, default: 'no reason'},
mute_time: {type: Date, default: 0},
unmute_time: {type: Date, default: 0},
})