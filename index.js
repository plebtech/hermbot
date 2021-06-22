const Discord = require('discord.js');
const client = new Discord.Client();
require('discord-reply');
const timer = ms => new Promise(res => setTimeout(res, ms));

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

// variable to hold the channel id for #general.
let general;
// variable to track whether disboard bump timer running.
let disboardBumpRunning = false;
let disboardSecondaryCatch = false;
let disboardCountingDown = false;
let disboardTimeToWait = 2;

// on ready.
client.once('ready', () => {
    general = client.channels.cache.get(gId);
    secret = client.channels.cache.get(secretId);
    console.log('ready and running with prefix ' + prefix);
    secret.send('ready!');
});

// async function to time secondary catch for bump.
const disboardCountDown = async () => {
    // if timer has reached zero, alert to bump.
    if (disboardTimeToWait === 0) {
        disboardSecondaryCatch = true;
        general.send('please type `!d bump`');
        return;
    } else { // count down the time to wait every minute.
        while (disboardTimeToWait > 0) {
            secret.send('time to next bump alert: ' + disboardTimeToWait);
            await timer(60000);
            disboardTimeToWait--;
        }
        disboardSecondaryCatch = false;
    }
}

const bumpAlertCountdown = async () => {
    while (disboardTimeToWait > 0) {
        disboardCountingDown = true;
        await timer(60000);
        disboardTimeToWait--;
    }
    disboardCountingDown = false;
}

client.on('message', message => {

    // watch for a specific message to delete.
    if (message.content.toLowerCase().includes('discord.gg/') || (message.content.toLowerCase().includes('discord.com/invite/'))) {
        if (message.content.toLowerCase().includes('discord.gg/pies')) {
            console.log('invite is allowed.');
        } else {
            message.delete({ timeout: 50 });
        }
    } else if (message.content.startsWith('!d ')) {
        message.delete({ timeout: 5000 });
    }

    // watch for query on bumping.
    if ((message.content.toLowerCase().includes('when')) && (message.content.toLowerCase().includes('bump'))) {
        if (disboardTimeToWait <= 0) {
            message.channel.send("we can bump again now! please type `!d bump`");
        } else {
            message.channel.send("we can bump again in `" + disboardTimeToWait + " minutes`.");
        }
    }

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);

    // if bumpAlert isn't running and this secondary catch hasn't engaged, engage it.
    if ((disboardBumpRunning === false) && (disboardSecondaryCatch === false) && (disboardCountingDown === false)) {
        disboardSecondaryCatch = true;
        disboardCountDown();
    }

    // author triggers.
    switch (message.author.id) {
        // disboard.
        case dId:
            // shortcut for disboard embed.
            const dEmbed = message.embeds[0];
            // checks case for successful bump (won't have a thumbnail).
            if (dEmbed.thumbnail == null) {
                message.react("👍");
                general.send("disboard bumped successfully! I'll remind you to bump again in two hours.");
                // start bumpAlert function which alerts every 120 minutes.
                bump.bumpAlert(general);
                disboardBumpRunning = true;
                disboardSecondaryCatch = false;
                disboardTimeToWait = 120;
                disboardCountingDown = true;
                // delete message after five minutes.
                message.delete({ timeout: 360000 });
                bumpAlertCountdown();
                // checks case for error (attempting to bump too early, embeds with error.png thumbnail).
            } else if (dEmbed.thumbnail.url.includes("error.png")) {
                message.react("👎");
                // delete message after five seconds.
                message.delete({ timeout: 5000 });
                // parse time til bump from embed description.
                const numbers = dEmbed.description.match(/\d+/g).map(Number);
                disboardTimeToWait = numbers[1];
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

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

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