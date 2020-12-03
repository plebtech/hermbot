const link = (link, message) => {
    message.delete({ timeout: 50 });
    message.channel.send(link);
}

exports.link = link;