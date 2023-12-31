const fs = require('fs');
const inquirer = require('inquirer');
require('colors');
const path = require('path');
const { TYPES_PROJECTS } = require('../utils/typesProject')
const { createBildGradle } = require('../template/buildGradle');
const { generateGitIgnore } = require('../template/gitIgnore');
const { dockerCompose } = require('../template/dockerCompose');
const { generateHelpMd } = require('../template/help');
const { createApplication } = require('../template/application');
const { createApplicationTest } = require('../template/applicationTest');
const { dockerFile } = require('../template/dockefile');
const { dockerIgnore } = require('../template/dockerignore');
const { toCapitalCase } = require('../utils/capitalCase');
const { generateCommonPackage } = require('../utils/generateCommonPackage');
const { generateYmlFiles } = require('../utils/generateYmlFiles');


const baseDependencies = [
  'spring-web',
  'spring-security',
  'swagger-webmvc',
  'validation',
  'flyway', 
  'lombok',
  'mapstruct'
];

const newProyect = async ( argv )=>{
  const projectName = (argv.name).toLowerCase();
  if(fs.existsSync(`./${projectName}`)) return console.log('There is already a project with the same name.'.red)
  console.clear();
  let isDockerCompose = false;
  const projectNameCapital = toCapitalCase(projectName);
  const prompt = inquirer.createPromptModule();

  const groupName = await askForGroupName(prompt);
  // Task validar formato del groupName

  const typeProject = await askForTypeProject(prompt);

  const javaVersion = await askForVersionJava(prompt);

  if(javaVersion === 11){
    const index = baseDependencies.indexOf('swagger-webmvc');
    baseDependencies[index] = 'swagger2'
  }

  if(javaVersion >= 17 && typeProject === TYPES_PROJECTS.WEBFLUX ){
    const index = baseDependencies.indexOf('swagger-webmvc');
    baseDependencies[index] = 'swagger-webflux'
  }

  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    const index = baseDependencies.indexOf('spring-web');
    baseDependencies[index] = 'spring-webflux'
  }
  if(typeProject === TYPES_PROJECTS.SERVLET){
    baseDependencies.push('openfeign');
  }

  const dbEngine = await askForDbEngine(prompt);
  if (dbEngine){
    baseDependencies.push(dbEngine);
    if(javaVersion >= 17){
      isDockerCompose = await askDockerCompose(prompt);
      if(isDockerCompose) baseDependencies.push('spring-compose');
    }
  }

  const packageName = `${groupName}.${projectName}`;
  const packageAsArray = packageName.split('.');
  const pathFiles = path.join(__dirname, '..', '/static');
  
  buildPaths(projectName);
  
  let pathMainPackage = `./${projectName}/src/main/java`;

  for(let i = 0; i< packageAsArray.length; i++){
    pathMainPackage = pathMainPackage + '/' + packageAsArray[i]
    fs.mkdirSync(pathMainPackage);
  }

  let pathTestPackage = `./${projectName}/src/test/java`;

  for(let i = 0; i< packageAsArray.length; i++){
    pathTestPackage = pathTestPackage + '/' + packageAsArray[i]
    fs.mkdirSync(pathTestPackage);
  }isDockerCompose

  const summary = {
    groupName,
    typeProject,
    projectName,
    packageName,
    javaVersion,
    pathMainPackage,
    pathTestPackage,
    dbEngine,
    isDockerCompose,
    dependencies:baseDependencies
  }
  
  //copia de archivos estaticos.
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.jar`, `./${projectName}/gradle/wrapper/gradle-wrapper.jar`);
  fs.copyFileSync(`${pathFiles}/gradle/wrapper/gradle-wrapper.properties`, `./${projectName}/gradle/wrapper/gradle-wrapper.properties`);
  fs.copyFileSync(`${pathFiles}/gradlew`, `./${projectName}/gradlew`);
  fs.copyFileSync(`${pathFiles}/gradlew.bat`, `./${projectName}/gradlew.bat`);
  //generacion de archivos del root Proyect
  if(isDockerCompose){
    fs.writeFileSync(`./${projectName}/compose.yaml`,dockerCompose(summary) );
  }
  fs.writeFileSync(`./${projectName}/Dockerfile`,dockerFile(summary,projectName));
  fs.writeFileSync(`./${projectName}/.dockerignore`,dockerIgnore());
  fs.writeFileSync(`./${projectName}/.gitignore`,generateGitIgnore() );
  fs.writeFileSync(`./${projectName}/HELP.md`,generateHelpMd() );
  fs.writeFileSync(`./${projectName}/settings.gradle`, `rootProject.name = '${projectName}'`);
  const buildGradle = createBildGradle({ groupName, javaVersion, dependencies:baseDependencies});
  fs.writeFileSync(`./${projectName}/build.gradle`, buildGradle);
  fs.writeFileSync(`${pathMainPackage}/${projectNameCapital}Application.java`, createApplication(summary));
  fs.writeFileSync(`${pathTestPackage}/${projectNameCapital}ApplicationTests.java`, createApplicationTest({ packageName, projectName }));
  
  
  fs.writeFileSync(`./${projectName}/jcup.json`, JSON.stringify(summary));
  generateCommonPackage(summary);
  generateYmlFiles(summary);
  console.log('The project was created successfully.'.green);
  console.log(`Enter the project by running the command:\ncd ${projectName}`.blue);
}


const askForGroupName = async (prompt) => {
  const  { groupName }  = await prompt({
    type: "input",
    message: "Insert the name of the group",
    name: "groupName",
  });
  return groupName;
};

const askForTypeProject = async (prompt) => {
  const { typeProject } = await prompt({
    type: "rawlist",
    message: "Select the type of project",
    name: "typeProject",
    choices:[
      {
        value: TYPES_PROJECTS.SERVLET,
        name:'REST(servlet)'
      },
      {
        value:TYPES_PROJECTS.WEBFLUX,
        name:'REST(web-flux)'
      }
    ]
  });
  return typeProject;
};


const askForVersionJava = async (prompt)=>{
  const { javaVersion } = await prompt({
    type: "rawlist",
    message: "Select the Java version",
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
    message: "Select the database engine",
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
    message: "Do you want to integrate docker compose to the project?",
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

const buildPaths = (projectName)=>{
  fs.mkdirSync(`./${projectName}`);
  fs.mkdirSync(`./${projectName}/gradle`);
  fs.mkdirSync(`./${projectName}/gradle/wrapper`);
  fs.mkdirSync(`./${projectName}/src`);
  fs.mkdirSync(`./${projectName}/src/main`);
  fs.mkdirSync(`./${projectName}/src/main/java`);
  fs.mkdirSync(`./${projectName}/src/main/resources`);
  fs.mkdirSync(`./${projectName}/src/main/resources/db`);
  fs.mkdirSync(`./${projectName}/src/main/resources/db/migration`);
  fs.writeFileSync(`./${projectName}/src/main/resources/db/migration/V1__initial_schema.sql`,'');
  fs.mkdirSync(`./${projectName}/src/main/resources/static`);
  fs.mkdirSync(`./${projectName}/src/main/resources/templates`);
  fs.mkdirSync(`./${projectName}/src/test`);
  fs.mkdirSync(`./${projectName}/src/test/java`);
};

module.exports = {
  newProyect
}