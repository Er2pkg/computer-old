module.exports = class BFerror extends Error {
constructor(message, result){
super(message)
this.result = result
this.name = 'BrfckError'
}}