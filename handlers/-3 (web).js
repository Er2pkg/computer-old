module.exports.run = () => {

console.log('Инициализация веб клиента...')

Comp.app.listen(8080, () => console.log('Веб клиент прослушивает порт 8080'))

Comp.app.get('/', (req, res) => 
res.send(`Stats of bot ${Comp.client.user.tag}: <br />
API ping: ${Math.floor(Comp.client.ping)} ms <br />
RAM: ${Math.floor(process.memoryUsage().rss / 1024 / 1024)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024)} MB <br />
Users: ${Comp.client.users.size} users <br />
Uptime: ${Math.floor(Comp.client.uptime / (1000 * 60 * 60))} hrs ${Math.floor(Comp.client.uptime / (1000 * 60)) % 60} minutes <br />
Turn on: ${Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)<br />
`))

Comp.client.admusers = []
Comp.client.arr = []

const addadmuser = (user, usermatch, pass, perms) => Comp.client.admusers.push({admuser: user, logen: usermatch, admpass: pass, perms: parseInt(perms) || 0,})

/*
*                                           AddAdminUser v. 1.01
*                                           ©Er2 (Ertu) 2019-2020
*Using: addadmuser('Display name', 'RegExp. Example: [yi]ande(k)?[xs]', 'Passw0rd', perms)
*
*          PERMISSIONS:
*0 - admin without any permissions :/
*1 - can view token
*2 - + can run eval commands
*3 - + can run shell commands (without eval commands)
*4 - + can run eval and shell commands
*5 - + can send messages
*6 - + can kill the client x(
*7 - reserved
*8 - + all permissions :)
*/

addadmuser('Testo', 'test([o0])?', 'Test0', 1)
addadmuser('Er2', 'y?er{1,}(tu|2)', 'im0dmensukka', 8)

Comp.app.get('/admin', (req, res) =>
res.send(`
<form action='/admpanel'>
<label>Login</label>
<input type='text' name='login'><br />
<label>Password</label>
<input type='password' name='pass'><br />
<input type='submit' value='Login'>
</form>
`))

Comp.app.get('/admpanel', (req, res) => {
const datas = req.query
let login = datas.login.toString().toLowerCase()
const pass = datas.pass,
admuser = Comp.client.admusers.find(u => login.match(new RegExp(u.logen))),
prpass = admuser.admpass
if(admuser && login.match(new RegExp(admuser.logen)) && admuser.perms > 0) {
login = admuser.admuser
let perms = admuser.perms
if(pass!==prpass) return res.send(`Error! Reason: Incorrect password for ${login}@computer`)
const desc = '<tr><td>User</td><td>Perms</td><td>Admin?</td></tr>'
Comp.client.arr = Comp.client.admusers.map(adm => `<tr><td><b>${adm.admuser}</b></td><td>${adm.perms==8?'8 (all)':adm.perms}${adm.perms==0?'(null)':''}</td><td>${adm.perms < 1? '-' : '+' }</td></tr>`)
res.send(`
Logged as ${login}@computer<br />
<a href='/admin'>LogOut</a> <a href='/'>Homepage</a> <a href='/users'>Users(admins)</a><br />
<details><summary>Show token</summary><input type='text' value='${Comp.client.token? Comp.client.token: 'Client was destroyed'}' readonly></details><br />
<details><summary>Users</summary><table border="1"> ${desc} ${Comp.client.arr.join('')} </table></details><br />
<form action='/shell'>
<label>Shell</label><br />
<input type='text' name='cmd' placeholder='Shell command' required ${perms > 2? '' : 'disabled'}>
<input type='hidden' name='login' value='${login}'>
<input type='hidden' name='pass' value='${pass}'>
<input type='submit' value='Run' ${perms > 2? '' : 'disabled'}>
</form><br />
<form action='/eval'>
<label>Eval</label><br />
<textarea name='cmd' cols='45' rows='10' placeholder='Eval command' required ${perms > 1 && perms !== 3? '' : 'disabled'}></textarea><br />
<input type='hidden' name='login' value='${login}'>
<input type='hidden' name='pass' value='${pass}'>
<input type='submit' value='Run' ${perms > 1 && perms !== 3? '' : 'disabled'}>
</form><br />
<form action='/send' method='post'>
<input type='text' name='id' placeholder='<#ID>' required ${perms > 4? '' : 'disabled'}><br />
<textarea name='msg' cols='45' rows='10' placeholder='Message' required ${perms > 4 && Comp.client.token? '' : 'disabled'}></textarea><br />
<input type='hidden' name='login' value='${login}'>
<input type='hidden' name='pass' value='${pass}'>
<input type='submit' value='Send it' ${perms > 4 && Comp.client.token? '' : 'disabled'}>
</form>
<form action='/kill' method='post'>
<input type='hidden' name='login' value='${login}'>
<input type='hidden' name='pass' value='${pass}'>
<input type='submit' value='Kill the client' ${perms > 5 && Comp.client.token? '' : 'disabled'}>
</form>
`);
} else res.send('Error! Reason: This user is not admin')
})

Comp.app.get('/eval', (req, res) => {
const datas = req.query
let login = datas.login.toString().toLowerCase()
const cmd = datas.cmd
const pass = datas.pass
const admuser = Comp.client.admusers.find(u => login.match(new RegExp(u.logen)))
prpass = admuser.admpass
if(admuser && login.match(new RegExp(admuser.logen))) {
login = admuser.admuser
if(pass!==prpass) return res.send(`Error! Reason: Incorrect password for ${login}@computer`)
if(!cmd) {
res.send('Where is command...')
setTimeout(() => { return res.redirect('back') }, 2000)
}
try {res.send(`//Successful ✅<br />${eval(cmd).toString().replace('\n', '<br />')}`)} catch (err) { res.send(`//Error ❎<br />${err.toString().replace('\n', '<br />')}`)}
} else res.send('Error! Reason: You haven\'t got needed permission to run eval commands')
})

Comp.app.get('/shell', async (req, res) => {
const datas = req.query
let login = datas.login.toString().toLowerCase()
const cmd = datas.cmd,
pass = datas.pass,
admuser = Comp.client.admusers.find(u => login.match(new RegExp(u.logen)))
if(admuser && login.match(new RegExp(admuser.logen))) {
const prpass = admuser.admpass
login = admuser.admuser
if(pass!==prpass) return res.send(`Error! Reason: Incorrect password of user ${login}`);
if(!cmd) {
res.send('Where is command...')
setTimeout(() => { return res.redirect('back') }, 2000)
}
res.send(await require('child_process').execSync(cmd).toString('utf8'))
} else res.send('Error! Reason: You not haven\'t got needed permission to run shell commands')
})

Comp.app.get('/users', (req, res) => {
const desc = '<tr><td>User</td><td>Perms</td><td>Admin?</td></tr>'
Comp.client.arr = Comp.client.admusers.map(adm => `<tr><td><b>${adm.admuser}</b></td><td>${adm.perms==8?'8 (all perms)':adm.perms}${adm.perms==0?'(null)':''}</td><td>${adm.perms<1? '-' : '+' }</td></tr>`)
res.send('<table border="1">' + desc +Comp.client.arr.join('') + '</table>');
})

Comp.app.use(Comp.express.urlencoded())

Comp.app.post('/kill', (req, res) => {
let login = req.body.login.toString().toLowerCase()
const pass = req.body.pass,
admuser = Comp.client.admusers.find(u => login.match(new RegExp(u.logen)))
if(admuser && login.match(new RegExp(admuser.logen))) {
const prpass = admuser.admpass
login = admuser.admuser
if(pass!==prpass) return /*res.send(`Error! Reason: Incorrect password for ${login}@computer`)*/
Comp.client.destroy().then(() => {
setTimeout(() => { res.redirect('back') }, 2000);
})
} else return /*res.send('Error! Reason: You not have permission destroy the client')*/;
})

Comp.app.post('/send', (req, res) => {
let login = req.body.login.toString().toLowerCase(),
id = req.body.id
const pass = req.body.pass,
msg = req.body.msg
if(id.includes('<#' && '>')) id = id.toString().slice(2, -1)
const admuser = Comp.client.admusers.find(u => login.match(new RegExp(u.logen)))
if(admuser && login.match(new RegExp(admuser.logen))) {
const prpass = admuser.admpass
login = admuser.admuser
if(pass!==prpass) return /*res.send(`Error! Reason: Incorrect password of user ${login}`)*/;
Comp.client.channels.find('id', id).send(msg).catch(err => console.error(err))
} else return /*res.send('Error! Reason: You not have permission destroy the client')*/;
})

console.log('Веб клиент инициализирован')

}
