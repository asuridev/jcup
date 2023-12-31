const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { TYPES_PROJECTS } = require('../utils/typesProject');
const { webClient } = require('../template/common/webClient/webClient');
const { webClientFeign } = require('../template/common/webClient/webClientFeign');
const { webClientFeignConfig } = require('../template/common/webClient/webClientFeignConfig');
const { webClientFeignAuth } = require('../template/common/webClient/webClientFeignAuth');


const generateWebClient = (name)=>{
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameWebClient = nameAsArray[1] || name;

  const nameCapital = toCapitalCase(nameWebClient);
  const summary = readSummary();
  const { pathMainPackage, typeProject } = summary;
  
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  if(!fs.existsSync(`./${startPath}/common/restClients`)){
    fs.mkdirSync(`.${startPath}/common/restClients`);
  }
  if(fileExists(`.${startPath}/common/restClients/${nameCapital}RestClient.java`)){
    return console.log(`There is already a webClient with name ${nameCapital}RestClient`.red);
  }
  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    fs.writeFileSync(`.${startPath}/common/restClients/${nameCapital}RestClient.java`, webClient( summary, nameWebClient ));
  }else{
    //Proyect Servlet
    fs.writeFileSync(`.${startPath}/common/restClients/${nameCapital}RestClient.java`, webClientFeign( summary, nameResource.toLowerCase(), nameWebClient));
    fs.writeFileSync(`.${startPath}/common/restClients/${nameCapital}RestClientConfig.java`, webClientFeignConfig( summary, nameResource.toLowerCase(), nameWebClient));
    fs.writeFileSync(`.${startPath}/common/restClients/${nameCapital}RestClientAuth.java`, webClientFeignAuth( summary, nameResource.toLowerCase(), nameWebClient));
  }
  
  console.log(`A rest-client was created with name: common/restClients/${nameCapital}RestClient`.green);
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