const randomNumber = (min, max) => {
    let val = Math.floor(Math.random() * ((max + 1) - min) + min);
    // console.log(val);
    return val;
}

exports.randomNumber = randomNumber;