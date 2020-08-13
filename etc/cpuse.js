class CPUse {
constructor(){
this.os = require('os')
Math.avg = arr => {arr = arr.filter(i => parseInt(i)).map(i => parseInt(i)); return arr.reduce((a,b)=>a+b, 0)/(arr.length<1?1:arr.length)}
}
usage = async cb => {
let f = this.getCPUtimes(), s, t, d, usages = []
const sleep = () => new Promise(r => setTimeout(r,500))
await sleep()
s = this.getCPUtimes()
await sleep()
t = this.getCPUtimes()
d = [f, s, t]
for(let i=0;i<f.length;i++) {
let fi = f[i]?f[i].idle:0, ft = f[i]?this.total(f[i]):0, si = s[i]?s[i].idle:0, st = s[i]?this.total(s[i]):0, ti = t[i]?t[i].idle:0, tt = t[i]?this.total(t[i]):0,
fu = 1-(si-fi)/(st-ft), su = 1-(ti-si)/(tt-st),
pu = (fu+su)/2*100
usages.push(pu.toFixed(1))}
if(cb && typeof cb == 'function') return cb(usages)
else return new Promise(r => r(usages))
}
usageAvg = async() => Math.avg(await this.usage()).toFixed(1)+'%'
getCPUtimes = () => this.os.cpus().map(i => i.times)
total = data => Object.values(data).reduce((a, b)=>a+b, 0)
}
module.exports = new CPUse()