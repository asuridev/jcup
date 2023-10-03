const fs = require('fs');
require('colors');
const inquirer = require('inquirer');
const { readSummary } = require('../utils/readSummary');
const {generateComponentPackage} = require('../utils/generateComponentPackage');


const generate = async (argv) =>{

  const type = (argv.type).toLowerCase();
  const name = (argv.name).toLowerCase();
  
  if(type === "res" || type === "resource"){
    const summary = readSummary();
    if(summary[name]) return console.log(`ya existe un recurso con el nombre: ${name}`.red)
    const prompt = inquirer.createPromptModule();
    const strategyId = await askForStrategyId(prompt);
    const isAuditable = await askIsAuditable(prompt);

    summary[name]= {
      strategyId,
      isAuditable
    };
    const fd = fs.openSync('./jcup.json','w');
    fs.writeSync(fd, JSON.stringify(summary));
    fs.closeSync(fd);
    generateComponentPackage(name);

  }

}

const askForStrategyId = async (prompt)=>{
  const { strategyId } = await prompt({
    type: "rawlist",
    message: "Seleccione la estrategia de ID de la base de tados",
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
    ]
  });
  return strategyId;
};

const askIsAuditable = async (prompt)=>{
  const { isAuditable } = await prompt({
    type: "rawlist",
    message: "El recurso será auditable ?",
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