const link = (link, message) => {
    message.delete();
    message.channel.send(link).then(msg => {
        setTimeout(() => msg.delete(), (1000 * 60))
    })
        .catch();
}

exports.link = link;