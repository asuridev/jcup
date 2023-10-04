const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');

const paginationRepository = (summary, name)=>{

  const { packageName } = summary;
  const { strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);

  
  return `package ${packageName}.${name}.persistence.repositories;


import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface ${nameCapital}PaginationRepository extends PagingAndSortingRepository <${nameCapital}Entity,${typeData}>{


}

  `;
};

module.exports = {
  paginationRepository
}