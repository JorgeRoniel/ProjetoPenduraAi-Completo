package com.ufc.apiPenduraAi.dtos.user;

import java.time.LocalDateTime;

public record ReturnUserDTO(
        Long id,
        String nome,
        String email,
        String role,
        LocalDateTime createdAt
) {
}
