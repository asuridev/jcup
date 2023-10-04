
const conflictException = (summary) =>{
  const { packageName } = summary;

  return `package ${packageName}.common.exceptions;

public class ConflictException extends RuntimeException {
    public ConflictException(){

    }
    public ConflictException(String message) {
        super(message);
    }
}
  `;
};

module.exports = {
  conflictException
}