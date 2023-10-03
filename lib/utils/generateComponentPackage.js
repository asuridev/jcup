const fs = require('fs');
const {readSummary} = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const {controller} = require('../template/component/controller/controller');
const { service } = require('../template/component/services/service');
const { serviceRepository } = require('../template/component/services/serviceRepository');
const { createDto } = require('../template/component/services/dtos/createDto');
const { updateDto } = require('../template/component/services/dtos/updateDto');
const { dto } = require('../template/component/services/dtos/dto');
const { entity } = require('../template/component/persistence/entities/entity');
const { mappers } = require('../template/component/persistence/mappers/mappers');
const { crudRepository } = require('../template/component/persistence/repositories/crudRepository');
const { paginationRepository } = require('../template/component/persistence/repositories/paginationRepository');
const { repositoryImpl } = require('../template/component/persistence/repositoryImpl');


const generateComponentPackage = (name)=>{
  const nameCapital = toCapitalCase(name);
  const summary = readSummary();
  const { pathMainPackage } = summary;
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  //definicion de rutas del componente
  fs.mkdirSync(`.${startPath}/${name}`);
  fs.mkdirSync(`.${startPath}/${name}/controller`);
  fs.mkdirSync(`.${startPath}/${name}/persistence`);
  fs.mkdirSync(`.${startPath}/${name}/persistence/entities`);
  fs.mkdirSync(`.${startPath}/${name}/persistence/mappers`);
  fs.mkdirSync(`.${startPath}/${name}/persistence/repositories`);
  fs.mkdirSync(`.${startPath}/${name}/services`);
  fs.mkdirSync(`.${startPath}/${name}/services/dtos`);
  // copia de archivos 
  fs.writeFileSync(`.${startPath}/${name}/controller/${nameCapital}Controller.java`, controller( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/services/${nameCapital}Service.java`, service( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/services/${nameCapital}ServiceRepository.java`, serviceRepository( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/services/dtos/Create${nameCapital}Dto.java`, createDto( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/services/dtos/Update${nameCapital}Dto.java`, updateDto( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/services/dtos/${nameCapital}Dto.java`, dto( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/persistence/entities/${nameCapital}Entity.java`, entity( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/persistence/mappers/${nameCapital}Mapper.java`, mappers( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/persistence/repositories/${nameCapital}CrudRepository.java`, crudRepository( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/persistence/repositories/${nameCapital}PaginationRepository.java`, paginationRepository( summary, name ));
  fs.writeFileSync(`.${startPath}/${name}/persistence/${nameCapital}RepositoryImpl.java`,repositoryImpl( summary, name ));
 
};

module.exports = {
  generateComponentPackage
}