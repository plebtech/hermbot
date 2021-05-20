const Discord = require('discord.js');
require('discord-reply');
const cron = require('node-cron');
const { prefix, token, wallaceLink, leakLink, nineElevenLink, thinkLink, hoesLink, flirtLink } = require('./config.json');
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const pennant = require('./pennant.js');
const cri = require('./cri.js');
const convert = require('./convert.js');
const sup = require('./sup.js');
// const bump = require('./bump.js');
// const randomNumber = require('./randomNumber.js');
const client = new Discord.Client();

client.once('ready', () => {    
    const general = client.channels.cache.get("790238886080938034");
    const bump = cron.schedule('0 */2 * * *', (general) => {
        console.log('bumping');
        general.send('please type `!d bump`');
    }, {
        scheduled: true,
        timeZone: "America/Chicago"
    });
    bump.start();

    console.log('ready and running with prefix ' + prefix);
    general.send('ready!');
});

client.on('message', message => {

    // auto convert values between imperial and metric.
    //convert.watch(message);

    // watch for a specific message to delete.
    if (message.content.includes('discord.gg/') || (message.content.includes('discord.com/invite/'))) {
        if (message.content.includes('discord.gg/pies') || (message.content.includes('discord.gg/4chan')) || (message.content.includes('discord.gg/thots'))) {
            console.log('invite is allowed.');
        } else {
            message.delete({ timeout: 50 });
        }
    } else if (message.content.includes('FunkyDance')) {
        message.delete({ timeout: 50 });
    }

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);

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
    } else if (command === 'flirt') {
        memePost.link(flirtLink, message);
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