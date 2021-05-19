// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let delay = 15000;
let timeout = false;

if (message.content === ('sup') && (timeout === false)) {
    message.channel.send('nm u');
    timeout = true;
    await timer(delay);
    timeout = false;
}