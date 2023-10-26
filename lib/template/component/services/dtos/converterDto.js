const {toCapitalCase} = require('../../../../utils/capitalCase');

const converterDto = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;


import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface Converter${nameCapital}Dto {

    @Mappings({

    })
    Response${nameCapital}Dto toResponse${nameCapital}Dto(${nameCapital}Dto ${name}Dto);

    List<Response${nameCapital}Dto> toResponse${nameCapital}DtoList(List<${nameCapital}Dto> ${name}DtoList);
}
  `;
};

module.exports = {
  converterDto
}
