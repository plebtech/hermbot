// const randomNumber = require('./randomNumber.js');

// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

// error logging.
const { secretId } = require('./config.json');
const errCatch = (err) => {
    try {
        secret.send("```" + err + "```");
    } catch { console.log("error with errCatch().") }
}

const bumpAlert = async (general) => {
    try {
        await timer(7200000);
        general.send('please use `/bump`')
            .then(msg => {
                setTimeout(() => msg.delete(), (1000 * 30))
            });
    } catch (err) { errCatch(err) }
}

exports.bumpAlert = bumpAlert;