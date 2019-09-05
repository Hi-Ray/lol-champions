const log4js = require('log4js');
const {get} = require('request-promise');

const logger = log4js.getLogger('champions');

logger.level = 'debug';

let champions;
let championsId;
let championsKey;

async function getChampionsJSON(version) {
  get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).
      then(data => {
        let championsData = JSON.parse(data).data;



        for(let value in championsData){
          logger.debug(championsData[value].key)

        }
      });
}

module.exports = {getChampionsJSON};