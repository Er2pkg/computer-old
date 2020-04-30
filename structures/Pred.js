module.exports = class Pred {
constructor(a, obj) {
this.id = obj.id?obj.id:null
this.invite = obj.invite || 0
this.spam = obj.spam || 0
this.notRules = obj.notRules || 0
this._deleted = false
}
}