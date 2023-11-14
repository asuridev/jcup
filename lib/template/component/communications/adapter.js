const {toCapitalCase} = require('../../../utils/capitalCase');
const {TYPES_PROJECTS} = require('../../../utils/typesProject');

const adapter = (summary, nameResource,nameAdapter)=>{

  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(nameAdapter);

  let importAuth = "";
  let inyectAuth = "";
  if(typeProject === TYPES_PROJECTS.SERVLET){
    importAuth = `import ${packageName}.common.restClients.${nameCapital}RestClientAuth;`;
    inyectAuth = `private final ${nameCapital}RestClientAuth ${nameAdapter}RestClientAuth;`;
  }

  return `package ${packageName}.${nameResource}.communications;

${importAuth}
import ${packageName}.common.restClients.${nameCapital}RestClient;
import ${packageName}.${nameResource}.services.${nameCapital}Port;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ${nameCapital}Adapter implements ${nameCapital}Port {

    private final ${nameCapital}RestClient ${nameAdapter}RestClient;
    ${inyectAuth}


    
}

  `;
};

module.exports = {
  adapter
}