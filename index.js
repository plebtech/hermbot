// load config json.
const config = require('./config.json');
// require discord.js module.
const Discord = require('discord.js');
// instantiate client from discord.js.
const client = new Discord.Client();


// when client ready, run once.
client.once('ready', () => {
    console.log('ready.');
});

client.on('message', message => {
    if (message.content === 'kek') {
        message.channel.send('KEK');
    }
});

// log in to discord with app token.
client.login(config.token);

// approximating square root via Heron of Alexandria's formula.
function heronRoot(square) {
    let guess = Math.random() * square; // begin from random point between 0 and the square.
    let lastGuess = 0;
    while (guess.toFixed(4) != lastGuess.toFixed(4)) {
        console.log(guess);
        lastGuess = guess;
        guess = (guess + (square / guess)) / 2;
    }
    console.log(guess);
}