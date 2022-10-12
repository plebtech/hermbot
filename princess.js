const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;
let timeout2 = false;
let timeout3 = false;

// error logging.
// const { secretId } = require('./config.json');
// const errCatch = (err) => {
//     try {
//         secret.send("```" + err + "```");
//     } catch { console.log("error with errCatch().") }
// }

const princessWatch = async (message) => {
    try {
        if (
            (timeout === false) &&
            (
                message.content.toLowerCase().includes('good night') ||
                message.content.toLowerCase().includes('goodnight')
            )
        ) {
            timeout = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('princess')
                .then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 30))
                });
            await timer(300000);
            timeout = false;
        } else if (
            (timeout === false) &&
            (message.content.toLowerCase().includes('princess'))
        ) {
            timeout = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('Good night')
                .then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 30))
                });
            await timer(300000);
            timeout = false;
        }
        if (
            (timeout2 === false) &&
            (message.content.toLowerCase().includes('desu'))
        ) {
            timeout2 = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('DESU DESU DESU')
                .then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 30))
                });
            await timer(300000);
            timeout2 = false;
        }
        if (
            (timeout3 === false && !message.author.bot) &&
            (message.content.toLowerCase().includes('daddy')) ||
            (message.content.toLowerCase().includes('uwu'))
        ) {
            timeout3 = true;
            await timer(randomNumber.generate(25, 750));
            message.reply('Hello! It looks like you\'re experiencing an episode of what is commonly referred to as "daddy issues". We\'re very sorry your father did not show you enough/the right sort of attention growing up; we know that therapy is expensive, and if you\'d like to discuss your problems in a mature manner, we\'re all ears. However, we here at chokers & pie would be remiss if we didn\'t remind you that hermit is not your biological father, hermit has done nothing to you, and using hermit as a stand-in for your fatherly animosity is doing neither you nor him any favors. Have a nice day!')
                .then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 45))
                });
            await timer(450000);
            timeout3 = false;
        }
    } catch { errCatch(err) }
}

exports.princessWatch = princessWatch;