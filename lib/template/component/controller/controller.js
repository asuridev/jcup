const {toCapitalCase} = require('../../../utils/capitalCase');
const { getTypeData } = require('../../../utils/getTypeData');


const controller = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = getTypeData(strategyId);

  return `package ${packageName}.${name}.controller;

import ${packageName}.${name}.services.${nameCapital}Service;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("${name}")
public class ${nameCapital}Controller {

    private final ${nameCapital}Service ${name}Service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ${nameCapital}Dto create(@Valid @RequestBody Create${nameCapital}Dto create${nameCapital}Dto){
       return  this.${name}Service.create(create${nameCapital}Dto);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Page<${nameCapital}Dto> findAll(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "100") int limit,
            @RequestParam(required = false,defaultValue = "id") String sortBy
    ){
        return this.${name}Service.findAll(page, limit, sortBy);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public ${nameCapital}Dto findOne(@PathVariable("id") ${typeData} id){
        return this.${name}Service.findOne(id);
    }

    @PatchMapping("/{id}")
    public ${nameCapital}Dto update(@Valid @RequestBody Update${nameCapital}Dto update${nameCapital}Dto, @PathVariable("id") ${typeData} id){
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
  controller
}