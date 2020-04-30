module.exports = class XP {
constructor(a, obj) {
this.id = obj.id?obj.id:null
this.xp = obj.xp || 0
this.lvl = obj.lvl || 1
this.bg = obj.bg || 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg'
this.money = obj.money || 0
this.accent = obj.accent || null
this._deleted = false
}
}