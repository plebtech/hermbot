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
const eightyFour = require('./eightyFour.js');
const chan = require('./chan.js');
const hotline = require('./hotline.js');
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
    if (disboardBumpRunning === true) { // check if main bump running; if so return/exit to prevent double counting.
        disboardSecondaryCatch = false;
        return;
    } else if (disboardTimeToWait <= 0) { // if timer has reached zero, alert to bump.
        disboardSecondaryCatch = true;
        general.send('please type `/bump`')
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
        return;
    } else { // count down the time to wait every minute.
        while (disboardTimeToWait > 0) {
            if (disboardBumpRunning === true) { // check if main bump running; if so return/exit to prevent double counting.
                disboardSecondaryCatch = false;
                return;
            }
            secret.send('time to next bump alert: ' + disboardTimeToWait)
                .then(msg => {
                    msg.delete({ timeout: 60000 })
                });
            await timer(60000)
                .then(() => {
                    disboardTimeToWait--;
                    secret.send('`secondary` decrementing, time left: ' + disboardTimeToWait);
                });
        }
        disboardSecondaryCatch = false;
        return;
    }
}

// method to decrement the bump timer every minute.
const bumpAlertCountdown = async () => {
    if ((disboardBumpRunning === true) || (disboardCountingDown === true)) { // check if already running.
        disboardSecondaryCatch = false;
        return;
    } else {
        disboardTimeToWait = 120;
        disboardBumpRunning = true;
        disboardSecondaryCatch = false;
        while (disboardTimeToWait > 0) { // if not running, run.
            disboardCountingDown = true;
            await timer(60000)
                .then(() => {
                    disboardTimeToWait--;
                    secret.send('`primary` decrementing, time left: ' + disboardTimeToWait);
                });
        }
        disboardCountingDown = false;
        return;
    }
}

// method to query current wait on bump timer.
const bumpQuery = async (message) => {
    bumpQueryTimeout = true;
    if (disboardTimeToWait <= 0) {
        message.channel.send("we can bump again now! please type `/bump`")
            .then(msg => {
                msg.delete({ timeout: 60000 })
            });
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
    general.send('please type `/bump`')
        .then(msg => {
            msg.delete({ timeout: 60000 })
        });
    await timer(60000);
    unbumpedNag = false;
}

const errCatch = (error) => {
    secret.send("```" + error + "```");
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
    } else if (message.content.toLowerCase().includes('wiki/nae_nae')) {
        message.delete({ timeout: 1500 });
    }

    // watch for query on bumping.
    if ((!bumpQueryTimeout) && (message.content.toLowerCase().includes('when')) && (message.content.toLowerCase().includes('bump'))) {
        bumpQuery(message).catch(errCatch(error));
    }

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);
    // watch for a different message.
    hotline.hotlineWatch(message);
    // watch for a different message.
    eightyFour.eightyFourWatch(message);

    // if bumpAlert isn't running and this secondary catch hasn't engaged, engage it.
    if ((disboardBumpRunning === false) && (disboardSecondaryCatch === false)) {
        disboardSecondaryCatch = true;
        disboardCountDown().catch(errCatch(error));
    } else if ((disboardTimeToWait <= 0) && (unbumpedNag === false) && !(message.author.bot)) {
        bumpNag(message).catch(errCatch(error));
    }

    // author triggers.
    switch (message.author.id) {

        // bump reminder bot.
        case '735147814878969968':
            try {
                if (message.content.includes("hey let's bump!")) {
                    bumpNag(message).catch(errCatch(error));
                }
            } catch { };
            message.delete({ timeout: 3000 });
            message.react("💩");
            break;

        case dId: // disboard.
            const dEmbed = message.embeds[0]; // shortcut for disboard embed.
            try {
                if ((dEmbed.thumbnail == null) || (message.content.includes("👍"))) { // checks case for successful bump (won't have a thumbnail).
                    message.react("👍");
                    secret.send("disboard bumped.");
                    general.send("disboard bumped successfully! I'll remind you to bump again in two hours.")
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        });
                    bump.bumpAlert(general); // start bumpAlert function which alerts every 120 minutes.
                    bumpAlertCountdown().catch(errCatch(error));
                    message.delete({ timeout: 360000 }); // delete message after five minutes.
                } else if (dEmbed.thumbnail.url.includes("error.png")) { // checks case for error (attempting to bump too early, embeds with error.png thumbnail).
                    message.react("👎");
                    message.delete({ timeout: 5000 }); // delete message after five seconds.
                    const numbers = dEmbed.description.match(/\d+/g).map(Number); // parse time til bump from embed description.
                    disboardTimeToWait = numbers[1];
                } else {
                    message.delete({ timeout: 5000 });
                };
            } catch { };
            message.react("💩");
            break;

        // buggy.
        // case '814470461962059777':
        //     message.react("😋");
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
        // nadeko.
        case '116275390695079945':
            try {
                if (message.embeds[0].description.includes("preventing this action.")) {
                    message.delete({ timeout: 5000 });
                }
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
    const startBump4 = async (message) => {
        bump4 = true;
        while (bump4 === true) {
            chan.chanAlert(general, url4);
            await timer(7200000);
        }
    }

    if ((message.author.id === hId) || (message.author.id === '815058660438179862')) { // match only admin sender.

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        switch (command) {

            case 'dwait':
                message.delete({ timeout: 50 });
                disboardTimeToWait = parseInt(args[0]);
                secret.send("new disboard bump time: " + disboardTimeToWait);
                break;

            // commands for controlling 4chan thread bump reminders.
            case '4store':
                url4 = args[0]; // stores a new url.
                if (bump4 === true) {
                    startBump4().catch(errCatch(error));
                }
                break;
            case '4start':
                bump4 = true;
                startBump4().catch(errCatch(error));
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
                info = info + "\n4chan bump timeout: " + bump4;
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
            message.delete({ timeout: 50 });
            message.channel.send(content);
        }
    } else if (message.author.id === '855452323555311626') { // match floor.

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        if (command === 'say') {
            let content = '';
            for (i = 0; i < args.length; i++) {
                content = content + args[i] + ' ';
            }
            message.delete({ timeout: 50 });
            message.channel.send(content);

        }
    }
});

client.login(token);