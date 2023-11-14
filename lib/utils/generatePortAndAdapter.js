const {generatePort} = require('../utils/generatePort');
const {generateAdapter} = require('../utils/generateAdapter');
const {generateWebClient} = require('../utils/generateWebClient');


const generatePortAndAdapter = (name)=>{
  generatePort(name);
  generateAdapter(name);
  generateWebClient(name);
};


module.exports = {
  generatePortAndAdapter
}