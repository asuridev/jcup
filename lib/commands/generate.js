const fs = require('fs');
require('colors');
const inquirer = require('inquirer');
const { readSummary } = require('../utils/readSummary');
const {generateComponentPackage} = require('../utils/generateComponentPackage');
const { generateWebClient } = require('../utils/generateWebClient');
const { generateDto } = require('../utils/generateDto');
const { generatePortAndAdapter } = require('../utils/generatePortAndAdapter');
const { jsonToDto } = require('../utils/jsonToDto');
const { userAuth } = require('../utils/userAuth');


const generate = async (argv) =>{
  const type = (argv.type).toLowerCase();
  const name = (argv.name);
  
  if(type === "res" || type === "resource"){
    const summary = readSummary();
    //if(summary[name]) return console.log(`There is already a resource with name: ${name}`.red)
    const prompt = inquirer.createPromptModule();
    const strategyId = await askForStrategyId(prompt);
    const isAuditable = await askIsAuditable(prompt);
    summary[name] = {
      strategyId,
      isAuditable
    };
    const fd = fs.openSync('./jcup.json','w');
    fs.writeSync(fd, JSON.stringify(summary));
    fs.closeSync(fd);
    generateComponentPackage(name);
    if(argv.auth) userAuth(argv);// pregunto si el agregado manejara la authentication.
  }
  if(type === 'web-client' || type === 'wc'){
    generateWebClient(name);
  }

  if(type === 'dto'){
    generateDto(name);
  }
  if(type === 'port-adapter' || type === 'pa'){
    generatePortAndAdapter(name);
  }
  if(type === 'json-to-dto' || type === 'jtd'){
    jsonToDto(name);
  }

}

const askForStrategyId = async (prompt)=>{
  const { strategyId } = await prompt({
    type: "rawlist",
    message: "Select the ID strategy from the data base",
    name: "strategyId",
    choices:[
      {
        value:"IDENTITY",
        name:'Identity'
      },
      {
        value:"UUID",
        name:'uuid'
      },
      {
        value:"SEQUENCE",
        name:'Sequence'
      },
      {
        value:"NONE-STRING",
        name:'none, id as String'
      },
      {
        value:"NONE-NUMBER",
        name:'none, id as number'
      },
    ]
  });
  return strategyId;
};

const askIsAuditable = async (prompt)=>{
  const { isAuditable } = await prompt({
    type: "rawlist",
    message: "Will the resource be auditable?",
    name: "isAuditable",
    choices:[
      {
        value:true,
        name:'Yes'
      },
      {
        value:false,
        name:'No'
      },
    ]
  });
  return isAuditable;
};



module.exports = {
  generate
}