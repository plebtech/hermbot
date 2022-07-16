// const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

const bumpAlert = async (general) => {
    await timer(7200000);
    general.send('please use `/bump`')
        .then(msg => {
            setTimeout(() => msg.delete(), (1000 * 60))
        })
        .catch();
}

exports.bumpAlert = bumpAlert;