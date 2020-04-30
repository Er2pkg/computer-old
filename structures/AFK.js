module.exports = class AFK {
constructor(a, obj) {
this.id = obj.id?obj.id:null
this.yes = obj.yes || 0
this.reason = obj.reason
this._deleted = false
}
}