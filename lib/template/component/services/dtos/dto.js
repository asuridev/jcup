const {toCapitalCase} = require('../../../../utils/capitalCase');


const dto = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;

import lombok.*;


@Getter
@Setter
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