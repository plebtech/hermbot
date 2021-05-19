const { supDelay } = require('./config.json');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const supWatch = async (message) => {
    if (message.content === ('sup') && (timeout === false)) {
        message.lineReplayNoMention('nm u');
        timeout = true;
        await timer(supDelay);
        timeout = false;
    }
}

exports.supWatch = supWatch;