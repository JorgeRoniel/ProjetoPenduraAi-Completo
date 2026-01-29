package com.ufc.apiPenduraAi.exceptions.user;

public class NotFoundUser extends RuntimeException {
    public NotFoundUser(String message) {
        super(message);
    }
}
