

const  isIn = (summary)=>{

  const { packageName, javaVersion } = summary;
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta' ;
  return `package ${packageName}.common.validators;

import ${currentPackage}.validation.Constraint;
import ${currentPackage}.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Constraint(validatedBy = IsInValidator.class)
@Target({ ElementType.PARAMETER, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface IsIn {
    String options();

    String message() default "must be an allowed value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @Target({ ElementType.PARAMETER, ElementType.FIELD})
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        IsIn[] value();
    }
}

  `;
};

module.exports = {
  isIn
}