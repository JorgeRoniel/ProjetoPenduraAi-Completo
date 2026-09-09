package com.ufc.apiPenduraAi.dtos.divida;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdateDividaDTO(
        @NotNull(message = "O novo valor é obrigatório")
        @DecimalMin(value = "0.01", message = "O valor deve ser de no mínimo 0.01")
        @JsonProperty("novo_valor")
        @JsonAlias({"novoValor", "novo_valor"})
        BigDecimal novoValor
) {
}
