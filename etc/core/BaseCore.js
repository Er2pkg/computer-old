const Discord = require('discord.js')
class BaseCore extends Discord.Client {
constructor(token, options = {disableMentions: 'everyone'}, ver = {build: '1000', version: '1.0', builder: 'unknown', beta: false}) {
super(options)
if(!this.corever)
Object.defineProperty(this, 'corever', 
{writable: false, 
value: `v.${ver.version} Build ${ver.build} ${this.beta?'BETA ':''}by ${ver.builder}`
})
this.log('core', 'Starting Core',this.corever)
this.log('core', 'Our support server:', this.support)
Object.defineProperty(this, 'Discord', {value: Discord})
Object.defineProperty(this, 'client', {value: this})
Object.defineProperty(this, 'Core', {value: this})
this.login(token).catch(e => {throw e})
this.log('init', 'Starting init method...')
if(this.init && typeof this.init == 'function') {
this.init()
this.log('init', 'init method was started')
}
else this.log('init', 'init method is not found or not a function')
}

log(m = 'unknown', ...c){console.log(`[${this.space(m, 9, '-')}]`, ...c)}
space(i,len=3,ind='+',j=' '){i=i.split('');if(i.length>=len)return i.join('');else{ind=='+'?i.push(j):i.unshift(j); return this.space(i.join(''),len,ind,j)}}
destroy(user = 'unknown'){this.log('core', 'destroyed by', user); process.exit(0)}

get FS(){return require('./FS')}
get SmartRand(){return require('./SmartRand')}
get Base(){return require('./Base')}
get BaseManager(){return require('./BaseManager')}
get Collection(){return Discord.Collection}
}
module.exports = BaseCore