const {toCapitalCase} = require('../../../../../utils/capitalCase');


const updateDtoAuth = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import ${packageName}.role.services.dtos.UpdateRoleDto;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Update${nameCapital}Dto {

  private String username;

  private String password;

  private Boolean locked;

  private Boolean disabled;

  private List<UpdateRoleDto> roles;

}

  `;
};

module.exports = {
  updateDtoAuth
}