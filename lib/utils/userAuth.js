const fs = require('fs');
const {generateComponentPackage} = require('../utils/generateComponentPackage');
const { readSummary } = require('../utils/readSummary');
const { TYPES_PROJECTS } = require('../utils/typesProject')
const { toCapitalCase } = require('../utils/capitalCase');
const {install} = require('../commands/install');
const { jwtFilter } = require('../template/security/auth/security/jwtFilter');
const { jwtFilterWebflux } = require('../template/security/auth/security/jwtFilterWebflux');
const { jwtUtil } = require('../template/security/auth/security/jwtUtil');
const { securityConfigAuth } = require('../template/security/auth/security/securityConfigAuth');
const { securityConfigAuthWebflux } = require('../template/security/auth/security/securityConfigAuthWebflux');
const { securityConfigAuthJava11 } = require('../template/security/auth/security/securityConfigAuthJava11');
const { controllerAuth } = require('../template/security/auth/entityAuth/controllerAuth');
const { entityAuth } = require('../template/security/auth/entityAuth/entityAuth');
const { mappersAuth } = require('../template/security/auth/entityAuth/mapperAuth');
const { crudRepositoryAuth } = require('../template/security/auth/entityAuth/crudRepositoryAuth');
const { repositoryImplAuth } = require('../template/security/auth/entityAuth/repositoryImplAuth');
const { converterDtoAuth } = require('../template/security/auth/entityAuth/dtos/converterDtoAuth');
const { createDtoAuth } = require('../template/security/auth/entityAuth/dtos/createDtoAuth');
const { responseLoginDtoAuth } = require('../template/security/auth/entityAuth/dtos/responseLoginDtoAuth');
const { responseDtoAuth } = require('../template/security/auth/entityAuth/dtos/responseDtoAuth');
const { updateDtoAuth } = require('../template/security/auth/entityAuth/dtos/updateDtoAuth');
const { dtoAuth } = require('../template/security/auth/entityAuth/dtos/dtoAuth');
const { secureServices } = require('../template/security/auth/entityAuth/secureServices');
const { secureServicesWebflux } = require('../template/security/auth/entityAuth/secureServicesWebflux');
const { serviceAuth } = require('../template/security/auth/entityAuth/serviceAuth');
const { serviceRepository } = require('../template/security/auth/entityAuth/serviceRepositoryAuth');
const {  roleMapperAuth } = require('../template/security/auth/role/roleMapperAuth');
const {  roleDtoAuth } = require('../template/security/auth/role/roleDtoAuth');

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
  const { javaVersion, typeProject } = summary;
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
  if(javaVersion === 11){
    if(typeProject === TYPES_PROJECTS.WEBFLUX){
      fs.writeFileSync(`.${startPath}/security/JwtFilter.java`, jwtFilterWebflux( summary ));
      fs.writeFileSync(`.${startPath}/security/SecurityConfig.java`, securityConfigAuthWebflux( summary, entityAuthName ));
      fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}SecurityService.java`, secureServicesWebflux( summary, entityAuthName ));
    }else{
      fs.writeFileSync(`.${startPath}/security/JwtFilter.java`, jwtFilter( summary ));
      fs.writeFileSync(`.${startPath}/security/SecurityConfig.java`, securityConfigAuthJava11( summary, entityAuthName ));
      fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}SecurityService.java`, secureServices( summary, entityAuthName ));
    }
  }else{
    //java 17+
    if(typeProject === TYPES_PROJECTS.WEBFLUX){
      fs.writeFileSync(`.${startPath}/security/JwtFilter.java`, jwtFilterWebflux( summary ));
      fs.writeFileSync(`.${startPath}/security/SecurityConfig.java`, securityConfigAuthWebflux( summary, entityAuthName ));
      fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}SecurityService.java`, secureServicesWebflux( summary, entityAuthName ));
    }else{
      //servlet
      fs.writeFileSync(`.${startPath}/security/JwtFilter.java`, jwtFilter( summary ));
      fs.writeFileSync(`.${startPath}/security/SecurityConfig.java`, securityConfigAuth( summary, entityAuthName ));
      fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}SecurityService.java`, secureServices( summary, entityAuthName ));
    }
  }
  
  fs.writeFileSync(`.${startPath}/security/JwtUtil.java`, jwtUtil( summary ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/controller/${entityAuthNameCapital}Controller.java`, controllerAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/entities/${entityAuthNameCapital}Entity.java`, entityAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/mappers/${entityAuthNameCapital}Mapper.java`, mappersAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/repositories/${entityAuthNameCapital}CrudRepository.java`, crudRepositoryAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/persistence/${entityAuthNameCapital}RepositoryImpl.java`, repositoryImplAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/Converter${entityAuthNameCapital}Dto.java`, converterDtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/Create${entityAuthNameCapital}Dto.java`, createDtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/ResponseLoginDto.java`, responseLoginDtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/Response${entityAuthNameCapital}Dto.java`, responseDtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/Update${entityAuthNameCapital}Dto.java`, updateDtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/dtos/${entityAuthNameCapital}Dto.java`, dtoAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}Service.java`, serviceAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/${entityAuthName}/services/${entityAuthNameCapital}ServiceRepository.java`, serviceRepository( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/role/persistence/mappers/RoleMapper.java`, roleMapperAuth( summary, entityAuthName ));
  fs.writeFileSync(`.${startPath}/role/services/dtos/CreateRoleDto.java`, roleDtoAuth( summary, 'CreateRoleDto' ));
  fs.writeFileSync(`.${startPath}/role/services/dtos/UpdateRoleDto.java`, roleDtoAuth( summary, 'UpdateRoleDto' ));
  fs.writeFileSync(`.${startPath}/role/services/dtos/ResponseRoleDto.java`, roleDtoAuth( summary, 'ResponseRoleDto' ));
  fs.writeFileSync(`.${startPath}/role/services/dtos/RoleDto.java`, roleDtoAuth( summary, 'RoleDto' ));
};



module.exports = {
  userAuth
}