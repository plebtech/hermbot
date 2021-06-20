const Discord = require('discord.js');
require('discord-reply');
// const cron = require('node-cron');
const { prefix, hId, gId, dId, token, wallaceLink, leakLink, nineElevenLink, thinkLink, hoesLink, flirtLink, chanLink } = require('./config.json');
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const pennant = require('./pennant.js');
const cri = require('./cri.js');
const convert = require('./convert.js');
const sup = require('./sup.js');
const bump = require('./bump.js');
// const randomNumber = require('./randomNumber.js');
const client = new Discord.Client();

let general;

// cron job declarations on global scope.
// cron job to send Disboard bump reminder every even hour, on the hour.
// const bumpD = cron.schedule('0 */2 * * *', () => {
//     console.log('bumping Disboard.');
//     general.send('please type `!d bump`');
// }, {
//     timeZone: "America/Chicago"
// });

// cron job to send 4chan bump reminder one minute before every odd hour.
// const bumpF = cron.schedule('59 */2 * * *', () => {
//     console.log('bumping 4chan.');
//     general.send('please bump the 4chan thread at:\n' + chanLink);
// }, {
//     timeZone: "America/Chicago"
// });


client.once('ready', () => {
    general = client.channels.cache.get(gId);
    // bumpD.start();
    // bumpF.start();
    console.log('ready and running with prefix ' + prefix);
    // general.send('ready!');
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

    // author triggers.
    switch (message.author.id) {
        // buggy.
        case '814470461962059777':
            message.react("😋");
            break;
        // bluedog.
        // case '828126125053575168':
        //     message.react("770012090584268820");
        //     break;
        // kvatch.
        // case '112272892561035264':
        //     message.react("💩");
        //     break;
        // disboard.
        case dId:
            const dEmbed = message.embeds[0];
            if (dEmbed.thumbnail.url.includes("error.png")) {
                message.react("👎");
            } else {
                message.react("👍");
                general.send("disboard bumped successfully! I'll remind you to bump again in two hours.");
                bump.bumpAlert();
                message.channel.send(dEmbed.description);
            };
            message.react("💩");
            break;
        default:
        // do nothing.
    }

    // content triggers.
    const messageLower = message.content.toLowerCase();
    if (messageLower.includes("the industrial revolution")) {
        message.react("🇹");
        message.react("🇪");
        message.react("🇩");
    }

    // match only admin sender.
    if (message.author.id === hId) {

        // if (message.content.includes("👍")) {
        //     general.send("thumbs up!");
        // }

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        // bump reminder start/stop.
        // if (command === 'bumpdstop') {
        //     bumpD.stop();
        //     message.channel.send('disboard bumping reminder off.');
        // } else if (command === 'bumpdstart') {
        //     bumpD.start();
        //     message.channel.send('disboard bumping reminder on.');
        // } else if (command === 'bump4stop') {
        //     bumpF.stop();
        //     message.channel.send('4chan bumping reminder off.');
        // } else if (command === 'bump4start') {
        //     bumpF.start();
        //     message.channel.send('4chan bumping reminder on.');
        // }

        // message/link send commands.
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
    }

});

client.login(token);