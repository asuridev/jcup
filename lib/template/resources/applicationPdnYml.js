const settingsDb = require('../../settings/dbConexion.json');


const applicationPdnYml =(summary)=>{

  const { dbEngine } = summary;
  const { url, driver, dialect } = settingsDb[dbEngine];

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