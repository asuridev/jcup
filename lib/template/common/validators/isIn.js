

const  isIn = (packageName)=>{


  return `package ${packageName}.common.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

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