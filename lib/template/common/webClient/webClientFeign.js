const { toCapitalCase } = require('../../../utils/capitalCase')

const webClientFeign = (summary, nameResource, nameWebclient) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(nameWebclient);

  return `package ${packageName}.common.restClients;

import ${packageName}.common.azios.Azios;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "${nameWebclient}", url = "https://example.com/end-point", configuration = ${nameCapital}RestClientConfig.class)
public interface ${nameCapital}RestClient extends Azios< > {

}

  `;
};

module.exports = {
  webClientFeign
}