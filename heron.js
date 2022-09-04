const css = '\`\`\`css\n';
const fix = '\`\`\`fix\n';
const brainfuck = '\`\`\`brainfuck\n';

// error logging.
const { secretId } = require('./config.json');
const errCatch = (err) => {
    try {
        secret.send("```" + __filename + "\n" + err + "```");
    } catch { console.log("error with errCatch().") }
}

const root = (square, message) => {
    try {
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
    } catch (err) { errCatch(err) }
}

exports.root = root;