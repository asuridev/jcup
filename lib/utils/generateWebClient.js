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
    return console.log('It is not possible to generate a WebClient, the project is servlet type. \n Create a webflux project'.red)
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
    return console.log(`There is already a webClient with name ${nameCapital}WebClient`.red);
  }
  fs.writeFileSync(`.${startPath}/common/webClients/${nameCapital}WebClient.java`, webClient( summary, name ));
  console.log(`A webClient was created with name: common/webClients/${nameCapital}WebClient`.green);
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