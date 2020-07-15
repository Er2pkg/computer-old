process.stdin.setEncoding('utf8')
class SplitLocale {
constructor() {
this.fs = require('fs')
this.path = require('path')
this.step = 0
this.ch, this.f, this.fi
this.date = []
this.opts = {depth: null, breakLength: Infinity, compact: false}
this.loadstep()
}
after(alet=false){return `${alet?'let ':''}langs = Object.keys(locale)
for(let x of langs)
for(let i of Object.keys(locale[x]))
locale[x][i] = parse(locale[x][i], {a: locale[x].at, l: locale[x].line, loc: locale})`}

get dat(){return new Date(this.date[this.step]).toISOString()}

wf(dir, fi, ext, con) {
try {
this.fs.writeFileSync(this.path.join(__dirname, dir, fi)+'.'+ext, con)
}
catch(a) {
console.log(a)
}
}

loadstep() {
this.date[this.step]=Date.now()
console.log(`Step ${this.step+1}/5`)
switch(this.step) {
case 0:
console.log('What action do you need? Split/Combine')
break
case 1:
console.log('What folder do you need to '+(this.ch=='S'?'split':'combine')+'?')
break
case 2:
console.log('What '+(this.ch=='S'?'input':'output')+' file?')
break
case 3:
if(this.ch=='S') {
let l = this.after().split('\n').length+3
let file = this.fs.readFileSync(this.path.join(__dirname, this.fi)+'.js')
.toString('utf8')
.split('\n')
if([this.after(), this.after(true)].find(i=>i.split('\n')[0]==file[file.length-l]))
file.splice(-(l-1), l-1, '}')
else file.splice(-2, 2, '}')
file = eval(file.join('\n')+'\nlocale')
for(let i of Object.keys(file)) {
if(i=='builded') continue
console.log('Found locale', i)
//file[i].builded = this.dat
this.wf(this.f, i, 'json', JSON.stringify(file[i]))
}}
else {
let locale = {}
//locale.builded = this.dat
this.fs.readdirSync(this.path.join(__dirname, this.f))
.filter(i=>!i.startsWith('-'))
.map(i=>i.endsWith('.json')?i.slice(0,-5):i)
.forEach(i=>{
console.log('Found locale', i)
locale[i]=require(this.path.join(__dirname, this.f, i))
delete locale[i].builded
})
this.wf('./', this.fi, 'js',
`let locale = ${require('util').inspect(locale, this.opts)}
module.exports = locale`)
}
this.step++
this.loadstep()
break
case 4:
console.log('Done!')
console.log('Made for '+((Date.now()-this.date[3])/1000)+' seconds (step 4).')
console.log('Script runs '+((Date.now()-this.date[0])/1000)+' seconds')
process.exit(1)
break
}
}
message(chunk) {
if(chunk==null) return
chunk = chunk.endsWith('\n')?chunk.split('').slice(0,-1).join(''):chunk
switch(this.step) {
case 0:
if(process.env.act && !chunk)
chunk = process.env.act
if(chunk.match(/[Ss](plit)?/gim))
this.ch = 'S'
else
if(chunk.match(/[Cc](ombine?)?/gim))
this.ch = 'C'
else console.log('Choose Split or Combine')
if(this.ch)
this.step++
break
case 1:
if(process.env.f && !chunk)
chunk = process.env.f
this.f = chunk
if(this.ch=='S')
if(!this.fs.existsSync(this.path.join(__dirname, this.f)))
this.fs.mkdirSync(this.path.join(__dirname, this.f))
this.step++
break
case 2:
if(process.env.fi && !chunk)
chunk = process.env.fi
this.fi = chunk
this.fi.endsWith('.js')?this.slice(0,-3):''
this.step++
break
case 3: break
}
this.loadstep()
}
}
global.sl = new SplitLocale

process.stdin.on('readable', () => {
for(let chunk=process.stdin.read();chunk!==null;chunk=process.stdin.read())
sl.message(chunk)
})
//CTRL+D
process.stdin.on('end', () =>
console.log('end'))