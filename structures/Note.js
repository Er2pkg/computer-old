module.exports = class Note {
constructor(a, obj) {
this.user = obj.user?obj.user:null
this.id = obj.id || 1
this.idn = this.id.split('_')[1]
this.name = obj.name || ''
this.text = obj.text || ''
this._deleted = false
}
}