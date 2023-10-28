const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');

const crudRepositoryAuth = (summary, name)=>{

  const { packageName } = summary;
  const { strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);

  
  return `package ${packageName}.${name}.persistence.repositories;


import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ${nameCapital}CrudRepository extends CrudRepository <${nameCapital}Entity,${typeData}>{
  
  Optional<${nameCapital}Entity> findFirstByUsername(String username);

}

  `;
};

module.exports = {
  crudRepositoryAuth
}