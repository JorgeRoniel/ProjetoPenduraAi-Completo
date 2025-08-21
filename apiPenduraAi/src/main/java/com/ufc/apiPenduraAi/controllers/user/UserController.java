package com.ufc.apiPenduraAi.controllers.user;

import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnLoginDTO;
import com.ufc.apiPenduraAi.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserServices services;

    @PostMapping
    public ResponseEntity createUser(@RequestBody CreateUserDTO data){
        User user = services.createUser(data);
        if(user != null){
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado!");
        }
        return ResponseEntity.internalServerError().body("Erro ao criar user");
    }

    @PostMapping("/login")
    public ResponseEntity<ReturnLoginDTO> login(@RequestBody LoginUserDTO data){
        User user = services.authUser(data);

        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        ReturnLoginDTO response = new ReturnLoginDTO(user.getId(), user.getNome());
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping
    public ResponseEntity<List<User>> listUsers(){
        return ResponseEntity.ok(services.listAllUsers());
    }
}
