const Base = (require('discord.js')).Base
module.exports = class Locale extends Base {
constructor(a, data) {
super(a)
this.category = data.category
this.ru = data.ru
this.en = data.en
}}