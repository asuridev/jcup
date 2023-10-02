const { toCapitalCase } = require('../../../../utils/capitalCase')


const entity = (summary, name)=>{

  const { packageName } = summary;
  const {strategyId, isAuditable} = summary[name];

  const nameCapital = toCapitalCase(name);
  const typeData = strategyId === 'UUID' ? 'String' : 'Long';

  const importAudit = isAuditable ? `import ${packageName}.common.audit.AuditableEntity;` : '';
  const extendsAudit = isAuditable ? 'extends AuditableEntity' : '';
  const listner = isAuditable ? '@EntityListeners({AuditingEntityListener.class})' : '';
  const importListener = isAuditable ? 'import org.springframework.data.jpa.domain.support.AuditingEntityListener;' : '';

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

    @Id
    @GeneratedValue(strategy = GenerationType.${strategyId})
    ${typeData} id;

}

  `;
};

module.exports = {
  entity
}