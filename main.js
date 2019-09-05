const log4js = require('log4js');
const {get} = require('request-promise');

const logger = log4js.getLogger('main');

logger.level = 'debug';

async function task(version) {
  await require('./champions').getChampionsJSON(version);
  await require('./ids').getIdsJSON(version);
}

get('http://ddragon.leagueoflegends.com/api/versions.json').then(data => {
  logger.info('====== Start ======');
  logger.info('Fetching latest version.');

  let latestVersion = JSON.parse(data)[0];

  logger.info(`Latest version: ${latestVersion}`);

  task(latestVersion).then(() => {
    logger.info('Completed with no issues.');
  }).catch(err => {
    logger.info('An issue has occurred');
    logger.error(err);
  }).finally(() => {
    logger.info('======  End  ======');
  });
});