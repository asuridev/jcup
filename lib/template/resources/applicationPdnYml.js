const settingsDb = require('../../settings/dbConexion.json');


const applicationPdnYml =(summary)=>{

const { dbEngine, isDockerCompose } = summary;
const { url, driver, dialect } = settingsDb[dbEngine];

if(isDockerCompose){
  return `server:
  port: 4000
spring:
  datasource:
    url: jdbc:postgresql://<server-name>:<port>/<database-name>
    username: <usuario-database>
    password: <password-database>
    driver-class-name: org.postgresql.Driver
  jpa:
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
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
  port: 4000
spring:
  datasource:
    url: ${url}
    username: <usuario-database>
    password: <password-database>
    driver-class-name: ${driver}
  jpa:
    show-sql: true
    properties:
      hibernate:
        dialect: ${dialect}
        format_sql: true



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