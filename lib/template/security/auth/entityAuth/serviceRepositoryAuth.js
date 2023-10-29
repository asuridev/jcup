const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');


const serviceRepository = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = getTypeData(strategyId);

  return `package ${packageName}.${name}.services;

import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import org.springframework.data.domain.Page;
import java.util.Optional;

public interface ${nameCapital}ServiceRepository {

    public ${nameCapital}Dto create${nameCapital}(Create${nameCapital}Dto create${nameCapital}Dto);

    public Page<${nameCapital}Dto> findAll${nameCapital}s(int page, int limit, String sortBy);

    public Optional<${nameCapital}Dto> findOne${nameCapital}(${typeData} id);

    public Optional<${nameCapital}Dto> findByUsername(String email);

    public Optional<${nameCapital}Dto> update${nameCapital}(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id);

    public void remove${nameCapital}(${typeData} id);
}

  `;
}

module.exports = {
  serviceRepository
}