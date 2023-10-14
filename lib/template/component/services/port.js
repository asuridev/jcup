const {toCapitalCase} = require('../../../utils/capitalCase');


const port = (summary, nameResource,namePort)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(namePort);

  return `package ${packageName}.${nameResource}.services;

public interface ${nameCapital}Port {

}

  `;
};

module.exports = {
  port
}