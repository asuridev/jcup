const {toCapitalCase} = require('../../../../utils/capitalCase');


const templateDto = (summary,nameRosource, nameDto) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(nameDto);

  return `package ${packageName}.${nameRosource}.services.dtos;

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
  templateDto
}