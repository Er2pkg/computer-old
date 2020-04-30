const BManager = require('discord.js').BaseManager,
Structures = require('../structures/list')
module.exports = class BaseManager extends BManager {
constructor(rows, structure) {
super(Comp.client, rows, (typeof structure == 'string'?Structures.get(structure):structure))
this.Structures = Structures
}
}