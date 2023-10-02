
const applicationYml = () =>{

  return `server:
  servlet:
    context-path: /api/v1
spring:
  profiles:
    active: dev
  `;
};

module.exports = {
  applicationYml
}