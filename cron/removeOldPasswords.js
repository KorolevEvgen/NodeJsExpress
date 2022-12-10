const { CronJob } = require('cron'); // дає змогу запускати будь-яку дію або функцію в втсановлений час
const dayjs = require('dayjs');
const OldPassword = require('../dataBase/OldPassword');

const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * */1 * * *',
    async function () {
        try {
            console.log('Start removing password');
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({ createdAt: { $lte: yearAgo }});
            console.log('End removing password');
        } catch (e) {
            console.error(e);
        }
    },
);
