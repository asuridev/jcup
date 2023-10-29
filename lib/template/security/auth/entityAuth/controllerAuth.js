const {toCapitalCase} = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');
const {TYPES_PROJECTS} = require('../../../../utils/typesProject');

const controllerAuth = (summary, name)=>{

  const { packageName, javaVersion,typeProject } = summary;

  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = getTypeData(strategyId);
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta' ;

  // en caso de webflux
  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    return `package ${packageName}.${name}.controller;

import ${packageName}.${name}.services.${nameCapital}Service;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import ${currentPackage}.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("${name}")
public class ${nameCapital}Controller {

    private final ${nameCapital}Service ${name}Service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<${nameCapital}Dto> create(@Valid @RequestBody Create${nameCapital}Dto create${nameCapital}Dto){
       return  this.${name}Service.create(create${nameCapital}Dto);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Mono<Page<${nameCapital}Dto>> findAll(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "100") int limit,
            @RequestParam(required = false,defaultValue = "id") String sortBy
    ){
        return this.${name}Service.findAll(page, limit, sortBy);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Mono<${nameCapital}Dto> findOne(@PathVariable("id") ${typeData} id){
        return this.${name}Service.findOne(id);
    }
    
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{id}")
    public Mono<${nameCapital}Dto> update(@Valid @RequestBody Update${nameCapital}Dto update${nameCapital}Dto, @PathVariable("id") ${typeData} id){
        return this.${name}Service.update(update${nameCapital}Dto, id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public Mono<Void> remove(@PathVariable("id") ${typeData} id){
        return this.${name}Service.remove(id);
    }

}

    `;
  }
  // en caso servlet
  return `package ${packageName}.${name}.controller;

import ${packageName}.${name}.services.${nameCapital}Service;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.ResponseLoginDto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Response${nameCapital}Dto;
import ${currentPackage}.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("${name}")
public class ${nameCapital}Controller {

    private final ${nameCapital}Service ${name}Service;

    @PostMapping("/auth/login")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseLoginDto login(@RequestHeader(HttpHeaders.AUTHORIZATION) String header){
        return this.${name}Service.login(header);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Response${nameCapital}Dto create(@Valid @RequestBody Create${nameCapital}Dto create${nameCapital}Dto){
       return  this.${name}Service.create(create${nameCapital}Dto);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Page<Response${nameCapital}Dto> findAll(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "100") int limit,
            @RequestParam(required = false,defaultValue = "id") String sortBy
    ){
        return this.${name}Service.findAll(page, limit, sortBy);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Response${nameCapital}Dto findOne(@PathVariable("id") ${typeData} id){
        return this.${name}Service.findOne(id);
    }
    
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{id}")
    public Response${nameCapital}Dto update(@Valid @RequestBody Update${nameCapital}Dto update${nameCapital}Dto, @PathVariable("id") ${typeData} id){
        return this.${name}Service.update(update${nameCapital}Dto, id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void remove(@PathVariable("id") ${typeData} id){
        this.${name}Service.remove(id);
    }

}

  `;
}

module.exports = {
  controllerAuth
}