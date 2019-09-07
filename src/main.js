const log4js = require('log4js');
const {get} = require('request-promise');
const {generateJsonFiles} = require('./champions');

const logger = log4js.getLogger('main');

logger.level = 'debug';

generateJsonFiles();
