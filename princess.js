const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const princessWatch = async (message) => {
    if (
        (timeout === false) &&
        (
            message.content.toLowerCase().includes('good night') ||
            message.content.toLowerCase().includes('goodnight')
        )
    ) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.lineReply('princess')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        await timer(300000);
        timeout = false;
    } else if (
        (timeout === false) &&
        ( message.content.toLowerCase().includes('princess') )
    ) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.lineReply('Good night')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        await timer(300000);
        timeout = false;
    }
}

exports.princessWatch = princessWatch;