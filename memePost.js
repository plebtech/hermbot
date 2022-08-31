const link = (link, message) => {
    try {
        message.delete();
        message.channel.send(link).then(msg => {
            setTimeout(() => msg.delete(), (1000 * 60))
        });
    } catch { errCatch(err) }
}

exports.link = link;