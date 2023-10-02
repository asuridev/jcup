
const auditableEntity = (packageName)=>{



  return `package ${packageName}.common.audit;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
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