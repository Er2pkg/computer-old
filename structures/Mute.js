module.exports = class Mute {
constructor(a, obj) {
this.guild = obj.guild?obj.guild:0
this.id = obj.id?obj.id:0
this.iid = this.id.split('_')[1]
this.inmute = obj.inmute || 0
this.reason = obj.reason || 'no reason'
this.mute_time = obj.mute_time || null
this.unmute_time = obj.unmute_time || null
this._deleted = false
}
}