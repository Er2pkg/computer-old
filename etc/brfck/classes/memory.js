module.exports = class Memory {
constructor(base) {
this.list = [0]
this.pointer = 0
this.base = base || 256
}
get current() {return this.list[this.pointer]}
set current(value) {this.list[this.pointer] = value % this.base; if (this.current < 0) this.list[this.pointer] += this.base; return this.list[this.pointer]}
get currentChar() {return String.fromCharCode(this.current)}
incrementPointer(index) {this.pointer++; if (this.list[this.pointer] == undefined) this.list.push(0); if (index) this.current = index % this.base; if (this.current < 0) this.current += this.base}
decrementPointer(index) {this.pointer--; if (this.pointer < 0) { this.pointer = 0; this.list.splice(0, 0, 0); } if (index) this.current = index % this.base}
increment() {this.current++}
decrement() {this.current--}
}