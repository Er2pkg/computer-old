const BaseManager = require('./BaseManager')
module.exports = class AFKManager extends BaseManager {
constructor(rows) {
super(rows, 'AFK')
}
}