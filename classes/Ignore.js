module.exports = class Ignore {
constructor(obj) {
this.id = obj.id?obj.id:null
this.yes = obj.yes || 0
this.reason = obj.reason || ''
this.time = obj.time || 0
this._deleted = false
}

get vals() {
return {id: this.id, yes: this.yes, reason: this.reason, time: this.time}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.yes = val[0]
if(val[1]) this.reason = val[1]
if(val[2]) this.time = val[2]
}

}