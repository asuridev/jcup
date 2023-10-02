const fs = require('fs');
require('colors');
const { readSummary } = require('../utils/readSummary');
const { createBildGradle } = require('../template/buildGradle');

const updateBuildGradle = ()=>{
  try {
    const summary = readSummary();
    const buildGradle = createBildGradle({
      groupName: summary.groupName,
      javaVersion:summary.javaVersion,
      dependencies: summary.dependencies,
    });
    let fd = fs.openSync('./build.gradle','rs');
    fs.closeSync(fd);
    fd = fs.openSync('./build.gradle','w');
    fs.writeSync(fd, buildGradle);
    fs.closeSync(fd);
  } catch (error) {
    if(error.code === 'ENOENT'){
      throw {code: 'NOBUILD'}
    }
  }
};


module.exports  = {
  updateBuildGradle
}