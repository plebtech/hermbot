const css = '\`\`\`css\n';
const fix = '\`\`\`fix\n';
const brainfuck = '\`\`\`brainfuck\n';

const post = (args, message) => {
    message.channel.send(args);
}

// for (i = 0; i < word.length; i++) {
//     if (word.charAt(i) === ' ') {
//       continue;
//     }
//     let mutWord = word.slice(i, word.length);
//     console.log(mutWord.split('').join(' ').toUpperCase());
//   }

exports.post = post;