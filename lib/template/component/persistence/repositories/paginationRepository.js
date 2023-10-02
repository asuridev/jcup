const { toCapitalCase } = require('../../../../utils/capitalCase');

const paginationRepository = (summary, name)=>{

  const { packageName } = summary;
  const { strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = strategyId === 'UUID' ? 'String' : 'Long';

  
  return `package ${packageName}.${name}.persistence.repositories;


import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import org.springframework.data.repository.ListPagingAndSortingRepository;


public interface ${nameCapital}PaginationRepository extends ListPagingAndSortingRepository <${nameCapital}Entity,${typeData}>{


}

  `;
};

module.exports = {
  paginationRepository
}