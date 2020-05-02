class Comp {
constructor() {
this.beta = process.env.beta || false
this.Discord = require('discord.js')
this.client = new this.Discord.Client({disableMentions: 'everyone'})
this.fs = require('fs')
this.ltypes = ['components', 'modules']
this.ltypes.forEach(type => this.fs.readdir('./'+type, (err, data) => {console.log('Loading', type); if(err) throw err; this[type] = new this.Discord.Collection(); let i = 0; data.forEach(d => {
i++, console.log('Loaded ', type.slice(0,-1), d.slice(0,-3))
this[type].set(d.slice(d.startsWith('-')?1:0,-3),{name: d.slice(d.startsWith('-')?1:0,-3), path: './'+type+'/'+d, run: (...args) => require('./'+type+'/'+d).run(...args), disabled: d.startsWith('-') })}); console.log('Loaded ',i,type); type==this.ltypes[1]?'':this[type].forEach(h => h.run()) }))}} global.Comp = new Comp()