
const forbiddenException = (packageName)=>{


  return `package ${packageName}.common.exceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException(){

    }
    public ForbiddenException(String message) {
        super(message);
    }
}
  `;
};

module.exports = {
  forbiddenException
}