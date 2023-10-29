const {toCapitalCase} = require('../../../../../utils/capitalCase');

const converterDtoAuth = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import ${packageName}.role.services.dtos.ConverterRoleDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,uses = { ConverterRoleDto.class })
public interface Converter${nameCapital}Dto {

    @Mappings({

    })
    Response${nameCapital}Dto toResponse${nameCapital}Dto(${nameCapital}Dto ${name}Dto);

    List<Response${nameCapital}Dto> toResponse${nameCapital}DtoList(List<${nameCapital}Dto> ${name}DtoList);
}
  `;
};

module.exports = {
  converterDtoAuth
}
