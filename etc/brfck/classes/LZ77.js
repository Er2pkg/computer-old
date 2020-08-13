/*
Thanks to
 http://www.geocities.ws/diogok_br/lz77
*/

class LZ77 {
constructor(){
this.RefPref = '`'
this.RefPrefCode = this.RefPref.charCodeAt(0)
this.RefIntBase = 96
this.RefIntFlrCode = ' '.charCodeAt(0)
this.RefIntCeilCode = this.RefIntFlrCode + this.RefIntBase - 1
this.MaxStrDist = Math.pow(this.RefIntBase, 2) - 1
this.MinStrLen = 5
this.MaxStrLen = Math.pow(this.RefIntBase, 1) - 1 + this.MinStrLen
this.MaxWinLen = this.MaxStrDist + this.MinStrLen
}

Encode = (data, winLen = this.MaxWinLen) => {
if(winLen > this.MaxWinLen)
throw 'Window length too large'
data = data.toString()
let compressed = '', pos = 0,
lastPos = data.length - this.MinStrLen
while (pos < lastPos) {
let searchStart = Math.max(pos - winLen, 0),
matchLen = this.MinStrLen,
foundMatch = false,
bestMatch = {distance: this.MaxStrDist, length: 0},
newCompressed = null
while ((searchStart + matchLen) < pos) {
let isValidMatch = (
(data.substr(searchStart, matchLen) == data.substr(pos, matchLen)) &&
(matchLen < this.MaxStrLen))
if (isValidMatch)
matchLen++,
foundMatch = true
else {
let realMatchLen = matchLen - 1
if (foundMatch && (realMatchLen > bestMatch.length)) {
bestMatch.distance = pos - searchStart - realMatchLen
bestMatch.length = realMatchLen
}
matchLen = this.MinStrLen
searchStart++
foundMatch = false
}}
if (bestMatch.length) {
newCompressed = this.RefPref
+ this.encodeRefInt(bestMatch.distance, 2)
+ this.encodeRefLen(bestMatch.length)
pos += bestMatch.length
} else {
if (data.charAt(pos) != this.RefPref)
newCompressed = data.charAt(pos)
else
newCompressed = this.RefPref.repeat(2)
pos++
}
compressed += newCompressed
}
return compressed + data.slice(pos).replace(/`/g, "``")
}

Decode = data => {
let decomp = '', pos = 0
while (pos < data.length) {
let curChr = data.charAt(pos)
if (curChr != this.RefPref)
decomp += curChr, pos++
else {
let nextChr = data.charAt(pos + 1)
if (nextChr != this.RefPref) {
let dist = this.decodeRefInt(data.substr(pos + 1, 2), 2),
len = this.decodeRefLen(data.charAt(pos + 3))
decomp += decomp.substr(decomp.length - dist - len, len)
pos += this.MinStrLen - 1
} else
decomp += this.RefPref,
pos += 2
}}
return decomp
}

encodeRefInt(value, width) {
if ((value >= 0) && (value < (Math.pow(this.RefIntBase, width) - 1))) {
let encoded = ''
for(; value > 0; value=Math.floor(value / this.RefIntBase))
encoded = (String.fromCharCode((value % this.RefIntBase) + this.RefIntFlrCode)) + encoded

let mLen = width - encoded.length
for (let i = 0; i < mLen; i++)
encoded = String.fromCharCode(this.RefIntFlrCode) + encoded
return encoded
} else
throw `Reference int out of range: ${value} (width = ${width})`
}
decodeRefInt(data, width) {
let value = 0
for (let i = 0; i < width; i++) {
value *= this.RefIntBase
let chrCode = data.charCodeAt(i)
if ((chrCode >= this.RefIntFlrCode) && (chrCode <= this.RefIntCeilCode))
value += chrCode - this.RefIntFlrCode
else
throw `Invalid char code in reference int: ${chrCode}`
}
return value
}
encodeRefLen(length) {
return this.encodeRefInt(length - this.MinStrLen, 1)
}
decodeRefLen(data) {
return this.decodeRefInt(data, 1) + this.MinStrLen
}

}
module.exports = new LZ77