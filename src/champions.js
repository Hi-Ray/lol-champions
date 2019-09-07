const {get} = require('request-promise');
const {writeFile, existsSync, mkdirSync} = require('fs');
const {join} = require('path');
const log4js = require('log4js');

const logger = log4js.getLogger('champions');

logger.level = 'debug';

let locales = [
  'cs_cz',
  'de_de',
  'default',
  'el_gr',
  'en_au',
  'en_gb',
  'es_ar',
  'es_es',
  'es_mx',
  'fr_fr',
  'hu_hu',
  'it_it',
  'ja_jp',
  'ko_kr',
  'pl_pl',
  'pt_br',
  'ro_ro',
  'ru_ru',
  'th_th',
  'tr_tr',
  'vn_vn',
  'zh_cn',
  'zh_tw',
];

/////////////////////////////////////////////
/// Here you can change file/folder names ///
let championsFileName = 'champions';      ///
let championsFolderName = 'champions';    ///
let idsFileName = 'ids';                  ///
let idsFolderName = 'ids';                ///
/////////////////////////////////////////////

function generateJsonFiles() {
  existsSync(championsFolderName) ?
      logger.info(`${championsFolderName} exists continuing`) :
      mkdirSync(championsFolderName);
  existsSync(idsFolderName) ?
      logger.info(`${idsFolderName} exists continuing`) :
      mkdirSync(idsFolderName);
  for (let i = 0; i < locales.length; i++) {
    getChampionsJSON(locales[i].toLowerCase());
  }
}

// Get and parse the data from cdragon
function getChampionsJSON(locale) {
  get(`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/${locale}/v1/champion-summary.json`).
      then(data => {
        let json = JSON.parse(data);
        let champions = new Array();
        let key = new Array();

        // Start from index 1 since index 0 isnt an actually champion its just None
        for (let i = 1; i < json.length; i++) {
          champions.push(json[i].name);
          key.push(json[i].id);
        }

        makeChampionsJSON(locale, champions, key);
        makeIdsJSON(locale, champions, key);
      }).catch(err => {
    logger.error(err);
  });
}

// turn data into object then turn object into json string then write to file
function makeIdsJSON(locale, championArray, idArray) {
  let ids = {};
  for (let i = 0; i < championArray.length; i++) {
    ids[championArray[i]] = idArray[i];
  }

  writeFile(join(idsFolderName, `${idsFileName}-${locale}.json`),
      JSON.stringify(ids), err => {
        if (err) {
          logger.error(`Unable to write ${idsFileName}-${locale}.json`);
        }
        logger.info(`Created ${idsFileName}-${locale}.json`);
      });
}

function makeChampionsJSON(locale, championArray, idArray) {
  let champion = {};
  for (let i = 0; i < championArray.length; i++) {
    champion[idArray[i]] = championArray[i];
  }

  writeFile(join(championsFolderName, `${championsFileName}-${locale}.json`),
      JSON.stringify(champion), err => {
        if (err) {
          logger.error(`Unable to write ${championsFileName}-${locale}.json`);
        }
        logger.info(`Created ${championsFileName}-${locale}.json`);
      });
}

module.exports = {generateJsonFiles};