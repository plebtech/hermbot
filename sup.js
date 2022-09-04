const { supDelay } = require('./config.json');
const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

// error logging.
// const { secretId } = require('./config.json');
// const errCatch = (err) => {
//     try {
//         secret.send("```" + err + "```");
//     } catch { console.log("error with errCatch().") }
// }

const supWatch = async (message) => {
    try {
        if (
            message.content === ('sup') &&
            (timeout === false)
        ) {
            timeout = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('nm u').then(msg => {
                setTimeout(() => msg.delete(), (1000 * 60))
            });
            await timer(supDelay);
            timeout = false;
        }
    } catch (err) { errCatch(err) }
}

exports.supWatch = supWatch;