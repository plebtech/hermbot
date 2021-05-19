const { supDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const supWatch = async (message) => {
    if (message.content === ('sup') && (timeout === false)) {
        await timer(randomNumber(25, 750));
        message.lineReplyNoMention('nm u');
        timeout = true;
        await timer(supDelay);
        timeout = false;
    }
}

exports.supWatch = supWatch;