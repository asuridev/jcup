const fs = require('fs');
const inquirer = require('inquirer');
require('colors');
const path = require('path');
const { createBildGradle } = require('../template/buildGradle');
const { generateGitIgnore } = require('../template/gitIgnore');
const { dockerCompose } = require('../template/dockerCompose');
const { generateHelpMd } = require('../template/help');
const { createApplication } = require('../template/application');
const { createApplicationTest } = require('../template/applicationTest');
const { toCapitalCase } = require('../utils/capitalCase');
const { generateCommonPackage } = require('../utils/generateCommonPackage');
const { generateYmlFiles } = require('../utils/generateYmlFiles');


const baseDependencies = [
  'spring-web',
  'swagger',
  'validation',
  'lombok',
  'mapstruct'
];

const newProyect = async ( argv )=>{
  console.clear();
  let isDockerCompose = false;
  const proyectName = (argv.name).toLowerCase();
  const proyectNameCapital = toCapitalCase(proyectName);
  const prompt = inquirer.createPromptModule();

  const groupName = await askForGroupName(prompt);
  // Task validar formato del groupName

  const javaVersion = await askForVersionJava(prompt);

  if(javaVersion === 11){
    const index = baseDependencies.indexOf('swagger');
    baseDependencies[index] = 'swagger2'
  }
  
  const dbEngine = await askForDbEngine(prompt);
  if (dbEngine){
    baseDependencies.push(dbEngine);
    if(javaVersion >= 17){
      isDockerCompose = await askDockerCompose(prompt);
      if(isDockerCompose) baseDependencies.push('spring-compose');
    }
  }

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
  }isDockerCompose

  const summary = {
    groupName,
    proyectName,
    packageName,
    javaVersion,
    pathMainPackage,
    pathTestPackage,
    dbEngine,
    isDockerCompose,
    dependencies:baseDependencies
  }
  
  //copia de archivos estaticos.
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.jar`, `./${proyectName}/gradle/wrapper/gradle-wrapper.jar`);
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.properties`, `./${proyectName}/gradle/wrapper/gradle-wrapper.properties`);
  fs.copyFileSync(`${pathFiles}/gradlew`, `./${proyectName}/gradlew`);
  fs.copyFileSync(`${pathFiles}/gradlew.bat`, `./${proyectName}/gradlew.bat`);
  //generacion de archivos del root Proyect
  if(isDockerCompose){
    fs.writeFileSync(`./${proyectName}/compose.yaml`,dockerCompose(summary) );
  }
  fs.writeFileSync(`./${proyectName}/.gitignore`,generateGitIgnore() );
  fs.writeFileSync(`./${proyectName}/HELP.md`,generateHelpMd() );
  fs.writeFileSync(`./${proyectName}/settings.gradle`, `rootProject.name = '${proyectName}'`);
  const buildGradle = createBildGradle({ groupName, javaVersion, dependencies:baseDependencies});
  fs.writeFileSync(`./${proyectName}/build.gradle`, buildGradle);
  fs.writeFileSync(`${pathMainPackage}/${proyectNameCapital}Application.java`, createApplication({ packageName, proyectName }));
  fs.writeFileSync(`${pathTestPackage}/${proyectNameCapital}ApplicationTests.java`, createApplicationTest({ packageName, proyectName }));
  
  
  fs.writeFileSync(`./${proyectName}/jcup.json`, JSON.stringify(summary));
  generateCommonPackage(summary);
  generateYmlFiles(summary);
  console.log('The project was created successfully.'.green);
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

const askDockerCompose = async (prompt)=>{
  const { isDockerCompose } = await prompt({
    type: "rawlist",
    message: "Desea integrar  docker compose en el proyecto?",
    name: "isDockerCompose",
    choices:[
      {
        value:true,
        name:'Yes'
      },
      {
        value:false,
        name:'No'
      },
    ]
  });
  return isDockerCompose;
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