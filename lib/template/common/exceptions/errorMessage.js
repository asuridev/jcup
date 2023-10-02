
const errorMessage = (packageName)=>{

  return `package ${packageName}.common.exceptions;


public abstract class ErrorMessage {
}

  `;
}

module.exports = {
  errorMessage
}