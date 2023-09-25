const fs = require('fs');
const inquirer = require('inquirer');
const { createBildGradle } = require('../template/build');
const path = require('path');

const newProyect = async ( argv )=>{
  console.clear();
  const proyectname = argv.name;
  const prompt = inquirer.createPromptModule();
  
  const  { groupName }  = await prompt({
    type: "input",
    message: "ingrese el nombre del grupo",
    name: "groupName",
  });
  
  const { javaVersion } = await prompt({
    type: "list",
    message: "Seleccione la version de Java",
    name: "javaVersion",
    choices:[
      {
        value:11,
        name:'1. Java-11'
      },
      {
        value:17,
        name:'2. Java-17'
      },
      {
        value:19,
        name:'3. Java-19'
      },
    ]
  });

  const pathfiles = path.join(__dirname, '..', '/static');
  console.log(pathfiles);
  fs.mkdirSync(`./${proyectname}`);
  fs.mkdirSync(`./${proyectname}/gradle`);
  fs.mkdirSync(`./${proyectname}/gradle/wrapper`);
  fs.copyFileSync(`${pathfiles}/gradle/wrapper/gradle-wrapper.jar`, `./${proyectname}/gradle/wrapper/gradle-wrapper.jar`);
  fs.copyFileSync(`${pathfiles}/gradle/wrapper/gradle-wrapper.properties`, `./${proyectname}/gradle/wrapper/gradle-wrapper.properties`);
  fs.copyFileSync(`${pathfiles}/.gitignore`, `./${proyectname}/.gitignore`);
  fs.copyFileSync(`${pathfiles}/gradlew`, `./${proyectname}/gradlew`);
  fs.copyFileSync(`${pathfiles}/gradlew.bat`, `./${proyectname}/gradlew.bat`);
  fs.copyFileSync(`${pathfiles}/HELP.md`, `./${proyectname}/HELP.md`);

  const settingsProyect = `rootProject.name = '${proyectname}'`;
  fs.writeFileSync(`./${proyectname}/settings.gradle`, settingsProyect);
  const buildGradle = createBildGradle({ groupName, javaVersion, dependencies:[]});
  fs.writeFileSync(`./${proyectname}/build.gradle`, buildGradle);
  //fs.mkdirSync(`./${proyectname}/src`);
}



module.exports = {
  newProyect
}