const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { TYPES_PROJECTS } = require('../utils/typesProject');
const { webClient } = require('../template/common/webClient/webClient');


const generateWebClient = (name)=>{
  const nameCapital = toCapitalCase(name);
  const summary = readSummary();
  const { pathMainPackage, typeProject } = summary;
  if(typeProject === TYPES_PROJECTS.SERVLET){
    return console.log('No es posible Generar un WebClient, el proyecto es de tipo servlet. \n cree un proyecto webflux'.red)
  }
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  if(!fs.existsSync(`./${startPath}/common/webClients`)){
    fs.mkdirSync(`.${startPath}/common/webClients`);
  }
  if(fileExists(`.${startPath}/common/webClients/${nameCapital}WebClient.java`)){
    return console.log(`Ya existe un dto con el nombre ${nameCapital}WebClient`.red);
  }
  fs.writeFileSync(`.${startPath}/common/webClients/${nameCapital}WebClient.java`, webClient( summary, name ));
  console.log(`se creó un webClient con nombre: common/webClients/${nameCapital}WebClient`.green);
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
  generateWebClient
}