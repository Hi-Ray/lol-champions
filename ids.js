const log4js = require('log4js');
const {get} = require('request-promise');

const logger = log4js.getLogger('champions');

logger.level = 'debug';

async function getIdsJSON(version) {

}

module.exports = {getIdsJSON};