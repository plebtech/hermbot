const link = (link, message) => {
    message.delete({ timeout: 100 });
    message.channel.send(link);
}

exports.link = link;