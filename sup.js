const { supDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const supWatch = async (message) => {
    if (
        message.content === ('sup') &&
        (timeout === false)
    ) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.reply('nm u').then(msg => {
            setTimeout(() => msg.delete(), (1000 * 60))
        })
            .catch();
        await timer(supDelay);
        timeout = false;
    }
}

exports.supWatch = supWatch;