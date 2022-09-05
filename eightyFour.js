const { eightyFourDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const eightyFourWatch = async (message, secret) => {
    // error logging.
    const errCatch = (err) => {
        try {
            secret.send("```" + __filename + "\n" + err + "```");
        } catch { console.log("error with errCatch().") }
    }

    try {
        if (
            (timeout === false) &&
            (message.author.id !== '781617008311664651') &&
            (
                message.content.toLowerCase().includes('1984') ||
                message.content.toLowerCase().includes('orwell')
            )
        ) try {
            timeout = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('1984 is a great fiction novel to read but it seems like it is becoming the reality we are currently living under more and more each day.')
                .then(msg => {

                    message.react("1️⃣").then(() =>
                        message.react("9️⃣").then(() =>
                            message.react("8️⃣").then(() =>
                                message.react("4️⃣"))));

                    setTimeout(() => msg.delete(), (eightyFourDelay));
                });
            await timer(eightyFourDelay);
            timeout = false;
        } catch {
            console.log("1984 error.");
            secret.send("1984 error.");
        }
        else if (
            (message.author.id !== '781617008311664651') &&
            (
                message.content.toLowerCase().includes('1984') ||
                message.content.toLowerCase().includes('nineteen eighty four') ||
                message.content.toLowerCase().includes('orwell')
            )
        ) try {

            message.react("1️⃣").then(() =>
                message.react("9️⃣").then(() =>
                    message.react("8️⃣").then(() =>
                        message.react("4️⃣"))));
        } catch {
            console.log("1984 error.");
            secret.send("1984 error.");
        }
        if (
            message.content.toLowerCase().includes('coffee')
        ) try {

            message.react("☕").catch(err, console.log(err));
        } catch {
            console.log("coffee error.");
            secret.send("coffee error.");
        }
        if (
            message.content.toLowerCase().includes('reddit')
        ) try {

            message.react("⬇️");
        } catch {
            console.log("reddit error.");
            secret.send("reddit error.");
        }
    } catch (err) { errCatch(err) };
}

exports.eightyFourWatch = eightyFourWatch;