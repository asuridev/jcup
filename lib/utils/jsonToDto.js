const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JavaTargetLanguage 
} = require("quicktype-core");

const fs = require('fs');
const {readSummary} = require('../utils/readSummary');
const {toCapitalCase} = require('../utils/capitalCase');
const { jsonDto } = require('../template/component/services/dtos/jsonDto');
const  ncp = require("copy-paste");

const jsonToDto = async (name) => {
  const nameAsArray = name.split('/');
  const nameResource = nameAsArray[0];
  const nameDto = nameAsArray[1];

  if(!nameDto){
    return console.log(' formato incorrecto \n'.red, 'Formato: jcup g jtd <name-resource>/<name-dto>'.blue);
  }

  const summary = readSummary();
  const { pathMainPackage, typeProject } = summary;
  const pathMainPackageAsArray = pathMainPackage.split('/');
  let startPath = "";
  
  for( let i = 2 ; i < pathMainPackageAsArray.length ; i++){
    startPath = startPath + '/' + pathMainPackageAsArray[i]
  }
  if(!fs.existsSync(`./${startPath}/${nameResource.toLowerCase()}`)){
    return console.log(`No existe un recurso con nombre ${nameResource.toLowerCase()}`.red);
  }
  try {
    const clip = ncp.paste();
    const nameCapital = toCapitalCase(nameDto);
    const { lines: javaObjects } = await quicktypeJSON(`${nameCapital}Dto`, clip);
    let startIndex = 0;
    
    while (startIndex < javaObjects.length) {
      let startObject = javaObjects.indexOf("@lombok.Data", startIndex);
      if (startObject === -1) break;
      let endObject = javaObjects.indexOf("}", startObject);
      let nameFileDto = javaObjects[startObject + 1].split(" ")[2];
      let propertiesDto = [];
      for (let i = startObject + 2; i < endObject; i++) {
        propertiesDto.push(javaObjects[i]);
      }
      let propertiesDtoAsString = propertiesDto.join("\n");
      fs.writeFileSync(`./${startPath}/${nameResource}/services/dtos/${nameFileDto}.java`, jsonDto( summary, nameResource,nameFileDto,propertiesDtoAsString));
      startIndex = endObject;
    }
  } catch (error) {
    console.log(`No fue posible leer la cipboard`.red)
  }
};


async function quicktypeJSON(typeName, jsonString) {
  const javaTargetLanguage = new JavaTargetLanguage();
  const jsonInput = jsonInputForTargetLanguage(javaTargetLanguage);

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    allPropertiesOptional: true,
    lang: javaTargetLanguage,
    inferEnums: false,
    inferDateTimes:true,
    rendererOptions: { "just-types": true, lombok: true, "array-type": "list" },
    outputFilename: "",
  });
}


module.exports = {
  jsonToDto,
};
