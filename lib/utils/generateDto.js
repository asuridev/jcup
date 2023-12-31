const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { TYPES_PROJECTS } = require('../utils/typesProject');
const {templateDto} = require('../template/component/services/dtos/templateDto')

const generateDto = (name) =>{
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameDto = nameAsArray[1];
  if(!nameDto){
    return (' Incorrect format \n'.red, 'Format: jcup g dto <name-resource>/<name-dto>'.blue);
  }
  const nameDtoCapital = toCapitalCase(nameDto);
  const summary = readSummary();
  const { pathMainPackage, typeProject } = summary;
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  if(!fs.existsSync(`./${startPath}/${nameResource.toLowerCase()}`)){
    return console.log(`There is no resource with name ${nameResource.toLowerCase()}`.red);
  }
  if(fileExists(`./${startPath}/${nameResource.toLowerCase()}/services/dtos/${nameDtoCapital}Dto.java`)){
    return console.log(`There is already a dto with name ${nameDtoCapital}Dto`.red);
  }
  fs.writeFileSync(`./${startPath}/${nameResource.toLowerCase()}/services/dtos/${nameDtoCapital}Dto.java`, templateDto( summary,nameResource.toLowerCase(), nameDto ));
  console.log(`A Dto was created with name: ${nameDtoCapital}Dto`.green)
};


const fileExists = (path)=> {
  try {
    let fd = fs.openSync(path,'rs');
    fs.closeSync(fd);
    return true;
  } catch (error) {
    if(error.code === 'ENOENT'){
     return false;
    }
  }
}

module.exports = {
  generateDto
}