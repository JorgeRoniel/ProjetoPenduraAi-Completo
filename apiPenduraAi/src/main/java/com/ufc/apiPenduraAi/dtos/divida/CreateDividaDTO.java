package com.ufc.apiPenduraAi.dtos.divida;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateDividaDTO(
        @NotBlank(message = "Nome do cliente é obrigatório")
        @JsonAlias("nome")
        String cliente,

        @NotNull(message = "Valor é obrigatório")
        @DecimalMin(value = "0.01", message = "O valor deve ser de no mínimo 0.01")
        BigDecimal valor
) {
}
