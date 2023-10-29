const {toCapitalCase} = require('../../../../utils/capitalCase');

const roleMapperAuth = (summary , name)=>{
  
  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);


  return `package ${packageName}.role.persistence.mappers;

import ${packageName}.role.persistence.entities.RoleEntity;
import ${packageName}.role.services.dtos.CreateRoleDto;
import ${packageName}.role.services.dtos.UpdateRoleDto;
import ${packageName}.role.services.dtos.RoleDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface RoleMapper {

    ////////////////Entity -> Dto////////////////
    @Mappings({
        @Mapping(target = "role", source = "id")
    })
    RoleDto toRoleDto(RoleEntity roleEntity);


    ////////////////CreateDto -> Entity////////////////
    @Mappings({
        @Mapping(target = "id", source = "role")
    })
    RoleEntity toRoleEntity(CreateRoleDto createRoleDto);

    ////////////////UpdateDto -> Entity////////////////
    @Mappings({
            @Mapping(target = "id", source = "role")
    })
    RoleEntity toRoleEntity(UpdateRoleDto updateRoleDto);

    ////////////Merge Entity with Dto////////////
    @Mappings({
            @Mapping(target = "id", source = "role")
    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    RoleEntity merge(UpdateRoleDto updateRoleDto, @MappingTarget RoleEntity roleEntity);

    /////////////list Entity-> list Dto////////////
    List<RoleDto> toRoleDtoList(List<RoleEntity> roleEntityList);
    
    /////////////listCreateDto-> list Entity////////////
    List<RoleEntity> toRoleEntityList(List<CreateRoleDto> createRoleDto);

    /////////////listUpdateDto-> list Entity////////////
    List<RoleEntity> toRoleEntityListUpdate(List<UpdateRoleDto> updateRoleDtos);

}
  
  `;
};

module.exports = {
  roleMapperAuth
}