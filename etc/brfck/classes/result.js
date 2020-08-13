module.exports = class Result {
constructor(output, memory, steps, time){
this.output = output || ''
this.memory = memory || null
this.steps = steps || 0
this.time = time?Date.now()-time:0
}}