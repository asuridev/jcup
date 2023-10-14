const {toCapitalCase} = require('../../../utils/capitalCase');
const {getTypeData} = require('../../../utils/getTypeData');
const {TYPES_PROJECTS} = require('../../../utils/typesProject');


const service  = (summary, name) => {

  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = getTypeData(strategyId);

  if(typeProject === TYPES_PROJECTS.WEBFLUX){

    return `package ${packageName}.${name}.services;

import ${packageName}.common.exceptions.NotFoundException;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@RequiredArgsConstructor
@Service
public class ${nameCapital}Service {

    private final ${nameCapital}ServiceRepository ${name}ServiceRepository;

    public Mono<${nameCapital}Dto> create(Create${nameCapital}Dto create${nameCapital}Dto){
        return Mono.just(${name}ServiceRepository.create${nameCapital}(create${nameCapital}Dto));
    }

    public Mono<Page<${nameCapital}Dto>> findAll(int page, int limit, String sortBy){
        return Mono.just(${name}ServiceRepository.findAll${nameCapital}s(page, limit ,sortBy));
    }

    public Mono<${nameCapital}Dto> findOne(${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id);
        if(${name} == null) return Mono.error(new NotFoundException());
        return Mono.just(${name});
    }

    public Mono<${nameCapital}Dto>  update(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id){
        ${nameCapital}Dto ${name} =  ${name}ServiceRepository.update${nameCapital}(update${nameCapital}Dto, id);
        if(${name} == null) return Mono.error(new NotFoundException());
        return Mono.just(${name});
    }

    public Mono<Void> remove(${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id);
        if(${name} == null) return Mono.error(new NotFoundException());
        ${name}ServiceRepository.remove${nameCapital}(id);
        return Mono.empty();
    }
}

    `;
  }

  return `package ${packageName}.${name}.services;

import ${packageName}.common.exceptions.NotFoundException;
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
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id);
        if(${name} == null) throw new NotFoundException();
        return ${name};
    }

    public ${nameCapital}Dto update(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id){
        ${nameCapital}Dto ${name} =  ${name}ServiceRepository.update${nameCapital}(update${nameCapital}Dto, id);
        if(${name} == null) throw new NotFoundException();
        return ${name};
    }

    public void remove(${typeData} id){
        this.findOne(id);
        ${name}ServiceRepository.remove${nameCapital}(id);
    }
}

  `;
}

module.exports = {
  service
}