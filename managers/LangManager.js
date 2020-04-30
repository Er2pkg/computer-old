const BaseManager = require('./BaseManager')
module.exports = class LangManager extends BaseManager {
constructor(rows) {
super(rows, 'Lang')
}
}