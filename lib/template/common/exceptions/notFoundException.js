

const notFoundException = (summary)=>{
  const { packageName } = summary;

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