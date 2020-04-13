module.exports = class Lang {
constructor(obj) {
this.id = obj.id?obj.id:null
this.lang = obj.lang || 1
this._deleted = false
}

get vals() {
return {id: this.id, lang: this.lang}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.lang = val[0]
}

}