const { supDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const supWatch = async (message) => {
    if (message.content === ('sup') && (timeout === false)) {
        let timerDelay = randomNumber(25, 750);
        await timer(timerDelay);
        message.lineReplyNoMention('nm u');
        timeout = true;
        await timer(supDelay);
        timeout = false;
    }
}

exports.supWatch = supWatch;