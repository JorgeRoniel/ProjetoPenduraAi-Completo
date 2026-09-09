package com.ufc.apiPenduraAi.exceptions.token;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
