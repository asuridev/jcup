const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors');
const { createBildGradle } = require('../template/build');
const { createApplication } = require('../template/application');
const { createApplicationTest } = require('../template/applicationTest');
const { toCapitalCase } = require('../utils/capitalCase')
const path = require('path');

const baseDependencies = [
  'spring-web',
  'validation',
  'lombok',
  'mapstruct'
];

const newProyect = async ( argv )=>{
  console.clear();
  const proyectName = argv.name;
  const proyectNameCapital = toCapitalCase(proyectName);
  const prompt = inquirer.createPromptModule();

  const groupName = await askForGroupName(prompt);
  // Task validar formato del groupName

  const javaVersion = await askForVersionJava(prompt);
  const dbEngine = await askForDbEngine(prompt);
  if (dbEngine) baseDependencies.push(dbEngine);

  const packageName = `${groupName}.${proyectName}`;
  const packageAsArray = packageName.split('.');
  const pathFiles = path.join(__dirname, '..', '/static');
  
  buildPaths(proyectName);
  
  let pathMainPackage = `./${proyectName}/src/main/java`;

  for(let i = 0; i< packageAsArray.length; i++){
    pathMainPackage = pathMainPackage + '/' + packageAsArray[i]
    fs.mkdirSync(pathMainPackage);
  }

  let pathTestPackage = `./${proyectName}/src/test/java`;

  for(let i = 0; i< packageAsArray.length; i++){
    pathTestPackage = pathTestPackage + '/' + packageAsArray[i]
    fs.mkdirSync(pathTestPackage);
  }
 
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.jar`, `./${proyectName}/gradle/wrapper/gradle-wrapper.jar`);
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.properties`, `./${proyectName}/gradle/wrapper/gradle-wrapper.properties`);
  fs.copyFileSync(`${pathFiles}/.gitignore`, `./${proyectName}/.gitignore`);
  fs.copyFileSync(`${pathFiles}/gradlew`, `./${proyectName}/gradlew`);
  fs.copyFileSync(`${pathFiles}/gradlew.bat`, `./${proyectName}/gradlew.bat`);
  fs.copyFileSync(`${pathFiles}/HELP.md`, `./${proyectName}/HELP.md`);

  const settingsProyect = `rootProject.name = '${proyectName}'`;
  fs.writeFileSync(`./${proyectName}/settings.gradle`, settingsProyect);
  const buildGradle = createBildGradle({ groupName, javaVersion, dependencies:baseDependencies});
  fs.writeFileSync(`./${proyectName}/build.gradle`, buildGradle);
  const createApplicationFile = createApplication({ packageName, proyectName });
  fs.writeFileSync(`${pathMainPackage}/${proyectNameCapital}Application.java`, createApplicationFile);
  const createApplicationTestFile = createApplicationTest({ packageName, proyectName });
  fs.writeFileSync(`${pathTestPackage}/${proyectNameCapital}ApplicationTests.java`, createApplicationTestFile);
  console.log('The project was created successfully.'.green)
  console.log(`Enter the project by running the command:\ncd ${proyectName}`.blue);
}


const askForGroupName = async (prompt) => {
  const  { groupName }  = await prompt({
    type: "input",
    message: "ingrese el nombre del grupo",
    name: "groupName",
  });
  return groupName;
};

const askForVersionJava = async (prompt)=>{
  const { javaVersion } = await prompt({
    type: "rawlist",
    message: "Seleccione la version de Java",
    name: "javaVersion",
    choices:[
      {
        value:11,
        name:'Java-11'
      },
      {
        value:17,
        name:'Java-17'
      },
      {
        value:19,
        name:'Java-19'
      },
    ]
  });
  return javaVersion;
};

const askForDbEngine = async (prompt)=>{
  const { dbEngine } = await prompt({
    type: "rawlist",
    message: "select database engine",
    name: "dbEngine",
    pageSize:10,

    choices:[
      {
        value:"mysql",
        name:'MySql'
      },
      {
        value:"postgres",
        name:'Postgres'
      },
      {
        value:"mariadb",
        name:'MariaDB'
      },
      {
        value:"oracle",
        name:'Oracle'
      },
      {
        value:"sql-server",
        name:'SQL-Server'
      },
      {
        value:"h2",
        name:'H2'
      },
      {
        value:"mongodb",
        name:'MongoDb'
      },
      {
        value:"",
        name:'none'
      },
    ]
  });
  return dbEngine;
};

const buildPaths = (proyectName)=>{
  fs.mkdirSync(`./${proyectName}`);
  fs.mkdirSync(`./${proyectName}/gradle`);
  fs.mkdirSync(`./${proyectName}/gradle/wrapper`);
  fs.mkdirSync(`./${proyectName}/src`);
  fs.mkdirSync(`./${proyectName}/src/main`);
  fs.mkdirSync(`./${proyectName}/src/main/java`);
  fs.mkdirSync(`./${proyectName}/src/main/resources`);
  fs.mkdirSync(`./${proyectName}/src/main/resources/static`);
  fs.mkdirSync(`./${proyectName}/src/main/resources/templates`);
  fs.mkdirSync(`./${proyectName}/src/test`);
  fs.mkdirSync(`./${proyectName}/src/test/java`);
};

module.exports = {
  newProyect
}