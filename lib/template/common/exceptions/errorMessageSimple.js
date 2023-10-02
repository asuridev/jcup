
const errorMessageSimple = (packageName) =>{

  return `package ${packageName}.common.exceptions;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorMessageSimple extends ErrorMessage {
    String message;
    int statusCode;
}
  `;
};

module.exports = {
  errorMessageSimple
}