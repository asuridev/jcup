
const handlerExceptions = (error, dependencie) =>{
  if(error.code === 'NOFOUND'){
    console.log(`The depence ${dependencie} does not exist in jcup`.red);
    console.log('Make sure to write the name of the dependance propertly.'.red)
  }else if(error.code === 'EXIST'){
    console.log(`The dependance ${dependencie} is already installed in the project`.blue);
  }else if(error.code === 'ENOENT'){
    console.log('This project was not created in jcup'.red);
  }else if(error.code === 'NOBUILD'){
    console.log('The archive build.gradle was not found in the root of the project'.red);
  }else if(error.code === 'NODEPEN'){
    console.log(`The dependance ${dependencie} is not part of the project`.red);
  }
};

module.exports = {
  handlerExceptions
}