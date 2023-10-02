const { toCapitalCase } = require('../../../utils/capitalCase');



const repositoryImpl = ( summary, name )=>{
  const { packageName } = summary;
  const {strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = strategyId === 'UUID' ? 'String' : 'Long';


  return `package ${packageName}.${name}.persistence;

import ${packageName}.common.exceptions.NotFoundException;
import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import ${packageName}.${name}.persistence.mappers.${nameCapital}Mapper;
import ${packageName}.${name}.persistence.repositories.${nameCapital}CrudRepository;
import ${packageName}.${name}.persistence.repositories.${nameCapital}PaginationRepository;
import ${packageName}.${name}.services.${nameCapital}ServiceRepository;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;



@Repository
@RequiredArgsConstructor
public class ${nameCapital}RepositoryImpl implements ${nameCapital}ServiceRepository {

    private final ${nameCapital}CrudRepository ${name}CrudRepository;
    private final ${nameCapital}PaginationRepository ${name}PaginationRepository;
    private final ${nameCapital}Mapper ${name}Mapper;

    @Override
    public ${nameCapital}Dto create${nameCapital}(Create${nameCapital}Dto create${nameCapital}Dto) {
        ${nameCapital}Entity new${nameCapital} = this.${name}Mapper.to${nameCapital}Entity(create${nameCapital}Dto);
        ${nameCapital}Entity responseQuery = this.${name}CrudRepository.save(new${nameCapital});
        return ${name}Mapper.to${nameCapital}Dto(responseQuery);
    }

    @Override
    public Page<${nameCapital}Dto> findAll${nameCapital}s(int page, int limit, String sortBy) {
        Pageable pageRequest = PageRequest.of(page, limit, Sort.by(sortBy));
        return this.${name}PaginationRepository.findAll(pageRequest).map(this.${name}Mapper::to${nameCapital}Dto);
    }

    @Override
    public ${nameCapital}Dto findOne${nameCapital}(${typeData} id) {
        ${nameCapital}Entity responseQuery = this.${name}CrudRepository.findById(id).orElse(null);
        if(responseQuery == null) throw new NotFoundException("No se encontró el usuario con id:" + id);
        return this.${name}Mapper.to${nameCapital}Dto(responseQuery);
    }

    @Override
    public ${nameCapital}Dto update${nameCapital}(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id) {
        ${nameCapital}Entity ${name}EntityById = this.${name}CrudRepository.findById(id).orElse(null);
        if(${name}EntityById == null) throw new NotFoundException();
        ${nameCapital}Entity ${name}EntityUpdate = this.${name}Mapper.merge(update${nameCapital}Dto, ${name}EntityById);
        ${nameCapital}Entity responseQuery = this.${name}CrudRepository.save(${name}EntityUpdate);
        return ${name}Mapper.to${nameCapital}Dto(responseQuery);
    }

    @Override
    public void remove${nameCapital}(${typeData} id) {
        this.findOne${nameCapital}(id);
        this.${name}CrudRepository.deleteById(id);
    }
}

  `;
};

module.exports = {
    repositoryImpl
}