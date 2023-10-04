
const errorMessage = (summary)=>{
  const { packageName } = summary;

  return `package ${packageName}.common.exceptions;


public abstract class ErrorMessage {
}

  `;
}

module.exports = {
  errorMessage
}