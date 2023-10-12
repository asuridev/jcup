const fs = require('fs');
const { applicationYml } = require('../template/resources/applicationYml');
const { applicationDevYml } = require('../template/resources/applicationDevYml');
const { applicationPdnYml } = require('../template/resources/applicationPdnYml');


const generateYmlFiles = (summary) =>{
  const { projectName } = summary;

  fs.writeFileSync(`./${projectName}/src/main/resources/application.yml`, applicationYml(summary));
  fs.writeFileSync(`./${projectName}/src/main/resources/application-dev.yml`, applicationDevYml(summary));
  fs.writeFileSync(`./${projectName}/src/main/resources/application-pdn.yml`, applicationPdnYml(summary));
  
};

module.exports = {
  generateYmlFiles
}