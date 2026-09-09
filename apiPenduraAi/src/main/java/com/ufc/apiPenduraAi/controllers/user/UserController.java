package com.ufc.apiPenduraAi.controllers.user;

import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnLoginDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnUserDTO;
import com.ufc.apiPenduraAi.services.user.UserServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServices services;

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody @Valid CreateUserDTO data) {
        services.createUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<ReturnLoginDTO> login(@RequestBody @Valid LoginUserDTO data) {
        return ResponseEntity.status(HttpStatus.OK).body(services.authUser(data));
    }

    @GetMapping
    public ResponseEntity<Page<ReturnUserDTO>> listUsers(
            @PageableDefault(size = 10, sort = "nome") Pageable pageable
    ) {
        return ResponseEntity.ok(services.listAllUsers(pageable));
    }
}
