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

const hotlineWatch = async (message) => {
    try {
        if (
            (timeout === false) &&
            (
                message.content.toLowerCase().includes('suicid') ||
                message.content.toLowerCase().includes('kys') ||
                message.content.toLowerCase().includes('kms') ||
                (message.content.toLowerCase().includes('kill') &&
                    message.content.toLowerCase().includes('self'))
            )
        ) {
            timeout = true;
            await timer(randomNumber.generate(25, 750));
            let roll = randomNumber.generate(0, 100);
            if (roll < 50) {
                message.channel.send('the national suicide prevention lifeline is \`988`.')
                    .then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 30))
                    });
            } else {
                message.channel.send('do a flip, f word.')
                    .then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 30))
                    });
                await timer(300000);
                timeout = false;
            }
        }
    } catch (err) { errCatch(err) }
}

exports.hotlineWatch = hotlineWatch;