

const badRequestException = (packageName)=>{


  return `package ${packageName}.common.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(){

    }
    public BadRequestException(String message) {
        super(message);
    }
}
  `;
};

module.exports = {
  badRequestException
}