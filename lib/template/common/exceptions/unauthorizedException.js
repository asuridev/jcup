

const unauthorizedException = (packageName)=>{


  return `package ${packageName}.common.exceptions;

public class UnauthorizedException extends RuntimeException{

    public UnauthorizedException(){

    }
    public UnauthorizedException(String message) {
        super(message);
    }
}
  `;
};

module.exports = {
  unauthorizedException
}