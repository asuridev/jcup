
const CONTENT_DOCKER_COMPOSE = {
  'mysql':`services:
  mysql:
    image: 'mysql:latest'
    environment:
      - 'MYSQL_DATABASE=mydatabase'
      - 'MYSQL_PASSWORD=secret'
      - 'MYSQL_ROOT_PASSWORD=verysecret'
      - 'MYSQL_USER=myuser'
    ports:
      - '3306'
    expose:
      - '3306'
  `,
  'postgres':`services:
  postgres:
    image: 'postgres:latest'
    environment:
      - 'POSTGRES_DB=mydatabase'
      - 'POSTGRES_PASSWORD=secret'
      - 'POSTGRES_USER=myuser'
    ports:
      - '5432'
    expose:
      - '5432'
  `,
  'mariadb':`services:
  mariadb:
    image: 'mariadb:latest'
    environment:
      - 'MARIADB_DATABASE=mydatabase'
      - 'MARIADB_PASSWORD=secret'
      - 'MARIADB_ROOT_PASSWORD=verysecret'
      - 'MARIADB_USER=myuser'
    ports:
      - '3306'
    expose:
      - '3306'
  `,
  'oracle':`services:
  oracle:
    image: 'gvenzl/oracle-xe:latest'
    environment:
      - 'ORACLE_PASSWORD=secret'
    ports:
      - '1521'
    expose:
      - '1521'
  `,
  'sql-server':`services:
  sqlserver:
    image: 'mcr.microsoft.com/mssql/server:latest'
    environment:
      - 'ACCEPT_EULA=yes'
      - 'MSSQL_PID=express'
      - 'MSSQL_SA_PASSWORD=verYs3cret'
    ports:
      - '1433'
    expose:
      - '1433'
  `,
  'h2':`services:`,
  'mongodb':`services:
  mongodb:
    image: 'mongo:latest'
    environment:
      - 'MONGO_INITDB_DATABASE=mydatabase'
      - 'MONGO_INITDB_ROOT_PASSWORD=secret'
      - 'MONGO_INITDB_ROOT_USERNAME=root'
    ports:
      - '27017'
    expose:
      - '27017'
  `
};

const dockerCompose = (summary)=>{
  const { dbEngine } = summary;
  return CONTENT_DOCKER_COMPOSE[dbEngine];
};

module.exports = {
  dockerCompose
}