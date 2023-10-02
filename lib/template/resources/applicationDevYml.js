

const applicationDevYml = ()=>{



  return `server:
    port: 3000
spring:
    datasource:
        url: jdbc:postgresql://localhost:5432/commerce-db
        username: asuridev
        password: asuridev
        driver-class-name: org.postgresql.Driver
    jpa:
        show-sql: true
        hibernate:
            ddl-auto: update
        properties:
            hibernate:
                dialect: org.hibernate.dialect.PostgreSQLDialect
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