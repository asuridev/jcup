const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { updateBuildGradle } = require('../utils/updateBuildGradle');
const { handlerExceptions } = require('../utils/handlerExceptions');

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
    const fd = fs.openSync('./jcup.json','w');
    fs.writeSync(fd, JSON.stringify(newSummary));
    fs.closeSync(fd);
    updateBuildGradle();
    console.log(`The dependece ${dependencie} was uninstalled sucessfully.`.green);
  } catch (error) {
    handlerExceptions(error, dependencie);
  }

}

module.exports = {
  uninstall
}