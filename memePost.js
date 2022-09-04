// error logging.
const { secretId } = require('./config.json');
const errCatch = (err) => {
    try {
        secret.send("```" + err + "```");
    } catch { console.log("error with errCatch().") }
}

const link = (link, message) => {
    try {
        message.delete();
        message.channel.send(link).then(msg => {
            setTimeout(() => msg.delete(), (1000 * 60))
        });
    } catch (err) { errCatch(err) }
}

exports.link = link;