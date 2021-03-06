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

let general; // variable to hold the channel id for #general.
// variables to track disboard bump status.
let disboardBumpRunning = false;
let disboardSecondaryCatch = false;
let disboardCountingDown = false;
let disboardTimeToWait = 2;
let bumpQueryTimeout = false;
let unbumpedNag = false;

// variable to hold 4chan thread url.
let url4;
let bump4 = false;

client.once('ready', () => { // on ready.
    general = client.channels.cache.get(gId);
    secret = client.channels.cache.get(secretId);
    console.log('ready and running with prefix ' + prefix);
    secret.send('ready!');
});

const disboardCountDown = async () => { // async function to time secondary catch for bump.
    if (disboardTimeToWait === 0) { // if timer has reached zero, alert to bump.
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

// method to decrement the bump timer every minute.
const bumpAlertCountdown = async () => {
    while (disboardTimeToWait > 0) {
        disboardCountingDown = true;
        await timer(60000);
        disboardTimeToWait--;
    }
    disboardCountingDown = false;
}

// method to query current wait on bump timer.
const bumpQuery = async (message) => {
    bumpQueryTimeout = true;
    if (disboardTimeToWait <= 0) {
        message.channel.send("we can bump again now! please type `!d bump`");
    } else {
        message.channel.send("we can bump again in `" + disboardTimeToWait + " minutes`.")
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
    };
    await timer(60000);
    bumpQueryTimeout = false;
}

const bumpNag = async (message) => {
    unbumpedNag = true;
    general.send('please type `!d bump`')
    .then(msg => {
        msg.delete({ timeout: 60000 })
    });
    await timer(60000);
    unbumpedNag = false;
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
    if ((!bumpQueryTimeout) && (message.content.toLowerCase().includes('when')) && (message.content.toLowerCase().includes('bump'))) {
        bumpQuery(message);
    }

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);

    // if bumpAlert isn't running and this secondary catch hasn't engaged, engage it.
    if ((disboardBumpRunning === false) && (disboardSecondaryCatch === false)) {
        disboardSecondaryCatch = true;
        disboardCountDown();
    } else if ((disboardTimeToWait === 0) && (unbumpedNag === false)) {
        bumpNag(message);
    }

    // author triggers.
    switch (message.author.id) {

        case dId: // disboard.
            const dEmbed = message.embeds[0]; // shortcut for disboard embed.
            if ((dEmbed.thumbnail == null) || (message.content.includes("👍"))) { // checks case for successful bump (won't have a thumbnail).
                message.react("👍");
                general.send("disboard bumped successfully! I'll remind you to bump again in two hours.");
                bump.bumpAlert(general); // start bumpAlert function which alerts every 120 minutes.
                disboardBumpRunning = true;
                disboardCountingDown = true;
                disboardSecondaryCatch = false;
                disboardTimeToWait = 120;
                message.delete({ timeout: 360000 }); // delete message after five minutes.
                bumpAlertCountdown();
            } else if (dEmbed.thumbnail.url.includes("error.png")) { // checks case for error (attempting to bump too early, embeds with error.png thumbnail).
                message.react("👎");
                message.delete({ timeout: 5000 }); // delete message after five seconds.
                const numbers = dEmbed.description.match(/\d+/g).map(Number); // parse time til bump from embed description.
                disboardTimeToWait = numbers[1];
            } else {
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

    // bump reminder every two hours.
    const startBump4 = async () => {
        bump4 = true;
        while (bump4 === true) {
            general.send("please bump the 4chan thread at:\n" + url4);
            await timer(7200000);
        }
    }

    if (message.author.id === hId) { // match only admin sender.

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        switch (command) {
            // commands for controlling 4chan thread bump reminders.
            case '4store':
                url4 = args[0]; // stores a new url.
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
            case 'status':
                message.delete({ timeout: 50 });
                let info = "\`\`\`";
                info = info + "\nbumpAlert running: " + disboardBumpRunning;
                info = info + "\nsecondary catch running: " + disboardSecondaryCatch;
                info = info + "\ndisboard counting down: " + disboardCountingDown;
                info = info + "\ndisboard time to wait: " + disboardTimeToWait;
                info = info + "\nbumpNag running: " + unbumpedNag;
                info = info + "\nquery in timeout: " + bumpQueryTimeout;
                info = info + "\ncurrent 4chan thread: " + url4;
                info = info + "\n\`\`\`";
                message.channel.send(info)
                .then(msg => {
                    msg.delete({ timeout: 30000 })
                });
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