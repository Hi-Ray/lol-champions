const log4js = require('log4js');
const {get} = require('request-promise');
const {getChampionsJSON} = require('./champions');

const logger = log4js.getLogger('main');

logger.level = 'debug';

function task(version) {
  getChampionsJSON(version);
}

// Get latest version from ddragon.
get('http://ddragon.leagueoflegends.com/api/versions.json').then(data => {
  logger.info('Fetching latest version.');
  let latestVersion = JSON.parse(data)[0];
  logger.info(`Latest version: ${latestVersion}`);
  task(latestVersion);
});
