

const notFoundException = (packageName)=>{

  return `package ${packageName}.common.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(){

    }
    public NotFoundException(String message) {
        super(message);
    }
}
  `;
};

module.exports= {
  notFoundException
}