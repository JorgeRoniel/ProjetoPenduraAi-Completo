package com.ufc.apiPenduraAi.infra;

import com.ufc.apiPenduraAi.exceptions.divida.NotFoundDivida;
import com.ufc.apiPenduraAi.exceptions.user.EmailOrPassNull;
import com.ufc.apiPenduraAi.exceptions.user.NotFoundUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private ResponseEntity<String> runTimesHandlers(RuntimeException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

    @ExceptionHandler(NotFoundDivida.class)
    private ResponseEntity<String> dividaNotFoundHandler(NotFoundDivida exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    private ResponseEntity<String> loginErrorHandler(AuthenticationException authenticationException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na Login!");
    }

    @ExceptionHandler(NotFoundUser.class)
    private ResponseEntity<String> userNotFoundHandler(NotFoundUser exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler(EmailOrPassNull.class)
    private ResponseEntity<String> emailOrPassNullHandler(EmailOrPassNull exception){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
    }
}
