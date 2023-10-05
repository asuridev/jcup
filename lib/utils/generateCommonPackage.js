const fs = require('fs');
const {auditableEntity} = require('../template/common/audit/auditableEntity');
const { badRequestException } = require('../template/common/exceptions/badRequestException');
const { conflictException } = require('../template/common/exceptions/conflictException');
const {  errorMessage } = require('../template/common/exceptions/errorMessage');
const { errorMessageFull  } = require('../template/common/exceptions/errorMessageFull');
const { errorMessageShort  } = require('../template/common/exceptions/errorMessageShort');
const {  errorMessageSimple } = require('../template/common/exceptions/errorMessageSimple');
const {  forbiddenException } = require('../template/common/exceptions/forbiddenException');
const {  handlerExceptions } = require('../template/common/exceptions/handler');
const { notFoundException  } = require('../template/common/exceptions/notFoundException');
const { unauthorizedException  } = require('../template/common/exceptions/unauthorizedException');
const { swaggerConfig  } = require('../template/common/swagger/swaggerConfig');
const {  isIn } = require('../template/common/validators/isIn');
const { isInValidator  } = require('../template/common/validators/isInValidator');

const generateCommonPackage = (summary) =>{

  const pathMainPackage = summary.pathMainPackage;
  

  fs.mkdirSync(`${pathMainPackage}/common`);
  fs.mkdirSync(`${pathMainPackage}/common/audit`);
  fs.mkdirSync(`${pathMainPackage}/common/exceptions`);
  fs.mkdirSync(`${pathMainPackage}/common/swagger`);
  fs.mkdirSync(`${pathMainPackage}/common/validators`);
  ///////
  //archivo de AuditableEntity
  fs.writeFileSync(`${pathMainPackage}/common/audit/AuditableEntity.java`, auditableEntity(summary));
  //archivos del package de exceptions
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/BadRequestException.java`, badRequestException(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ConflictException.java`, conflictException(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ErrorMessage.java`, errorMessage(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ErrorMessageFull.java`, errorMessageFull(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ErrorMessageShort.java`, errorMessageShort(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ErrorMessageSimple.java`, errorMessageSimple(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/ForbiddenException.java`, forbiddenException(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/HandlerExceptions.java`, handlerExceptions(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/NotFoundException.java`, notFoundException(summary));
  fs.writeFileSync(`${pathMainPackage}/common/exceptions/UnauthorizedException.java`, unauthorizedException(summary));
  fs.writeFileSync(`${pathMainPackage}/common/swagger/SwaggerConfig.java`, swaggerConfig(summary));
  // archivos del package de validators
  fs.writeFileSync(`${pathMainPackage}/common/validators/IsIn.java`, isIn(summary));
  fs.writeFileSync(`${pathMainPackage}/common/validators/IsInValidator.java`, isInValidator(summary));
}

module.exports = {
  generateCommonPackage
}