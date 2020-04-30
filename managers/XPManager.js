const BaseManager = require('./BaseManager')
module.exports = class XPManager extends BaseManager {
constructor(rows) {
super(rows, 'XP')
}
}