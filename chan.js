// basic timer w/ promise using setTimeout function.
const timer = ms => new Promise(res => setTimeout(res, ms));

const chanAlert = async (channel, url) => {
    channel.send("please bump the 4chan thread at:\n" + url)
        .then(msg => {
            setTimeout(() => msg.delete(), (1000 * 300))
        })
        .catch();
}

exports.chanAlert = chanAlert;