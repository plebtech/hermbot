const { eightyFourDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const eightyFourWatch = async (message) => {
    if (
        (timeout === false) &&
        (message.author.id !== '781617008311664651') &&
        (
            message.content.toLowerCase().includes('1984') ||
            message.content.toLowerCase().includes('orwell')
        )
    ) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.reply('1984 is a great fiction novel to read but it seems like it is becoming the reality we are currently living under more and more each day.')
            .then(msg => {
                try {
                    message.react("1️⃣").then(() =>
                        message.react("9️⃣").then(() =>
                            message.react("8️⃣").then(() =>
                                message.react("4️⃣"))));
                } catch {  errCatch(err) };
                setTimeout(() => msg.delete(), (eightyFourDelay));
            });
        await timer(eightyFourDelay);
        timeout = false;
    }
    if (
        (message.author.id !== '781617008311664651') &&
        (
            message.content.toLowerCase().includes('1984') ||
            message.content.toLowerCase().includes('nineteen eighty four') ||
            message.content.toLowerCase().includes('orwell')
        )
    ) {
        try {
            message.react("1️⃣").then(() =>
                message.react("9️⃣").then(() =>
                    message.react("8️⃣").then(() =>
                        message.react("4️⃣"))));
        } catch {  errCatch(err) };
    }
    if (
        message.content.toLowerCase().includes('coffee') 
    ) {
        message.react("☕").catch(errCatch(err));
    }
    if (
        message.content.toLowerCase().includes('reddit') 
    ) {
        message.react("⬇️").catch(errCatch(err));
    }
}

exports.eightyFourWatch = eightyFourWatch;