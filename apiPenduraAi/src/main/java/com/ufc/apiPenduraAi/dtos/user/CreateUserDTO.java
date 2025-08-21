package com.ufc.apiPenduraAi.dtos.user;

import com.ufc.apiPenduraAi.domain.user.UserRoles;

public record CreateUserDTO(String nome, String email, String senha, UserRoles role) {
}
