const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));
let timeout = false;

const hotlineWatch = async (message) => {
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
        message.lineReply('the national suicide prevention lifeline is: \`1-800-273-8255\`')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        await timer(300000);
        timeout = false;
    }
}

exports.hotlineWatch = hotlineWatch;