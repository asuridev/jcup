const settingsDb = require('../../settings/dbConexion.json');


const applicationDevYml = (summary)=>{

const { dbEngine, isDockerCompose } = summary;
const { url, driver, dialect } = settingsDb[dbEngine];
if(isDockerCompose){
  return `server:
  port: 3000
spring:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
  docker:
    compose:
      lifecycle-management: start_and_stop
      enabled: true

#documentation
springdoc:
  api:
    docs:
      enabled: true
  swagger-ui:
    enabled: true
    path: /doc/swagger-ui.html
  `;
}
  return `server:
  port: 3000
spring:
  datasource:
    url: ${url}
    username: <usuario-database>
    password: <password-database>
    driver-class-name: ${driver}
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: ${dialect}
        format_sql: true

#documentation
springdoc:
  api:
    docs:
      enabled: true
  swagger-ui:
    enabled: true
    path: /doc/swagger-ui.html
  `;
};

module.exports = {
  applicationDevYml
}