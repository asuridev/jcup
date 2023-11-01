const fs = require('fs');
const {readSummary} = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { port } = require('../template/component/services/port');


const generatePort = (name) =>{
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const namePort = nameAsArray[1];
  if(!namePort){
    return console.log('Incorrect format \n'.red, 'Formato: jcup g dto <name-resource>/<name-dto>'.blue);
  }
  const nameCapital = toCapitalCase(namePort);
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
  if(fileExists(`.${startPath}/${nameResource.toLowerCase()}/services/${nameCapital}Port.java`)){
    return console.log(`There is already a port with the name ${nameCapital}Port`.red);
  }
  fs.writeFileSync(`.${startPath}/${nameResource.toLowerCase()}/services/${nameCapital}Port.java`, port( summary,nameResource.toLowerCase(), namePort ));
  console.log(`A port was created with the name: ${nameResource.toLowerCase()}/services/${nameCapital}Port`.green);
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
};

module.exports={
  generatePort
}