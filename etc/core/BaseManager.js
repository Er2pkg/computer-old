class BaseManager {
constructor(client, iterable, holds, cacheType = require('discord.js').Collection, ...cacheOptions) {
Object.defineProperty(this, 'holds', {value: holds})
Object.defineProperty(this, 'client', {value: client})
this.cacheType = cacheType
this.cache = new cacheType(...cacheOptions)
if (iterable)
for (const i of iterable) this.add(i)
}
add(data, cache = true, { id, extras = [] } = {}) {
const existing = this.cache.get(id || data.id)
if (existing && existing._patch && cache) existing._patch(data)
if (existing) return existing
const entry = this.holds?new this.holds(this.client, data, ...extras):data
if (cache) this.cache.set(id || entry.id, entry)
return entry
}
resolve(idOrInstance) {
if (idOrInstance instanceof this.holds) return idOrInstance
if (typeof idOrInstance == 'string')
return this.cache.get(idOrInstance) || null
return null
}
resolveID(idOrInstance) {
if (idOrInstance instanceof this.holds)
return idOrInstance.id
if (typeof idOrInstance == 'string')
return idOrInstance
return null
}
valueOf() {return this.cache}
}
module.exports = BaseManager