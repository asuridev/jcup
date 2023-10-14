const fs = require('fs');
const {readSummary} = require('../utils/readSummary');
const { toCapitalCase } = require('../utils/capitalCase');
const { adapter } = require('../template/component/communications/adapter');


const generateAdapter = (name) =>{
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameAdapter = nameAsArray[1];
  if(!nameAdapter){
    return console.log('formato incorrecto \n'.red, 'Formato: jcup g dto <name-resource>/<name-dto>'.blue);
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
    return console.log(`No existe un recurso con nombre ${nameResource.toLowerCase()}`.red);
  }
  if(!fs.existsSync(`./${startPath}/${nameResource.toLowerCase()}/communications`)){
    fs.mkdirSync(`./${startPath}/${nameResource.toLowerCase()}/communications`);
  }
  if(fileExists(`./${startPath}/${nameResource.toLowerCase()}/communications/${nameCapital}Adapter.java`)){
    return console.log(`Ya existe un Adaptador con el nombre ${nameCapital}Adapter`.red);
  }
  fs.writeFileSync(`.${startPath}/${nameResource.toLowerCase()}/communications/${nameCapital}Adapter.java`, adapter( summary,nameResource.toLowerCase(), nameAdapter.toLowerCase() ));
  console.log(`se creó un Adapter con nombre: ${nameResource.toLowerCase()}/communications/${nameCapital}Adapter`.green);
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