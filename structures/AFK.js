module.exports = class AFK {
constructor(a, obj) {
this.yes = obj.yes || 0
this.reason = obj.reason
this.id = obj.id?obj.id:null
this._deleted = false
}
}