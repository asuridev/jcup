const {toCapitalCase} = require('../../../../utils/capitalCase');


const createDto = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Create${nameCapital}Dto {
    
     
}

  `;
};

module.exports = {
  createDto
}