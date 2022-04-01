// const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

const bumpAlert = async (general) => {
    await timer(7200000);
    general.send('please type `/bump`')
        .then(msg => {
            msg.delete({ timeout: 60000 })
        });
}

exports.bumpAlert = bumpAlert;