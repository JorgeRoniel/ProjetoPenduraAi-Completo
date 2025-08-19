package com.ufc.apiPenduraAi.domain.user;

public enum UserRoles {

    ADMIN("admin"),
    USER("user");

    private String role;

    UserRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }

}
