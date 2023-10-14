const {toCapitalCase} = require('../../../utils/capitalCase');


const adapter = (summary, nameResource,nameAdapter)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(nameAdapter);

  return `package ${packageName}.${nameResource}.communications;

import ${packageName}.common.webClients.${nameCapital}WebClient;
import ${packageName}.${nameResource}.services.${nameCapital}Port;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ${nameCapital}Adapter implements ${nameCapital}Port {

    private final ${nameCapital}WebClient ${nameAdapter}WebClient;

}

  `;
};

module.exports = {
  adapter
}