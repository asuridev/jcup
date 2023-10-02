const {toCapitalCase} = require('../../../../utils/capitalCase');


const updateDto = (summary, name) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services.dtos;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Update${nameCapital}Dto {
    

}

  `;
};

module.exports = {
  updateDto
}