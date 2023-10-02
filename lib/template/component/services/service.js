const {toCapitalCase} = require('../../../utils/capitalCase');

const service  = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = strategyId === 'UUID' ? 'String' : 'Long';

  return `package ${packageName}.${name}.services;

import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class ${nameCapital}Service {

    private final ${nameCapital}ServiceRepository ${name}ServiceRepository;

    public ${nameCapital}Dto create(Create${nameCapital}Dto create${nameCapital}Dto){
        return ${name}ServiceRepository.create${nameCapital}(create${nameCapital}Dto);
    }

    public Page<${nameCapital}Dto> findAll(int page, int limit, String sortBy){
        return ${name}ServiceRepository.findAll${nameCapital}s(page, limit ,sortBy);
    }

    public ${nameCapital}Dto findOne(${typeData} id){
        return ${name}ServiceRepository.findOne${nameCapital}(id);
    }

    public ${nameCapital}Dto update(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id){
      return ${name}ServiceRepository.update${nameCapital}(update${nameCapital}Dto, id);
    }

    public void remove(${typeData} id){
        ${name}ServiceRepository.remove${nameCapital}(id);
    }
}

  `;
}

module.exports = {
  service
}