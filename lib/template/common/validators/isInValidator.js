

const isInValidator = (packageName) =>{

  return `package ${packageName}.common.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;

public class IsInValidator implements ConstraintValidator<IsIn, String> {

    private String options;

    @Override
    public void initialize(IsIn isIn) {
        this.options = isIn.options();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        List<String> optionsAsList = Arrays.stream(this.options.split(",")).map(String::trim).toList();
        return optionsAsList.contains(value);
    }
}

  `;
};

module.exports = {
  isInValidator
}