const {toCapitalCase} = require('../../../../utils/capitalCase');


const jsonDto = (summary,nameRosource, nameDto, properties) => {

  const { packageName } = summary;
  const nameCapital = toCapitalCase(nameDto);
  const dataTime = properties.includes('OffsetDateTime') ? "import java.time.OffsetDateTime;" :"";
  const list = properties.includes('List') ? "import java.util.List;" : "";

  return `package ${packageName}.${nameRosource}.services.dtos;
${dataTime}
${list}

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ${nameCapital} {
  ${properties}
}

  `;
};

module.exports = {
  jsonDto
}

