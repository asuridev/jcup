
const CONTENT_DOCKER_COMPOSE = {
  'mysql':`services:
  mysql:
    image: 'mysql:8.0'
    environment:
      - 'MYSQL_DATABASE=database'
      - 'MYSQL_PASSWORD=secret'
      - 'MYSQL_ROOT_PASSWORD=root'
      - 'MYSQL_USER=user'
    ports:
      - '3306:3306'
  `,
  'postgres':`services:
  postgres:
    image: 'postgres:alpine3.18'
    environment:
      - 'POSTGRES_DB=database'
      - 'POSTGRES_PASSWORD=secret'
      - 'POSTGRES_USER=user'
    ports:
      - '5432:5432'
  `,
  'mariadb':`services:
  mariadb:
    image: 'mariadb:jammy'
    environment:
      - 'MARIADB_DATABASE=database'
      - 'MARIADB_PASSWORD=secret'
      - 'MARIADB_ROOT_PASSWORD=root'
      - 'MARIADB_USER=user'
    ports:
      - '3306:3306'
  `,
  'oracle':`services:
  oracle:
    image: 'gvenzl/oracle-xe:latest'
    environment:
      - 'ORACLE_PASSWORD=secret'
    ports:
      - '1521:1521'
  `,
  'sql-server':`services:
  sqlserver:
    image: 'mcr.microsoft.com/mssql/server:latest'
    environment:
      - 'ACCEPT_EULA=yes'
      - 'MSSQL_PID=express'
      - 'MSSQL_SA_PASSWORD=secret'
    ports:
      - '1433:1433'
  `,
  'h2':`services:`,
  'mongodb':`services:
  mongodb:
    image: 'mongo:latest'
    environment:
      - 'MONGO_INITDB_DATABASE=database'
      - 'MONGO_INITDB_ROOT_PASSWORD=secret'
      - 'MONGO_INITDB_ROOT_USERNAME=root'
    ports:
      - '27017:27017'
  `
};

const dockerCompose = (summary)=>{
  const { dbEngine } = summary;
  return CONTENT_DOCKER_COMPOSE[dbEngine];
};

module.exports = {
  dockerCompose
}