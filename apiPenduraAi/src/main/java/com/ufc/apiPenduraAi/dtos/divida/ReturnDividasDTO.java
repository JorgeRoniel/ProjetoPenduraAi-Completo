package com.ufc.apiPenduraAi.dtos.divida;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ReturnDividasDTO(
        Long id,
        String cliente,
        BigDecimal valor,
        LocalDateTime createdAt
) {
}
