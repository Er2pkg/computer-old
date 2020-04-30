module.exports = class Ignore {
constructor(a, obj) {
this.id = obj.id?obj.id:null
this.yes = obj.yes || 0
this.reason = obj.reason || ''
this.time = obj.time || 0
this._deleted = false
}
}