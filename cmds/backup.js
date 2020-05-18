module.exports = {
info: {
name: 'бекап',
engname: 'backup',
regex: 'бь?[еэ]ка[пб]',
engregex: 'b[ae]c?k[ua]p',
desc: 'Перенос данных на новую базу',
engdesc: 'Transfer the data to new DB',
},
run: async (message, ph) => {
let f = {id: message.author.id}
let nu = await Comp.models.get('User').findOne(f),
afk = await Comp.models.get('AFK').findOne(f),
xp = await Comp.models.get('XP').findOne(f),
warns = await Comp.models.get('Pred').findOne(f),
notes = await Comp.models.get('Note').find({user: message.author.id})

if(!nu) nu = new (Comp.models.get('User'))(f)

if(afk)
nu.AFK = {
isAFK: (afk.yes==2),
reason: afk.reason||''
}

if(xp)
nu.profile = {
xp: xp.xp,
lvl: xp.lvl,
bg: xp.bg,
money: xp.money,
bank: xp.bank,
euro: xp.euro,
accent: xp.accent,
theme: xp.theme
}

if(warns)
nu.warns = {
invite: warns.invite,
spam: warns.spam,
notRules: warns.notRules
}

if(notes[0]) {
nu.notes = []
for(let i of notes)
nu.notes.push({
id: i.id,
name: i.name,
text: i.text
})
}

nu.save()
message.channel.send(Comp.succ('', message.lang))
}
}