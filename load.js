class Comp {
constructor() {
this.beta = process.env.beta || false
this.Discord = require('discord.js')
this.client = new this.Discord.Client({disableMentions: 'everyone'})
this.fs = require('fs')
this.types = []
this.ltypes = ['components', 'modules']
this.ltypes.forEach(type => 
this.fs.readdir('./'+type, async (err, data) => {console.log('[   system] Loading<',type); if(err) throw err; let i = 0; await this.types.push({type: type, elements: data.map(d => {console.log('[   system] Loaded <', type.slice(0,-1), d.slice(0,-3)); return d})}); console.log('[   system] Loaded',data.length,type)
if(this.types.length==this.ltypes.length) {
this.types = new (require('./structures/TypeManager'))(this.types)
this.types.cache.forEach((i,d) => d==this.ltypes[1]?'':i.elements.filter(o=>!o.disabled).forEach(h => h.run()))
}}))}} global.Comp = new Comp()