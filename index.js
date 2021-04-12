const Discord = require('discord.js');
const { prefix, token, wallaceLink, leakLink, nineElevenLink, thinkLink, hoesLink } = require('./config.json');
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const pennant = require('./pennant.js');
const cri = require('./cri.js');
const convert = require('./convert.js');
const client = new Discord.Client();


client.once('ready', () => {
    console.log('ready and running with prefix ' + prefix);
});

client.on('message', message => {

    // auto convert values between imperial and metric.
    //convert.watch(message);

    // watch for a specific message to delete.
    if (message.content.includes('discord.gg/')) {
        if (message.content.includes('discord.gg/pies')) {
        } else {
            message.delete({ timeout: 50 });
        }
    } else if (message.content.includes('FunkyDance')) {
        message.delete({ timeout: 50 });
    } else if (message.content === ('sup')) {
        message.channel.send('nm u');
    }

    // if message is not prefixed for this bot or is sent by bot, ignore.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    if (args[0].length === 0) message.channel.send('\`please input a command.\`');
    const command = args.shift().toLowerCase();

    if (command === 'heron') {
        square = parseInt(args[0]);
        if (isNaN(square) || (square < 0)) {
            message.channel.send('\`please include a positive numeric argument.\`');
        } else {
            heron.root(square, message);
        }
    } else if (command === 'wallace') {
        memePost.link(wallaceLink, message);
    } else if (command === 'leak') {
        memePost.link(leakLink, message);
    } else if (command === '911') {
        memePost.link(nineElevenLink, message);
    } else if (command === 'think') {
        memePost.link(thinkLink, message);
    } else if (command === 'hoes') {
        memePost.link(hoesLink, message);
    } else if (command === 'cri') {
        cri.square(args[0], message);
    } else if (command === 'pennant') {
        pennant.post(args, message);
    } else if (command === 'say') {
        let content = '';
        for (i = 0; i < args.length; i++) {
            content = content + args[i] + ' ';
        }
        message.delete({ timeout: 100 });
        message.channel.send(content);
    }

});

client.login(token);