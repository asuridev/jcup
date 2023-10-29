const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');



const repositoryImplAuth = ( summary, name )=>{
  const { packageName } = summary;
  const {strategyId } = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);


  return `package ${packageName}.${name}.persistence;

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
import java.util.Optional;


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
    public Optional<${nameCapital}Dto> findOne${nameCapital}(${typeData} id) {
        return this.${name}CrudRepository.findById(id).map(this.${name}Mapper::to${nameCapital}Dto);
    }

    @Override
    public Optional<${nameCapital}Dto> findByUsername(String username) {
        return  this.${name}CrudRepository.findFirstByUsername(username).map(this.${name}Mapper::to${nameCapital}Dto);
    }

    @Override
    public Optional<${nameCapital}Dto> update${nameCapital}(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id) {
        ${nameCapital}Entity ${name}EntityById = this.${name}CrudRepository.findById(id).orElse(null);
        if(${name}EntityById == null) return Optional.empty();;
        ${nameCapital}Entity ${name}EntityUpdate = this.${name}Mapper.merge(update${nameCapital}Dto, ${name}EntityById);
        ${nameCapital}Entity responseQuery = this.${name}CrudRepository.save(${name}EntityUpdate);
        return Optional.of(${name}Mapper.to${nameCapital}Dto(responseQuery));
    }

    @Override
    public void remove${nameCapital}(${typeData} id) {
        this.${name}CrudRepository.deleteById(id);
    }
}

  `;
};

module.exports = {
  repositoryImplAuth
}