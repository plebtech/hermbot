const Discord = require('discord.js');
require('discord-reply');
const timer = ms => new Promise(res => setTimeout(res, ms));
// const cron = require('node-cron');
// const fs = require('fs');
// read values / urls from config file.
const { prefix, hId, gId, secretId, dId, token, wallaceLink, leakLink, nineElevenLink, thinkLink, hoesLink, flirtLink } = require('./config.json');
// import modules.
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const pennant = require('./pennant.js');
const cri = require('./cri.js');
const convert = require('./convert.js');
const sup = require('./sup.js');
const bump = require('./bump.js');
// const randomNumber = require('./randomNumber.js');
const client = new Discord.Client();
// variable to hold the channel id for #general.
let general;
// variable to track whether disboard bump timer running.
let disboardBumpRunning, disboardSecondaryCatch = false;
let disboardTimeToWait = 1;

// on ready.
client.once('ready', () => {
    general = client.channels.cache.get(gId);
    secret = client.channels.cache.get(secretId);

    // bumpD.start();
    // bumpF.start();
    console.log('ready and running with prefix ' + prefix);
    secret.send('ready!');
});

const disboardCountDown = async () => {
    if (disboardSecondaryCatch === false) {
        return;
    } else if (disboardTimeToWait === 0) {
        secret.send('please type `!d bump`');
        disboardSecondaryCatch = true;
    } else {
        await timer(60000);
        disboardTimeToWait = disboardTimeToWait - 1;
        disboardSecondaryCatch = false;
    }
}

client.on('message', message => {

    // watch for a specific message to delete.
    if (message.content.includes('discord.gg/') || (message.content.includes('discord.com/invite/'))) {
        if (message.content.includes('discord.gg/pies')) {
            console.log('invite is allowed.');
        } else {
            message.delete({ timeout: 50 });
        }
    } else if (message.content.startsWith('!d ')) {
        message.delete({ timeout: 5000 });
    }

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);

    if ((disboardBumpRunning === false) && (disboardSecondaryCatch === false)) {
        secret.send("ok so this part works");
        disboardSecondaryCatch = true;
        disboardCountDown();
    }

    // author triggers.
    switch (message.author.id) {
        // disboard.
        case dId:
            const dEmbed = message.embeds[0];
            if (dEmbed.thumbnail == null) {
                message.react("👍");
                general.send("disboard bumped successfully! I'll remind you to bump again in two hours.");
                bump.bumpAlert(general);
                disboardBumpRunning = true;
                disboardSecondaryCatch = false;
                message.delete({ timeout: 360000 });
            } else if (dEmbed.thumbnail.url.includes("error.png")) {
                message.react("👎");
                message.delete({ timeout: 5000 });
                // disboardTimeToWait = dEmbed.description.replace(/^\D+/g, '');
                secret.send(disboardTimeToWait);
            } else {
                // message.channel.send("something went wrong.");
                message.delete({ timeout: 5000 });
            };
            message.react("💩");
            break;
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
        // shortqueen.
        case '771506580109131817':
            try {
                message.react("🇩").then(() =>
                    message.react("🇺").then(() =>
                        message.react("🇲").then(() =>
                            message.react("🇧"))));
            } catch { };
            break;
        default:
        // do nothing.
    }

    // content triggers.
    const messageLower = message.content.toLowerCase();
    if (messageLower.includes("the industrial revolution")) {
        try {
            message.react("🇹").then(() =>
                message.react("🇪").then(() =>
                    message.react("🇩")));
        } catch { };
    }

    // variable to hold 4chan thread url.
    let url4;
    let bump4 = false;
    // bump reminder every two hours.
    const startBump4 = async () => {
        bump4 = true;
        while (bump4 === true) {
            secret.send("please bump the 4chan thread at + \`" + url4 + "\`.");
            await timer(7200000);
        }
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

        switch (command) {
            case '4store':
                url4 = args[0];
                if (bump4 === true) {
                    startBump4();
                }
                break;
            case '4start':
                bump4 = true;
                startBump4();
                break;
            case '4stop':
                bump4 = false;
                break;
            default:
            // do nothing.
        }

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