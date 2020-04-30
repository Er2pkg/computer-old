module.exports = class Lang {
constructor(a, obj) {
this.id = obj.id?obj.id:null
this.lang = obj.lang || 1
this._deleted = false
}
}