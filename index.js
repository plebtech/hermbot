const Discord = require('discord.js');
const { prefix, token, wallaceLink, leakLink } = require('./config.json');
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('ready and running with prefix ' + prefix);
});

client.on('message', message => {
    // if message is not prefixed for this bot or is sent by bot, ignore.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'heron') {
        square = parseInt(args[0]);
        if (isNaN(square) || (square < 0)) {
            message.channel.send('please include a positive numeric argument.');
        } else {
            heron.root(square, message);
        }
    } else if (command === 'wallace') {
        memePost.link(wallaceLink, message);
    } else if (command === 'leak') {
        memePost.link(leakLink, message);
    }

});

client.login(token);

// const css = '\`\`\`css\n';
// const fix = '\`\`\`fix\n';
// const brainfuck = '\`\`\`brainfuck\n';