/*
Thanks to
 https://gist.github.com/samuelfvlcastro/965ca9b9e4036eafe56c5b1d1405b754
*/

class RLE {
constructor(){}

Encode = data => {
let i = 0, c = 1, res = ''
for(; i<=data.length; c++, i++) {
if(data[i] !== data[i+1])
res += (c!==1?c:'') + data[i],
c = 0
}
return res
}

Decode = data => data.replace(/((\d+)?\D{1})/g, m =>
m.slice(-1).repeat(parseInt(m.slice(0, -1))||1))
}
module.exports = new RLE