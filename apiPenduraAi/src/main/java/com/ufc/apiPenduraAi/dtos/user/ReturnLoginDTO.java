package com.ufc.apiPenduraAi.dtos.user;

public record ReturnLoginDTO(String token, int id, String email, String nome, String role) {
}
