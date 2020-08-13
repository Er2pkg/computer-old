class FS {
constructor(){}
read(dir) {
return new Promise((res, rej) => {
require('fs').readdir(dir, (err, data) => {
if(err) return rej(err)
return res(data)
})})
}
}
module.exports = new FS