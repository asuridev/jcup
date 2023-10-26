const {toCapitalCase} = require('../../../../utils/capitalCase');


const responseDto = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Response${nameCapital}Dto {
    
     
}

  `;
};

module.exports = {
  responseDto
}