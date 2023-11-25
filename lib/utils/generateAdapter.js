const fs = require('fs');
const { readSummary} = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { adapter } = require('../template/component/communications/adapter');


const generateAdapter = (name) =>{
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameAdapter = nameAsArray[1];
  if(!nameAdapter){
    return console.log('Incorrect format \n'.red, 'Formato: jcup g dto <name-resource>/<name-adapter>'.blue);
  }
  const nameCapital = toCapitalCase(nameAdapter);
  const summary = readSummary();
  const { pathMainPackage, typeProject } = summary;
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }

  if(!fs.existsSync(`./${startPath}/${nameResource.toLowerCase()}`)){
    return console.log(`No named resource exists. ${nameResource.toLowerCase()}`.red);
  }
  if(!fs.existsSync(`./${startPath}/${nameResource.toLowerCase()}/communications`)){
    fs.mkdirSync(`./${startPath}/${nameResource.toLowerCase()}/communications`);
  }
  if(fileExists(`./${startPath}/${nameResource.toLowerCase()}/communications/${nameCapital}Adapter.java`)){
    return console.log(`There is already an adapter with the name ${nameCapital}Adapter`.red);
  }
  fs.writeFileSync(`.${startPath}/${nameResource.toLowerCase()}/communications/${nameCapital}Adapter.java`, adapter( summary,nameResource.toLowerCase(), nameAdapter));
  console.log(`An adapter was created with the name: ${nameResource.toLowerCase()}/communications/${nameCapital}Adapter`.green);
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
  generateAdapter
}