const { toCapitalCase } = require('../../../../utils/capitalCase');
const { getTypeData } = require('../../../../utils/getTypeData');


const entityAuth = (summary, name)=>{
  let generatedValue = "";
  const { packageName, javaVersion } = summary;
  const {strategyId, isAuditable} = summary[name];
  const nameCapital = toCapitalCase(name);
  const typeData = getTypeData(strategyId);
  const importAudit = isAuditable ? `import ${packageName}.common.audit.AuditableEntity;` : '';
  const extendsAudit = isAuditable ? 'extends AuditableEntity' : '';
  const listner = isAuditable ? '@EntityListeners({AuditingEntityListener.class})' : '';
  const importListener = isAuditable ? 'import org.springframework.data.jpa.domain.support.AuditingEntityListener;' : '';
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta';
  if(strategyId === 'IDENTITY' || strategyId === 'UUID' || strategyId === 'SEQUENCE' ){
    generatedValue = `@GeneratedValue(strategy = GenerationType.${strategyId})`;
  }

  return `package ${packageName}.${name}.persistence.entities;

${importAudit}
import ${packageName}.role.persistence.entities.RoleEntity;
import ${currentPackage}.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
${importListener}

import java.util.List;

${listner}
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="${name}s")
@Entity
public class ${nameCapital}Entity ${extendsAudit} {

    ${generatedValue}
    @Id
    private ${typeData} id;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private Boolean locked;

    private Boolean disabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "${name}s_roles",
            joinColumns = @JoinColumn(name = "${name}s_id",nullable = false,referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id",nullable = false, referencedColumnName = "id")
    )
    private List<RoleEntity> roles;

}

  `;
};

module.exports = {
  entityAuth
}