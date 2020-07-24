module.exports.info = {
name: 'перевод-раскладки',
engname: 'keyboard-translator',
regex: 'п[еи]р[еи]во[дт]-р[ао]скла[дт]кь?и',
engregex: 'k(ey)?b(oard)?-tr(anslator)?',
desc: 'Переводит с русской в английскую раскладку и назад',
engdesc: 'Translates from Russian to English layout and back',
args: '<текст>',
engargs: '<text>',
}
module.exports.run = (message, ph) => {
let ne = false
if(message.flags.has('noembed') || !message.guild.me.hasPermission('EMBED_LINKS'))
ne = true
if(!message.args[0]) return message.channel.send(Comp.err(ph[0], ph[1], 'ghbdtn', message.lang, ne))
let replacer = {"q":"й", "w":"ц","e":"у","r":"к", "t":"е", "y":"н", "u":"г","i":"ш", "o":"щ", "p":"з" , "[":"х" , "]":"ъ", "a":"ф", "s":"ы","d":"в" , "f":"а"  , "g":"п" , "h":"р" , "j":"о", "k":"л", "l":"д",";":"ж" , "'":"э"  , "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и","n":"т" , "m":"ь"  , ",":"б" , ".":"ю" , "/":"."},
eng = Object.keys(replacer),
rus = Object.values(replacer),
str = message.args.join(' ').split('')
for(let i = 0; i < str.length; i++){
if(rus.find(x => x === str[i].toLowerCase()) || eng.find(x => x === str[i].toLowerCase())) {
let rusfind = rus.find(x => x === str[i].toLowerCase())
let engfind = eng.find(x => x === str[i].toLowerCase())
let rstr
if(rusfind) rstr = eng[rus.findIndex(x => x === str[i].toLowerCase())]
else rstr = replacer[engfind]
if(str[i] !== str[i].toLowerCase()) rstr = rstr.toString().toUpperCase()
if(rusfind || engfind) str[i] = rstr
} else if(str[i].toLowerCase() === 'ё') str[i] = (str[i] === str[i].toLowerCase()?'t':'T')
}
message.channel.send(Comp.succ(str.join('').replace(/(http:\/\/|https:\/\/)?discord(app\.com\/invite|.\w{2}\/\w{3,})/gi, '[INVITE]'), message.lang, ne))
}