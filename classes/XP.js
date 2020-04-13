module.exports = class XP {
constructor(obj) {
this.id = obj.id?obj.id:null
this.xp = obj.xp || 0
this.lvl = obj.lvl || 1
this.bg = obj.bg || 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg'
this.money = obj.money || 0
this._deleted = false
}

get vals() {
return {id: this.id, xp: this.xp, lvl: this.lvl, bg: this.bg, money: this.money}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.xp = val[0]
if(val[1]) this.lvl = val[1]
if(val[2]) this.bg = val[2]
if(val[3]) this.money = val[3]
}

}