const cri = (word, message) => {
    let output = '';
    for (i = 0; i < word.length; i++) {
        for (j = 0; j < word.length; j++) {
            output = pout + word[i] + word[j];
        }
    }
    message.channel.send(output);
}

exports.cri = cri;