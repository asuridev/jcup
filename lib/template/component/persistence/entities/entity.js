const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');


const entity = (summary, name)=>{
  let generatedValue = "";
  const { packageName } = summary;
  const {strategyId, isAuditable} = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);
  const importAudit = isAuditable ? `import ${packageName}.common.audit.AuditableEntity;` : '';
  const extendsAudit = isAuditable ? 'extends AuditableEntity' : '';
  const listner = isAuditable ? '@EntityListeners({AuditingEntityListener.class})' : '';
  const importListener = isAuditable ? 'import org.springframework.data.jpa.domain.support.AuditingEntityListener;' : '';

  if(strategyId === 'IDENTITY' || strategyId === 'UUID' || strategyId === 'SEQUENCE' ){
    generatedValue = `@GeneratedValue(strategy = GenerationType.${strategyId})`;
  }



  return `package ${packageName}.${name}.persistence.entities;

${importAudit}
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
${importListener}

${listner}
@Getter
@Setter
@NoArgsConstructor
@Table(name="${name}s")
@Entity
public class ${nameCapital}Entity ${extendsAudit} {

    ${generatedValue}
    @Id
    ${typeData} id;

}

  `;
};

module.exports = {
  entity
}