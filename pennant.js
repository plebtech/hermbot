const css = '\`\`\`css\n';
const fix = '\`\`\`fix\n';
const brainfuck = '\`\`\`brainfuck\n';

const post = (args, message) => {
    input = '';
    output = '\`\`\`';
    for (i = 0; i < args.length; i++) {
        input = input + args[i];
    }
    for (i = 0; i < input.length; i++) {
        if (input.charAt(i) === ' ') {
            continue;
        }
        let thisWord = input.slice(i, input.length);
        output += thisWord.split('').join(' ').toUpperCase() + '\n';
    }
    output += '\`\`\`';
    message.channel.send(output);
}

exports.post = post;