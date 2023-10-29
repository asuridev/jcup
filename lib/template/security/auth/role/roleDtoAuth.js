const {toCapitalCase} = require('../../../../utils/capitalCase');

const roleDtoAuth = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);


  return `package ${packageName}.role.services.dtos;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ${name} {

    private String role;
}

  
  `;
};

module.exports = {
  roleDtoAuth
}