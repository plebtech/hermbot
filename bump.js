const { gId } = require('./config.json');
// const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

const bumpAlert = async () => {
    const general = client.channels.cache.get(gId);
    await timer(7200000);
    general.send('please type `!d bump`');
}

exports.bumpAlert = bumpAlert;