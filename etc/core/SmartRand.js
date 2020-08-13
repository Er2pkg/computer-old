class SmartRand {
constructor(arr) {
this.arr = []
if(arr)
for(let i of arr) this.add(i)
}
static rnd(b){
return Math.floor(Math.random()*b/10)
}
rand(){
if(this.arr.length==0)
return {con: undefined, uses: 1}
let a = this.arr
.sort((a,b)=>a.uses-b.uses),
b = this.constructor.rnd(this.arr.length-1)-this.constructor.rnd(5)%(this.arr.length-1)
a=a[b]
a.uses++
return a
}
randomize(){return this.rand()}
add(data) {
if(this.arr.find(i => i == data))
return data
this.arr.push({con: data, uses: 0})
return {con: data, uses: 0}
}
clear(){this.arr=[];return this}
test(nums = 200, ops = 100) {
const srand = new this.constructor,
reps = []
for(let u=1;u<=nums;u++)
srand.add(u)
for(let op=0;op<ops;op++) {
let last = srand.rand()
if(last.uses>1) {
let rep = {
number: last.con,
uses: last.uses,
repeats: srand.arr.filter(i=>i.uses>1).length,
operations: op
}
console.log(rep)
reps.push(rep)
}
}
let a = []
for(let o=2,p=true;p==true;o++) {
let d = srand.arr.filter(x=>x.uses==o).length
if(d>0)
a.push((o-1)+' rep.: '+d)
else
p=false
}
let diag = 'For '+ops+' operations was randomed '+srand.arr.filter(i=>i.uses>0).length+' numbers of '+srand.arr.length+', '+srand.arr.filter(i=>i.uses>1).length+' was repeated.\nStatistics:\n'+(a.join('\n')||'None')
console.log(diag)
return {
repeats: reps,
diagnostic: diag
}

}
}
module.exports = SmartRand