const settingsDb = require('../../settings/dbConexion.json');


const applicationDevYml = (summary)=>{

const { dbEngine, isDockerCompose } = summary;
const { url, driver, dialect } = settingsDb[dbEngine];
if(isDockerCompose){
  //con docker compose
  return `server:
  port: 3000
jwt:
  SECRET_KEY: my_s3cr3t_k3y
  DURATION: 10 # jwt duration in minutes
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
jwt:
  SECRET_KEY: my_s3cr3t_k3y
  DURATION: 10 # jwt duration in minutes
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