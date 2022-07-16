const css = '\`\`\`css\n';
const fix = '\`\`\`fix\n';
const brainfuck = '\`\`\`brainfuck\n';

const root = (square, message) => {
    let guess = Math.round((Math.random() * square) * 1e4) / 1e4;
    let lastGuess = 0;
    let response = `${css}approximating the square root of ${square} via successive averages:\n`;
    while (guess != lastGuess) {
        response += `${guess}\n`;
        lastGuess = guess;
        guess = Math.round(((+guess + (+square / +guess)) / 2) * 1e4) / 1e4;
    }
    response += `best guess: ${guess}\`\`\``;
    message.delete();
    message.channel.send(response);
}

exports.root = root;