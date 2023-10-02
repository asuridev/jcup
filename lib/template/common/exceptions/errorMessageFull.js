
const errorMessageFull = (packageName)=>{

  return `package ${packageName}.common.exceptions;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorMessageFull extends ErrorMessage {
    private List<String> message;
    private  String error;
    private int statusCode;
}
  `;

};

module.exports = {
  errorMessageFull
}