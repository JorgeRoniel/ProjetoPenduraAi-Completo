package com.ufc.apiPenduraAi.dtos.user;

public record ReturnLoginDTO(
        String token,
        Long id,
        String email,
        String nome,
        String role
) {
}
