const Main = require('./classes/main')
class Brfck extends Main {

exec = (code, input = '', lang = 'brf', ...a) => {
if(code.startsWith('CC') && this.getLang(code.slice(-6, -3)))
lang = code.slice(-6, -3)
let llang = this.getLang(lang)
if(!llang) throw new this.Error('Language is not found', new this.Result)
if(code.startsWith('ZC'))
code = this.unzip(code)
return super.exec(code, input, lang, ...a)
}
run = this.exec
execute = this.exec
zip = (code, lang = 'brf', lz77, winLen) => {
if(code.startsWith('ZC')) throw new this.Error('I can\'t zip zipped code', new this.Result())
let llang = this.getLang(lang)
if(!llang) throw new this.Error('Language is not found', new this.Result())
super.exec(code, '', lang) //SyntaxCheck
let codde = this.genCC(code)
if(lz77)
code = this.LZ77.Encode(code, winLen)
code = this.RLE.Encode(code)
return 'ZC'+code+llang.names[0].toUpperCase()+codde
}
unzip = code => {
if(!code.startsWith('ZC')) throw new this.Error('I can\'t unzip unzipped code', new this.Result())
let cc = code.slice(-3)
code = this.LZ77.Decode(this.RLE.Decode(code.slice(2, -6)))
if(this.check(code, cc)!=='ok') throw new this.Error('Signature check error', new this.Result())
return code
}
check = (code, cc) => {let ccode = (cc?cc:code.slice(-3)).toString();if(!ccode.match(/[0-9]{3}/gim)) return 'no check code';if(this.genCC(code) == ccode) return 'ok';else return 'not ok'}
genCC = code => {code = code.length.toString();if(code.length == 1) code+='00';if(code.length == 2) code+='0';if(code.length >= 4) code=code.slice(-3);return code}

get clone(){return Object.assign(Object.create(this), this)}
}
module.exports = new Brfck