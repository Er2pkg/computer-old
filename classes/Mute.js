module.exports = class Mute {
constructor(obj) {
this.guild = obj.guild
this.id = obj.id
this.inmute = obj.inmute || 0
this.reason = obj.reason || 'no reason'
this.mute_time = obj.mute_time || null
this.unmute_time = obj.unmute_time || null
}

get vals() {
return {guild: this.guild, id: this.id, inmute: this.inmute, reason: this.reason, mute_time: this.mute_time, unmute_time: this.unmute_time}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.inmute = val[0]
if(val[1]) this.reason = val[1]
if(val[2]) this.mute_time = val[2]
if(val[3]) this.unmute_time = val[3]
}

}