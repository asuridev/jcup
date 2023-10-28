const { toCapitalCase } = require('../../../../utils/capitalCase');


const mappersAuth = (summary, name) =>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);


  return `package ${packageName}.${name}.persistence.mappers;
import ${packageName}.role.persistence.mappers.RoleMapper;
import ${packageName}.${name}.persistence.entities.${nameCapital}Entity;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,uses = { RoleMapper.class })
public interface ${nameCapital}Mapper {

    ////////////////Entity -> Dto////////////////
    @Mappings({

    })
    ${nameCapital}Dto to${nameCapital}Dto(${nameCapital}Entity ${name}Entity);


    ////////////////CreateDto -> Entity////////////////
    @Mappings({
           
    })
    ${nameCapital}Entity to${nameCapital}Entity(Create${nameCapital}Dto create${nameCapital}Dto);

    ////////////////UpdateDto -> Entity////////////////
    @Mappings({
          
    })
    ${nameCapital}Entity to${nameCapital}Entity(Update${nameCapital}Dto update${nameCapital}Dto);

    ////////////Merge Entity with Dto////////////
    @Mappings({
            
    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ${nameCapital}Entity merge(Update${nameCapital}Dto update${nameCapital}Dto, @MappingTarget ${nameCapital}Entity ${name}Entity);

    /////////////list Entity-> list Dto////////////
    List<${nameCapital}Dto> to${nameCapital}DtoList(List<${nameCapital}Entity> ${name}EntityList);
    
    /////////////listCreateDto -> list Entity////////////
    List<${nameCapital}Entity> to${nameCapital}EntityList(List<Create${nameCapital}Dto> create${nameCapital}Dtos);

    /////////////listUpdateDto -> list Entity////////////
    List<${nameCapital}Entity> to${nameCapital}EntityListUpdate(List<Update${nameCapital}Dto> update${nameCapital}Dtos);

}

  `;
};

module.exports = {
  mappersAuth
}