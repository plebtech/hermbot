const square = (word, message) => {
    let output = '';
    for (i = 0; i < word.length; i++) {
        for (j = 0; j < word.length; j++) {
            output = output + word[i] + word[j];
        }
    }
    message.delete({ timeout: 50 });
    message.channel.send(output);
}

exports.square = square;