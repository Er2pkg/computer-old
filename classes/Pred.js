module.exports = class Pred {
constructor(obj) {
this.id = obj.id
this.invite = obj.invite || 0
this.spam = obj.spam || 0
this.notRules = obj.notRules || 0
}

get vals() {
return {id: this.id, invite: this.invite, spam: this.spam, notRules: this.notRules}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.invite = val[0]
if(val[1]) this.spam = val[1]
if(val[2]) this.notRules = val[2]
}

}