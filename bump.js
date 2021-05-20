const cron = require('node-cron');

const bump = cron.schedule('0 */2 * * *', (general) => {
    console.log('bumping');
    general.send('please type `!d bump`');
}, {
    scheduled: true,
    timeZone: "America/Chicago"
});
