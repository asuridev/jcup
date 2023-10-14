const { toCapitalCase } = require('../../../utils/capitalCase')

const webClient = (summary, name) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.common.webClients;

import ${packageName}.common.azios.Azios;
import org.springframework.stereotype.Component;

@Component
public class ${nameCapital}WebClient extends Azios {

    public ${nameCapital}WebClient() {
        super("http://localhost:4000/api/v2/");
        super.setBearerToken("token");
        //super.setBasicAuth("user","pass");
    }
}

  `;
};

module.exports = {
  webClient
}