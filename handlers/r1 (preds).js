module.exports.run = message => {

//Анти-инвайт им. Сталина
Comp.invites = []
Comp.client.guilds.forEach(async guild => {
        if (message.author.id == Comp.owners.stalin || message.author.id == Comp.owners.lenin) return
        await guild.fetchInvites().then(i => i.forEach(invite => Comp.invites.push({guild: invite.guild.id, code: invite.code})))
    let matches = message.content.match(/discord(app\.com\/invite|.\w{2})\/\w{3,}/gi)
    if (matches)
        matches.forEach(match => {
            if (!Comp.invites.find(m => m.guild == message.guild.id && m.code == match.match(/discord(app\.com\/invite|.\w{2})\/(\w{3,})/i)[2])) {
            message.delete()
            message.xp = -30
if(message.glang === 1) message.author.send('```' + `Товарищ ${message.guild.member(message.author).displayName}, реклама запрещена.` + '```')
else message.author.send('```' + `Comrade ${message.member.displayName}, ads not allowed.` + '```')
Comp.con.query(`SELECT * FROM pred WHERE id = ${message.author.id}`, (err, rows) => {
Comp.send(Comp.client.users.get(Comp.owners.stalin), '```' + `Автор: товарищ ${(message.guild.member(message.author)?message.guild.member(message.author).displayName:message.author.tag)}\nСодержание: ${match}` + '```' + `${rows[0].invite + 1}/10`)
if(rows[0].invite >= 9){
if(!message.member.bannable || message.author.id == Comp.owners.lenin) Comp.con.query(`UPDATE pred SET invite = 0 WHERE id = ${message.author.id}`)
if(message.member.bannable && message.author.id!== Comp.owners.lenin) message.member.ban('Оставляет инвайты, товарищи Ленин и Сталин.')
} else Comp.con.query(`UPDATE pred SET invite = ${rows[0].invite+1}  WHERE id = ${message.author.id}`)
})}})})

//Анти-спам система им. Сталина
const collector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 }); collector.on('collect', msg => {const collecto = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 4000 }); collecto.on('collect', msg2 => {const collect = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 2000 })
            collect.on('collect', msg3 => {
               if(message.member.hasPermission('ADMINISTRATOR') || message.channel.id == '693046024146518107') return
                if (!Comp.warnedFlood.has(message.author.id)) {
                    if(message.glang === 1) message.reply('прошу, не спамьте.')
                     else message.reply('please, do not spamming.')
                    Comp.warnedFlood.add(message.author.id)
                    setTimeout(() => { Comp.warnedFlood.delete(message.author.id) }, 5500)
                } 
            })
        })
    })
const mut = message.guild.roles.find(r => r.name.match(/[Mm]ut[ei][dt]|Замученные/))

    if (Comp.warnedFlood.has(message.author.id)) {
        Comp.warnedFlood.delete(message.author.id)
        const collectorr = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 3000 })
            collectorr.on('collect', msg3 => {
                if (!message.member.roles.has(mut)) {
message.member.addRole(mut.id)
message.xp = -50
                    if(message.glang === 1) message.reply('Всё в порядке? Ты был наказан на час.')
                    else message.reply('All ok? You will muted on 1 hour.')
Comp.con.query('SELECT * FROM zamuchen WHERE id='+message.author.id+' AND guild='+message.guild.id, (err, rows) => {
let zamutil = 0
            if(rows.length < 1) zamutil==0?(Comp.con.query(`INSERT INTO zamuchen (id, guild, inmute, reason, mute_time, unmute_time) VALUES (${message.author.id}, ${message.guild.id}, 1, 'flood', ${Date.now()}, ${Date.now()+3600000})`), zamutil = 1):''
                    else Comp.con.query('UPDATE zamuchen SET imute=1, reason=\'flood\', mute_time='+Date.now()+', unmute_time='+(Date.now()+3600000)+' WHERE id='+message.author.id+', guild='+message.guild.id)
})
                    if(message.glang === 1) message.author.send('Доигрался? Ты был наказан на час.')
                    else message.author.send('All ok? You will muted on 1 hour.')
Comp.con.query(`SELECT * FROM pred WHERE id=${message.author.id}`, (err, rows) => {
                   Comp.send(Comp.client.users.get(Comp.owners.stalin), 'Товарищ '+(message.guild.member(message.author)?message.guild.member(message.author).displayName:message.author.tag)+ ' спамит. '+(rows[0].spam + 1)+'/10')
if(rows[0].spam >= 9)
if(!message.author.bannable || message.author.id === Comp.owners.lenin) Comp.con.query('UPDATE pred SET spam=0 WHERE id='+message.author.id)
else message.member.ban('Ультра спамер'), Comp.con.query(`DELETE FROM pred WHERE id=${message.author.id}`)
                 else {
Comp.con.query(`UPDATE pred SET spam=${rows[0].spam?rows[0].spam+1:1} WHERE id=${message.author.id}`)
                    const collectoor = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 2000 })
                    collectoor.on('collect', msg4 => {
                        const coollector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 3000 })
                    coollector.on('collect', msg5 => {
                if (message.glang === 1 && message.member.bannable && message.author.id!==Comp.owners.lenin) message.member.ban('Ультра спамер') && message.reply('вы были забанены за спам.').catch()
                if (message.glang === 2 && message.member.bannable && message.author.id!==Comp.owners.lenin) message.member.ban('Spamming') && message.reply('you get ban for spamming.').catch()
})})}})}})}

}