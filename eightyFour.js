const { eightyFourDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const eightyFourWatch = async (message) => {
    if ((timeout === false) &&
        ((message.content.toLowerCase().includes('1984')))) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.lineReplyNoMention('1984 is a great fiction novel to read but it seems like it is becoming the reality we are currently living under more and more each day.')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        await timer(eightyFourDelay);
        timeout = false;
    }
    if (message.content.toLowerCase().includes('1984') ||
        (message.content.toLowerCase().includes('nineteen eighty four'))) {
        try {
            message.react("1️⃣").then(() =>
                message.react("9️⃣").then(() =>
                    message.react("8️⃣").then(() =>
                        message.react("4️⃣"))));
        } catch { };
    }
}

exports.eightyFourWatch = eightyFourWatch;