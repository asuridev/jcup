const {TYPES_PROJECTS} = require('../../../utils/typesProject');

const handlerExceptions = (summary)=>{
  const { packageName, javaVersion, typeProject } = summary;

  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta' ;

  //caso web-Flux
  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    return `package ${packageName}.common.exceptions;

import ${currentPackage}.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ControllerAdvice
public class HandlerExceptions {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ErrorMessage onMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        log.error(ex.toString());
        List<String> messagesErrors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            messagesErrors.add(error.getField() + " " + error.getDefaultMessage());
        });
        return  new ErrorMessageFull(messagesErrors,"BadRequest",HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public ErrorMessage onConstraintValidationException(ConstraintViolationException ex){
        log.error(ex.toString());
        List<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach( error -> {
            errors.add(error.getMessage());
        });
        return  new ErrorMessageFull(errors,"Bad Request",HttpStatus.BAD_REQUEST.value());
    }

    //Spring Exceptions
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            DuplicateKeyException.class,
            //HttpRequestMethodNotSupportedException.class,
            //MissingRequestHeaderException.class,
            //MissingServletRequestParameterException.class,
            MethodArgumentTypeMismatchException.class,
            HttpMessageNotReadableException.class,
            DataIntegrityViolationException.class
    })
    @ResponseBody
    public ErrorMessage onSpringBadRequest(Exception ex){
        log.error(ex.toString());
        return new ErrorMessageShort(ex.getClass().getSimpleName(), "Bad Request",HttpStatus.BAD_REQUEST.value());
    }

    // custom Exceptions
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    public ErrorMessage onNotFoundException(NotFoundException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return  new ErrorMessageSimple("Not Found", HttpStatus.NOT_FOUND.value());
        return new ErrorMessageShort(ex.getMessage(), "Not Found", HttpStatus.NOT_FOUND.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ErrorMessage onBadRequestException(BadRequestException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Not Found", HttpStatus.BAD_REQUEST.value());
        return new ErrorMessageShort(ex.getMessage(), "Bad Request", HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseBody
    public ErrorMessage onUnauthorizedException(UnauthorizedException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Unauthorized", HttpStatus.UNAUTHORIZED.value());
        return new ErrorMessageShort(ex.getMessage(), "Unauthorized", HttpStatus.UNAUTHORIZED.value());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ForbiddenException.class)
    @ResponseBody
    public ErrorMessage onForbiddenException( ForbiddenException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Forbidden", HttpStatus.FORBIDDEN.value());
        return new ErrorMessageShort(ex.getMessage(), "Forbidden", HttpStatus.FORBIDDEN.value());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ConflictException.class)
    @ResponseBody
    public ErrorMessage onConflictException(ConflictException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Conflict", HttpStatus.CONFLICT.value());
        return new ErrorMessageShort(ex.getMessage(), "Conflict", HttpStatus.CONFLICT.value());
    }

    //Internal Server Error
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ErrorMessage onServerError(Exception ex){
        log.error(ex.toString());
        return new ErrorMessageShort(ex.getClass().getSimpleName(), "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
    `;
  }

  //caso servlet
  return `package ${packageName}.common.exceptions;

import ${currentPackage}.servlet.http.HttpServletRequest;
import ${currentPackage}.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ControllerAdvice
public class HandlerExceptions {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ErrorMessage onMethodArgumentNotValidException(HttpServletRequest request, MethodArgumentNotValidException ex){
        log.error(ex.toString());
        List<String> messagesErrors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            messagesErrors.add(error.getField() + " " + error.getDefaultMessage());
        });
        return  new ErrorMessageFull(messagesErrors,"BadRequest",HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public ErrorMessage onConstraintValidationException(HttpServletRequest request,ConstraintViolationException ex){
        log.error(ex.toString());
        List<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach( error -> {
            errors.add(error.getMessage());
        });
        return  new ErrorMessageFull(errors,"Bad Request",HttpStatus.BAD_REQUEST.value());
    }

    //Spring Exceptions
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            DuplicateKeyException.class,
            HttpRequestMethodNotSupportedException.class,
            MissingRequestHeaderException.class,
            MissingServletRequestParameterException.class,
            MethodArgumentTypeMismatchException.class,
            HttpMessageNotReadableException.class,
            DataIntegrityViolationException.class
    })
    @ResponseBody
    public ErrorMessage onSpringBadRequest(HttpServletRequest request, Exception ex){
        log.error(ex.toString());
        return new ErrorMessageShort(ex.getClass().getSimpleName(), "Bad Request",HttpStatus.BAD_REQUEST.value());
    }

    // custom Exceptions
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    public ErrorMessage onNotFoundException(HttpServletRequest request,NotFoundException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return  new ErrorMessageSimple("Not Found", HttpStatus.NOT_FOUND.value());
        return new ErrorMessageShort(ex.getMessage(), "Not Found", HttpStatus.NOT_FOUND.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ErrorMessage onBadRequestException(HttpServletRequest request, BadRequestException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Not Found", HttpStatus.BAD_REQUEST.value());
        return new ErrorMessageShort(ex.getMessage(), "Bad Request", HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseBody
    public ErrorMessage onUnauthorizedException(HttpServletRequest request, UnauthorizedException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Unauthorized", HttpStatus.UNAUTHORIZED.value());
        return new ErrorMessageShort(ex.getMessage(), "Unauthorized", HttpStatus.UNAUTHORIZED.value());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ForbiddenException.class)
    @ResponseBody
    public ErrorMessage onForbiddenException(HttpServletRequest request, ForbiddenException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Forbidden", HttpStatus.FORBIDDEN.value());
        return new ErrorMessageShort(ex.getMessage(), "Forbidden", HttpStatus.FORBIDDEN.value());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ConflictException.class)
    @ResponseBody
    public ErrorMessage onConflictException(HttpServletRequest request, ConflictException ex) {
        log.error(ex.toString());
        if (ex.getMessage() == null) return new ErrorMessageSimple("Conflict", HttpStatus.CONFLICT.value());
        return new ErrorMessageShort(ex.getMessage(), "Conflict", HttpStatus.CONFLICT.value());
    }

    //Internal Server Error
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ErrorMessage onServerError(HttpServletRequest request, Exception ex){
        log.error(ex.toString());
        return new ErrorMessageShort(ex.getClass().getSimpleName(), "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}

  `;
};

module.exports = {
  handlerExceptions
}