const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const hotlineWatch = async (message) => {
    if (
        (timeout === false) &&
        (
            message.content.toLowerCase().includes('suicid') ||
            (message.author.id === '261942742525935628') ||
            message.content.toLowerCase().includes('kys') ||
            message.content.toLowerCase().includes('kms') ||
            message.content.toLowerCase().includes('kill myself') ||
            message.content.toLowerCase().includes('kill yourself') ||
            message.content.toLowerCase().includes('kill urself')
        )
    ) {
        timeout = true;
        await timer(randomNumber.generate(25, 750));
        message.lineReply('the national suicide prevention lifeline is: \`1-800-273-8255\`')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        await timer(300000);
        timeout = false;
    }
}

exports.hotlineWatch = hotlineWatch;