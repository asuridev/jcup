const fs = require('fs');
const {generateComponentPackage} = require('../utils/generateComponentPackage');
const { readSummary } = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const {install} = require('../commands/install');
const { jwtFilter } = require('../template/security/auth/security/jwtFilter');
const { jwtUtil } = require('../template/security/auth/security/jwtUtil');
const { securityConfigAuth } = require('../template/security/auth/security/securityConfigAuth');
const { controllerAuth } = require('../template/security/auth/entityAuth/controllerAuth');
const { entityAuth } = require('../template/security/auth/entityAuth/entityAuth');
const { mappersAuth } = require('../template/security/auth/entityAuth/mapperAuth');
const { crudRepositoryAuth } = require('../template/security/auth/entityAuth/crudRepositoryAuth');
const { repositoryImplAuth } = require('../template/security/auth/entityAuth/repositoryImplAuth');

const userAuth = ( argv ) => {
  const entityAuthName = argv.name;
  const entityAuthNameCapital = toCapitalCase(entityAuthName);
  const name = "role";
  const summary = readSummary();
  const strategyId = "NONE-STRING";
  const isAuditable = false;
  summary[name] = {
    strategyId,
    isAuditable,
  };
  const fd = fs.openSync("./jcup.json", "w");
  fs.writeSync(fd, JSON.stringify(summary));
  fs.closeSync(fd);
  generateComponentPackage(name);
  install({ newDependencie:'java-jwt' }) //--> instala dependencia de jwt
  //crecion y sobreescritura de archivos
  const { pathMainPackage } = summary;
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  fs.writeFileSync(`.${startPath}/security/JwtFilter.java`, jwtFilter( summary ));
  fs.writeFileSync(`.${startPath}/security/JwtUtil.java`, jwtUtil( summary ));
  fs.writeFileSync(`.${startPath}/security/SecurityConfig.java`, securityConfigAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/controller/${entityAuthNameCapital}Controller.java`, controllerAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/entities/${entityAuthNameCapital}Entity.java`, entityAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/mappers/${entityAuthNameCapital}Mapper.java`, mappersAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/repositories/${entityAuthNameCapital}CrudRepository.java`, crudRepositoryAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/${entityAuthNameCapital}RepositoryImpl.java`, repositoryImplAuth( summary, entityAuthName ));
};



module.exports = {
  userAuth
}