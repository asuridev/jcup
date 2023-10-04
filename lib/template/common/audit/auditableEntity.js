
const auditableEntity = (summary)=>{

  const { packageName, javaVersion } = summary;
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta' ;
  return `package ${packageName}.common.audit;

import ${currentPackage}.persistence.Column;
import ${currentPackage}.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@MappedSuperclass
public class AuditableEntity {

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime modifiedDate;
}
  `;
};


module.exports= {
  auditableEntity
}