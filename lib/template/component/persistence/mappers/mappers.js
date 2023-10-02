const { toCapitalCase } = require('../../../../utils/capitalCase');


const mappers = (summary, name) =>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);


  return `package ${packageName}.${name}.persistence.mappers;

import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ${nameCapital}Mapper {

    ////////////////Entity -> Dto////////////////
    @Mappings({

    })
    ${nameCapital}Dto to${nameCapital}Dto(${nameCapital}Entity ${name}Entity);


    ////////////////Dto -> Entity////////////////
    @Mappings({
           
    })
    ${nameCapital}Entity to${nameCapital}Entity(Create${nameCapital}Dto create${nameCapital}Dto);


    ////////////Merge Entity with Dto////////////
    @Mappings({
            
    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ${nameCapital}Entity merge(Update${nameCapital}Dto update${nameCapital}Dto, @MappingTarget ${nameCapital}Entity ${name}Entity);

    /////////////list Entity-> list Dto////////////
    List<${nameCapital}Dto> to${nameCapital}DtoList(List<${nameCapital}Entity> ${name}EntityList);

}

  `;
};

module.exports = {
  mappers
}