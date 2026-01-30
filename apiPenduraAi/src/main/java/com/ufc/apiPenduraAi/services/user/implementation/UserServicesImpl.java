package com.ufc.apiPenduraAi.services.user.implementation;

import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnLoginDTO;
import com.ufc.apiPenduraAi.exceptions.user.EmailOrPassNull;
import com.ufc.apiPenduraAi.exceptions.user.NotFoundUser;
import com.ufc.apiPenduraAi.repositories.user.UserRepository;
import com.ufc.apiPenduraAi.services.token.TokenService;
import com.ufc.apiPenduraAi.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.beans.Encoder;
import java.util.List;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;


    @Override
    public User createUser(CreateUserDTO data) {
        String pass = encoder.encode(data.senha());
        User u = new User(data.nome(), data.email(), pass, data.role());
        return repository.save(u);
    }

   @Override
    public ReturnLoginDTO authUser(LoginUserDTO data) {
        var emailpass = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = authenticationManager.authenticate(emailpass);
        User user = (User) auth.getPrincipal();
        String token = tokenService.createToken(user);
        return new ReturnLoginDTO(token, user.getId(), user.getEmail(), user.getNome(), user.getRole().toString());
    }

    @Override
    public List<User> listAllUsers() {
        return repository.findAll();
    }
}
