const settingsDb = require('../../settings/dbConexion.json');


const applicationDevYml = (summary)=>{

const { dbEngine } = summary;
const { url, driver, dialect } = settingsDb[dbEngine];

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