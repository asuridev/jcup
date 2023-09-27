
const handlerExceptions = (error, dependencie) =>{
  if(error.code === 'NOFOUND'){
    console.log(`La dependencia ${dependencie} no existe en jcup`.red);
    console.log('asegurese de escribir bien el nombre de la dependencia'.red)
  }else if(error.code === 'EXIST'){
    console.log(`La dependencia ${dependencie} ya se encuentra instalda en el proyecto`.blue);
  }else if(error.code === 'ENOENT'){
    console.log('Este proyecyto no fué creado con jcup'.red);
  }else if(error.code === 'NOBUILD'){
    console.log('el archivo build.gradle no fue encontrado en la raiz del proyecto'.red);
  }else if(error.code === 'NODEPEN'){
    console.log(`la dependencia ${dependencie} no hace parte del proyecto`.red);
  }
};

module.exports = {
  handlerExceptions
}