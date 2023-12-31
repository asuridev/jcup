const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');

const crudRepository = (summary, name)=>{

  const { packageName } = summary;
  const { strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);

  
  return `package ${packageName}.${name}.persistence.repositories;


import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import org.springframework.data.repository.CrudRepository;


public interface ${nameCapital}CrudRepository extends CrudRepository <${nameCapital}Entity,${typeData}>{


}

  `;
};

module.exports = {
  crudRepository
}