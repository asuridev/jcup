const {toCapitalCase} = require('../../../../../utils/capitalCase');


const createDtoAuth = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import ${packageName}.role.services.dtos.CreateRoleDto;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Create${nameCapital}Dto {

  private String username;

  private String password;

  @Builder.Default
  private Boolean locked = false;

  @Builder.Default
  private Boolean disabled = false;

 
  private List<CreateRoleDto> roles;
     
}

  `;
};

module.exports = {
  createDtoAuth
}