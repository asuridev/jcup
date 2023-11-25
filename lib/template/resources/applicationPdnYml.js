const settingsDb = require('../../settings/dbConexion.json');


const applicationPdnYml =(summary)=>{

const { dbEngine, isDockerCompose } = summary;
const { urlPdn, driver, dialect } = settingsDb[dbEngine];

if(isDockerCompose){
  return `server:
  port: \${SERVER_PORT}
jwt:
  SECRET_KEY: \${JWT_SECRET:my_s3cr3t_k3y}
  DURATION: \${JWT_TIMEOUT:10} # jwt duration in minutes
spring:
  datasource:
    url: ${urlPdn}
    username: \${DB_USER}
    password: \${DB_PASSWORD}
    driver-class-name: ${driver}
  jpa:
    show-sql: false
    properties:
      hibernate:
        dialect: ${dialect}
        format_sql: false
  flyway:
    enabled: true
  docker:
    compose:
      lifecycle-management: none
      enabled: false


#documentation
springdoc:
  api:
    docs:
      enabled: false
  swagger-ui:
    enabled: false
    path: /doc/swagger-ui.html
  
  `;
}
  return `server:
  port: \${SERVER_PORT}
jwt:
  SECRET_KEY: \${JWT_SECRET:my_s3cr3t_k3y}
  DURATION: \${JWT_TIMEOUT:10} # jwt duration in minutes
spring:
  datasource:
    url: ${urlPdn}
    username: \${DB_USER}
    password: \${DB_PASSWORD}
    driver-class-name: ${driver}
  jpa:
    show-sql: false
    properties:
      hibernate:
        dialect: ${dialect}
        format_sql: false
  flyway:
    enabled: true


#documentation
springdoc:
  api:
    docs:
      enabled: false
  swagger-ui:
    enabled: false
    path: /doc/swagger-ui.html
  `;
};

module.exports = {
  applicationPdnYml
}