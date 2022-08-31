const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
// require('discord-reply');
// const client = new Discord.Client();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const timer = (ms) => new Promise(res => setTimeout(res, ms));

// read values / urls from config file.
const { prefix, hId, gId, secretId, dId, token, wallaceLink, leakLink, nineElevenLink, thinkLink, hoesLink, flirtLink } = require('./config.json');

// import modules.
const heron = require('./heron.js');
const memePost = require('./memePost.js');
const pennant = require('./pennant.js');
const cri = require('./cri.js');
const convert = require('./convert.js');
const sup = require('./sup.js');
const princess = require('./princess.js');
const eightyFour = require('./eightyFour.js');
const chan = require('./chan.js');
const hotline = require('./hotline.js');
const bump = require('./bump.js');

let general; // variable to hold the channel id for #general.

// variables for tracking/controlling disboard bump.
let unbumped = false;
let bumpWait = 5;
let dCounting = false;
let dCountdownEngaged = false;
let nagged = false;

// variable to hold 4chan thread url.
let url4;
let bump4 = false;

// error logging.
const errCatch = (err) => {
    secret.send("```" + err + "```");
}

client.once('ready', () => { // on ready.
    try {
        general = client.channels.cache.get(gId);
        secret = client.channels.cache.get(secretId);
        console.log('ready and running with prefix ' + prefix + '.');
        secret.send('ready!').then(msg => {
            setTimeout(() => msg.delete(), (1000 * 120))
        });
    } catch { console.log("something went wrong on client.once()."}
});

// function to decrement bumpWait variable every minute.
const dCountdown = async () => {
    try {
        if (unbumped || dCountdownEngaged || (bumpWait <= 0)) {
            secret.send(`terminating dCountdown function because unbumped is ${unbumped} or dCountdownEngaged is ${dCountdownEngaged} or bumpWait is ${bumpWait}.`).then(msg => {
                setTimeout(() => msg.delete(), (1000 * 120))
            });
            return;
        } else {
            dCountdownEngaged = true;
            dCounting = true;
            secret.send(`dCountdown running and dCountdownEngaged = ${dCountdownEngaged}`).then(msg => {
                setTimeout(() => msg.delete(), (1000 * 120))
            });
            while (bumpWait > 0) {
                nagged = false;
                secret.send(`bumpWait time: ${bumpWait}.`).then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 120))
                });
                await timer(60000);
                bumpWait--;
                secret.send(`bumpWait decremented.`).then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 120))
                });
            }
            dCountdownEngaged = false;
            dCounting = false;
        }
        return;
    } catch (err) { errCatch(err) };
}

const bumpCheck = async () => {
    try {
        if (nagged || (bumpWait > 0)) {
            return;
        } else {
            nagged = true;
            general.send('please use `/bump`').then(msg => {
                setTimeout(() => msg.delete(), (1000 * 15))
            });
            secret.send(`#general nagged because bumpWait is currently ${bumpWait}`).then(msg => {
                setTimeout(() => msg.delete(), (1000 * 120))
            });
            await timer(60000);
            nagged = false;
        }
        return;
    } catch (err) { errCatch(err) };
}

