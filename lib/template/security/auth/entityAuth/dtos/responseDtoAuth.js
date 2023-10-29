const {toCapitalCase} = require('../../../../../utils/capitalCase');


const responseDtoAuth = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import ${packageName}.role.services.dtos.RoleDto;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Response${nameCapital}Dto {
  private Long id;

  private String username;

  private Boolean locked;

  private Boolean disabled;

  private List<RoleDto> roles;
     
}

  `;
};

module.exports = {
  responseDtoAuth
}