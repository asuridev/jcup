const { toCapitalCase } = require('../../../utils/capitalCase')

const webClientFeign = (summary, name) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.common.restClients;

import ${packageName}.common.azios.Azios;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "${name}", url = "https://ejemplo.com/end-point")
public interface ${nameCapital}RestClient extends Azios<> {

}

  `;
};

module.exports = {
  webClientFeign
}