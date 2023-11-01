const fs = require('fs');
require('colors');
const setting = require('../settings/setting.json')
const { readSummary } = require('../utils/readSummary');
const { handlerExceptions } = require('../utils/handlerExceptions');
const { updateBuildGradle } = require('../utils/updateBuildGradle');


const install = async ( argv )=>{
  const dependencie = argv.newDependencie;
  try {
    if(!dependencie){
      updateBuildGradle();
      console.log('The dependencies were installed sucessfully'.green);
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
      console.log(`The dependence ${dependencie} was installed sucessfully.`.green);
    } 
  } catch (error) {
    handlerExceptions(error, dependencie);
  }
}

module.exports = {
  install
}