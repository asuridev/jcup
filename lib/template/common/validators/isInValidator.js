

const isInValidator = (summary) =>{
  const { packageName, javaVersion } = summary;
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta' ;
  return `package ${packageName}.common.validators;

import ${currentPackage}.validation.ConstraintValidator;
import ${currentPackage}.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class IsInValidator implements ConstraintValidator<IsIn, String> {

    private String options;

    @Override
    public void initialize(IsIn isIn) {
        this.options = isIn.options();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
      List<String> optionsAsList = Arrays.stream(this.options.split(",")).map(String::trim).collect(Collectors.toList());
      return optionsAsList.contains(value);
    }
}

  `;
};

module.exports = {
  isInValidator
}