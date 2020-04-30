const BaseManager = require('./BaseManager')
module.exports = class IgnoreManager extends BaseManager {
constructor(rows) {
super(rows, 'Ignore')
}
}