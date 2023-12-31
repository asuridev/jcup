const { toCapitalCase } = require('../../../utils/capitalCase')

const webClient = (summary, name) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.common.restClients;

import ${packageName}.common.azios.Azios;
import org.springframework.stereotype.Component;

@Component
public class ${nameCapital}RestClient extends Azios {

    public ${nameCapital}RestClient() {
        super("http://localhost:4000/api/v2/");
    }
}

  `;
};

module.exports = {
  webClient
}