const fs = require('fs');
require('colors');

const readSummary = ()=>{
  try {
    let fd = fs.openSync('./jcup.json','rs');
    const summary = fs.readFileSync(fd,'utf-8');
    fs.closeSync(fd);
    return JSON.parse(summary);
  } catch (error) {
    if(error.code === 'ENOENT'){
     throw { code:'ENOENT' };
    }
  }
}


module.exports = {
  readSummary
}