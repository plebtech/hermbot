const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('ready and running with prefix ' + prefix);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'heron') {
        square = parseInt(args[0]);
        if (isNaN(square) || (square < 0)) {
            message.channel.send('please include a positive numeric argument.');
        } else {
            heronRoot(square, message);
        }
    }
});

client.login(token);

const css = '\`\`\`css\n';
const fix = '\`\`\`fix\n';
const brainfuck = '\`\`\`brainfuck\n';

const heronRoot = (square, message) => {
    let guess = Math.random() * square;
    let lastGuess = 0;
    let response = `${brainfuck}approximating the square root of ${square} via successive averages:\n`;
    while (guess.toFixed(1) != lastGuess.toFixed(1)) {
        response += `${guess}\n`;
        lastGuess = guess;
        guess = (guess + (square / guess)) / 2;
    }
    response += `best guess: ${guess} \n \`\`\``;
    message.channel.send(response);
}