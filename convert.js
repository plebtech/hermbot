const Discord = require('discord.js');

const watch = (message) => {

    if (message.author.bot) return;
    else if (message.content.includes('kg')) {
        const content = message.content;
        const digit = content.match(/\d+/);
        const output = digit * 2.20462;
        message.channel.send(`${digit} kgs = ${output} lbs`);
        return;
    }
    
}

exports.watch = watch;