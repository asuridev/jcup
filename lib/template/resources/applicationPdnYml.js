

const applicationPdnYml =()=>{

  return `server:
  port: 4000
spring:
  datasource:
    url: jdbc:postgresql://<ip-address>:<port-number>/<name-database>
    username: <usuario-database>
    password: <password-database>
    driver-class-name: org.postgresql.Driver
  jpa:
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
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