console.log("loaded.");

// approximating square root via Heron of Alexandria's formula.
const heronRoot = square => {
    let guess = Math.random() * square; // begin from random point between 0 and the square.
    let lastGuess = 0;
    while (guess.toFixed(4) != lastGuess.toFixed(4)) {
        console.log(guess);
        lastGuess = guess;
        guess = (guess + (square / guess)) / 2;
    }
    console.log(guess);
}