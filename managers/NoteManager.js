const BaseManager = require('./BaseManager')
module.exports = class NoteManager extends BaseManager {
constructor(rows) {
super(rows, 'Note')
}
}