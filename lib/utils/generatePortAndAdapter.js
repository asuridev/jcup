const {generatePort} = require('../utils/generatePort');
const {generateAdapter} = require('../utils/generateAdapter');
const {generateWebClient} = require('../utils/generateWebClient');


const generatePortAndAdapter = (name)=>{
  //const summary = readSummary();
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameWebClients = nameAsArray[1];
  generateWebClient(nameWebClients);
  generatePort(name);
  generateAdapter(name);
};


module.exports = {
  generatePortAndAdapter
}