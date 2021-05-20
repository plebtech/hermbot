const cron = require('node-cron');

const bump = cron.schedule('0 0,*/2 * * *', (message) => {
    console.log('bumping');
    message.channel.send('please type `!d bump`');
}, {
    scheduled: false,
    timeZone: "America/Chicago"
});

exports.bump = bump;