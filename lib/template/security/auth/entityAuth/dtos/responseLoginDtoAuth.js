const {toCapitalCase} = require('../../../../../utils/capitalCase');


const responseLoginDtoAuth = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import ${packageName}.role.services.dtos.CreateRoleDto;
import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseLoginDto {

  String token;
     
}

  `;
};

module.exports = {
  responseLoginDtoAuth
}