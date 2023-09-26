const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { updateBuildGradle } = require('../utils/updateBuildGradle');


const uninstall = async ( argv )=>{
  const dependencie = argv.nameDependencie;
  try {
    const summary = readSummary();
    if(!summary.dependencies.includes(dependencie))
      throw { code:'NODEPEN' };
    const newDependencies = summary.dependencies.filter(depen => depen !== dependencie);
    const newSummary = {
      ...summary,
      dependencies:newDependencies
    }
    const newSummaryAsJson = JSON.stringify(newSummary);
    const fd = fs.openSync('./jcup.json','w');
    fs.writeSync(fd, newSummaryAsJson);
    fs.closeSync(fd);
    updateBuildGradle();
    console.log(`la dependencia ${dependencie} fue desinstalada exitosamente.`.green);
  } catch (error) {
    if(error.code === 'ENOENT'){
      console.log('Este proyecyto no fué creado con jcup'.red);
    }else if(error.code === 'NODEPEN'){
      console.log(`la dependencia ${dependencie} no hace parte del proyecto`.red);
    }else if(error.code === 'NOBUILD'){
      console.log('el archivo build.gradle no fue encontrado en la raiz del proyecto'.red);
    }
  }

}


module.exports = {
  uninstall
}