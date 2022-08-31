// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

const chanAlert = async (channel, url) => {
    try {
        channel.send("please bump the 4chan thread at:\n" + url)
            .then(msg => {
                setTimeout(() => msg.delete(), (1000 * 300))
            });
    } catch (err) { errCatch(err) }
}

exports.chanAlert = chanAlert;