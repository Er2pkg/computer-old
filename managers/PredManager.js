const BaseManager = require('./BaseManager')
module.exports = class PredManager extends BaseManager {
constructor(rows) {
super(rows, 'Pred')
}
}