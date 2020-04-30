const BaseManager = require('./BaseManager')
module.exports = class MuteManager extends BaseManager {
constructor(rows) {
super(rows, 'Mute')
}
}