client.on('message', message => {

    bumpCheck();

    // delete server advertisements.
    try {
        if ((message.author.bot === false) && (message.content.toLowerCase().includes('discord.gg/') || (message.content.toLowerCase().includes('discord.com/invite/')))) {
            if (message.content.toLowerCase().includes('discord.gg/pies')) {
                console.log('invite is allowed.');
            } else {
                message.delete().then(message => {
                    secret.send("deleted author @" + message.author + " :");
                    secret.send(message.content);
                });
            }
        } else if (message.content.startsWith('!d ')) { // delete old disboard commands.
            message.delete();
        } else if (message.content.toLowerCase().includes('wiki/nae_nae')) { // delete a specific annoying linked gif.
            message.delete();
        }
    } catch (err) { errCatch(err) };

    // watch for a message that says 'sup' and respond once, gated by configurable delay.
    sup.supWatch(message);
    // watch for a different message.
    hotline.hotlineWatch(message);
    princess.princessWatch(message);
    // watch for a different message.
    eightyFour.eightyFourWatch(message);

    // author triggers.
    switch (message.author.id) {

        case '735147814878969968': // bump reminder bot.
            try {
                if (message.content.includes("hey let's bump!")) { // if bot is telling to bump.
                    // bumpNag(message);
                    secret.send("bump reminder reminded.").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120))
                    });
                    unbumped = true;
                    bumpWait = 0;
                    secret.send("unbumped variable status: `" + unbumped + "`").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120))
                    });
                }
            } catch (err) { errCatch(err) };
            setTimeout(() => message.delete(), (1000 * 5));
            message.react("💩").catch(errCatch(err));
            break;

        case '537353774205894676': // chuu.
        case '356268235697553409': // fmbot.
            try {
                setTimeout(() => message.delete(), (1000 * 300))
            } catch (err) {
                secret.send("error with chuu/fmbot case:");
                errCatch(err);
                setTimeout(() => message.delete(), (1000 * 300));
            };
            break;

        case dId: // disboard.
            const dEmbed = message.embeds[0]; // shortcut for disboard embed.
            try {
                if ((dEmbed.thumbnail == null) || (message.content.includes("👍"))) { // checks case for successful bump (won't have a thumbnail).
                    message.react("👍");
                    secret.send("disboard bumped and case triggered").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120));
                    });
                    unbumped = false;
                    bumpWait = 120;
                    secret.send("unbumped variable status: `" + unbumped + "`").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120));
                    });
                    secret.send("now we'll wait " + bumpWait + " minutes to remind the plebs.").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120));
                    });
                    general.send("disboard bumped successfully! I'll remind you to bump again in two hours.").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 5));
                    });
                    bump.bumpAlert(general); // start bumpAlert function which alerts every 120 minutes.
                    secret.send("bumpAlert running, will remind in two hours.").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120));
                    });
                    dCounting = true;
                    secret.send("dCounting variable status: `" + dCounting + "`").then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120));
                    });
                    dCountdown();
                    nagged = false;
                    setTimeout(() => message.delete(), (1000 * 5)); // delete message after five seconds.
                } else if (dEmbed.thumbnail.url.includes("error.png")) { // checks case for error (attempting to bump too early, embeds with error.png thumbnail).
                    message.react("👎");
                    setTimeout(() => message.delete(), (1000 * 5));
                    const numbers = dEmbed.description.match(/\d+/g).map(Number); // parse time til bump from embed description.
                    disboardTimeToWait = numbers[1];
                } else {
                    setTimeout(() => message.delete(), (1000 * 5));
                };
            } catch (err) { errCatch(err) };
            message.react("💩").catch(errCatch(err));
            break;

        case '771506580109131817': // shortqueen.
            try {
                message.react("🇩").then(() =>
                    message.react("🇺").then(() =>
                        message.react("🇲").then(() =>
                            message.react("🇧"))));
            } catch (err) { errCatch(err) };
            break;

        case '116275390695079945': // nadeko.
            try {
                if (message.embeds[0].description.includes("preventing this action.")) {
                    setTimeout(() => message.delete(), (1000 * 5));
                } else {
                    setTimeout(() => message.delete(), (1000 * 30));
                }
            } catch (err) {
                secret.send("error with nadeko case:");
                errCatch(err);
                setTimeout(() => message.delete(), (1000 * 30));
            };
            break;
        default: // do nothing.
    }

    // content triggers.
    const messageLower = message.content.toLowerCase();
    if (messageLower.includes("the industrial revolution")) {
        try {
            message.react("🇹").then(() =>
                message.react("🇪").then(() =>
                    message.react("🇩")));
        } catch (err) { errCatch(err) };
    }

    // 4chan bump reminder every two hours.
    const startBump4 = async (message) => {
        try {
            bump4 = true;
            while (bump4 === true) {
                chan.chanAlert(general, url4);
                await timer(7200000);
            }
        } catch { errCatch(err) }
    }

    if ((message.author.id === hId) || (message.author.id === '815058660438179862')) { // match only admin sender.

        // if message is not prefixed for this bot or is sent by bot, ignore.
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        switch (command) {

            case 'dwait': // manually set disboard wait time.
                message.delete().catch(errCatch(err));
                bumpWait = parseInt(args[0]);
                secret.send("new disboard bump time: " + bumpWait).then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 120))
                })
                    .catch(errCatch(err));
                break;
            case 'dnag': // manually set nagged.
                message.delete().catch(errCatch(err));
                nagged = args[0];
                secret.send(`nagged variable is now ${nagged}.`).then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 120))
                })
                    .catch(errCatch(err));
                break;
            case 'dstart': // manually set nagged.
                message.delete().catch(errCatch(err));
                bumpWait = parseInt(args[0]);
                dCountdown();
                secret.send(`starting dCountdown with bump wait time ${bumpWait}`).then(msg => {
                    setTimeout(() => msg.delete(), (1000 * 120))
                })
                    .catch(errCatch(err));
                break;

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

            case 'status': // general bot status / variable values.
                message.delete().catch(errCatch(err));
                let info = "\`\`\`";
                info = info + "\nunbumped: " + unbumped;
                info = info + "\nbumpWait: " + bumpWait;
                info = info + "\ndCounting: " + dCounting;
                info = info + "\ndCountdownEngaged: " + dCountdownEngaged;
                info = info + "\nnagged: " + nagged;
                info = info + "\ncurrent 4chan thread: " + url4;
                info = info + "\n4chan bump timeout: " + bump4;
                info = info + "\n\`\`\`";
                message.channel.send(info)
                    .then(msg => {
                        setTimeout(() => msg.delete(), (1000 * 120))
                    })
                    .catch(errCatch(err));
                break;
            default: // do nothing.
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
            message.delete().catch(errCatch(err));
            message.channel.send(content);
        }
    } else if (message.author.id === '857557163828445184') { // match coke.
        if (!message.content.startsWith(prefix) || message.author.bot) return; // if message is not prefixed for this bot or is sent by bot, ignore.
        const args = message.content.slice(prefix.length).trim().split(' ');
        if (args[0].length === 0) message.channel.send('\`please input a command.\`');
        const command = args.shift().toLowerCase();

        if (command === 'say') {
            let content = '';
            for (i = 0; i < args.length; i++) {
                content = content + args[i] + ' ';
            }
            message.delete().catch(errCatch(err));
            message.channel.send(content);
        }
    }
});

client.login(token);