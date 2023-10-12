const {toCapitalCase} = require('../../../../utils/capitalCase');


const dto = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ${nameCapital}Dto {
   


}

  `;
};

module.exports = {
  dto
}