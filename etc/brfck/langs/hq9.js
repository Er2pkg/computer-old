module.exports = class HQ9P {
constructor() {
this.names = ['hq9', 'hq9p', 'hqn', 'hqnp']
this.regex = '[^HQ9P\+]'
this.cmds = {
'H': (a, ths) => ths.output += 'Hello, World!\n',
'Q': (a, ths) => ths.output += ths.code+'\n',
'9': (a, ths) => {
for(let i=99;i>1;i--) ths.output += `${i} bottles of beer on the wall, ${i} bottles of beer.
Take one down, pass it around, ${i-1} bottles on the wall!
`
ths.output += `1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.

No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.
`
},
'P': memory => memory.increment(),
'+': memory => memory.increment(),
}
}}