const fs = require('fs');
const { applicationYml } = require('../template/resources/applicationYml');
const { applicationDevYml } = require('../template/resources/applicationDevYml');
const { applicationPdnYml } = require('../template/resources/applicationPdnYml');


const generateYmlFiles = (summary) =>{
  const { proyectName } = summary;

  fs.writeFileSync(`./${proyectName}/src/main/resources/application.yml`, applicationYml());
  fs.writeFileSync(`./${proyectName}/src/main/resources/application-dev.yml`, applicationDevYml());
  fs.writeFileSync(`./${proyectName}/src/main/resources/application-pdn.yml`, applicationPdnYml());
  
};

module.exports = {
  generateYmlFiles
}