const {get} = require('request-promise');
const {writeFile} = require('fs');
const {join} = require('path');

const log4js = require('log4js');

const logger = log4js.getLogger('champions');

logger.level = 'debug';

let champions = [];
let key = [];

// Here you can change file names
let championsFileName = 'champions';
let idsFileName = 'ids';
//

// Get and parse the data from ddragon
function getChampionsJSON(version) {
  get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).
      then(data => {
        let championsData = JSON.parse(data).data;

        for (let value in championsData) {
          champions.push(value);
          key.push(championsData[value].key);
        }
      }).catch(err => {
    logger.error(err);
  }).finally(() => {
    makeChampionsJSON();
    makeIdsJSON();
  });
}

// turn data into object then turn object into json string then write to file
function makeIdsJSON() {
  let ids = {};
  for (let i = 0; i < champions.length; i++) {
    ids[champions[i]] = key[i];
  }
  logger.info(`Writing ${idsFileName}.json`);
  writeFile(`${idsFileName}.json`, JSON.stringify(ids), err => {
    if (err) {
      logger.error(`Unable to write ${idsFileName}.json`);
    }
    logger.info(`Created ${idsFileName}.json`);
  });
}

function makeChampionsJSON() {
  let champion = {};
  for (let i = 0; i < champions.length; i++) {
    champion[key[i]] = champions[i];
  }
  logger.info(`Writing ${championsFileName}.json`);
  writeFile(`${championsFileName}.json`, JSON.stringify(champion), err => {
    if (err) {
      logger.error(`Unable to write ${championsFileName}.json`);
    }
    logger.info(`Created ${championsFileName}.json`);
  });
}

module.exports = {getChampionsJSON};