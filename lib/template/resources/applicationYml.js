const {TYPES_PROJECTS} = require('../../utils/typesProject');


const applicationYml = (summary) =>{
  const { typeProject } = summary;

  //caso webflux
  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    return `spring:
  webflux:
    base-path: /api/v1
  profiles:
    active: \${PROFILE:dev}
    `;
  }

  //caso servlet
  return `server:
  servlet:
    context-path: /api/v1
spring:
  profiles:
    active: \${PROFILE:dev}
  `;
};

module.exports = {
  applicationYml
}