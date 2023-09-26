const fs = require('fs');
require('colors');
const setting = require('../settings/setting.json')
const { readSummary } = require('../utils/readSummary');
const { updateBuildGradle } = require('../utils/updateBuildGradle');


const install = async ( argv )=>{
  const dependencie = argv.newDependencie;
  try {
    if(!dependencie){
      updateBuildGradle();
      console.log('las dependencias fueron instaladas satisfactoriamente'.green);
    }else{
      updateBuildGradle();
      const dependencieSelected =  setting.dependencies[dependencie.toLowerCase()];
      if(!dependencieSelected) throw {code:'NOFOUND'}
      const summary = readSummary();
      if(summary.dependencies.includes(dependencie.toLowerCase())) throw {code:'EXIST'}
      summary.dependencies.push(dependencie.toLowerCase());
      const fd = fs.openSync('./jcup.json','w');
      fs.writeSync(fd, JSON.stringify(summary));
      fs.closeSync(fd);
      updateBuildGradle();
      console.log(`la dependencia ${dependencie} fue Instalada exitosamente.`.green);
    } 
    
  } catch (error) {
    if(error.code === 'NOFOUND'){
      console.log(`La dependencia ${dependencie} no existe en jcup`.red);
      console.log('asegurese de escribir bien el nombre de la dependencia'.red)
    }else if(error.code === 'EXIST'){
      console.log(`La dependencia ${dependencie} ya se encuentra instalda en el proyecto`.blue);
    }else if(error.code === 'ENOENT'){
      console.log('Este proyecyto no fué creado con jcup'.red);
    }else if(error.code === 'NOBUILD'){
      console.log('el archivo build.gradle no fue encontrado en la raiz del proyecto'.red);
    }
  }
}

module.exports = {
  install
}