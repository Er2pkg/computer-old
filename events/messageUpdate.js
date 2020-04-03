module.exports.run = (x, message) => {
if(x.content !== message.content) Comp.client.emit('message', message)
}