module.exports.run = () => {

console.log('Запуск модуля мониторингов...')

//SDC
Comp.SDC = require("@megavasiliy007/sdc-api")
Comp.SDC = new Comp.SDC(process.env.SDCtoken)
delete process.env.SDCtoken
Comp.SDC.setAutoPost(Comp.client)

console.log('Модуль мониторингов запущен')
}