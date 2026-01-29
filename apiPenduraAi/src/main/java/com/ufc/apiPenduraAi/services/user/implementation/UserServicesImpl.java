package com.ufc.apiPenduraAi.services.user.implementation;

import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.exceptions.user.EmailOrPassNull;
import com.ufc.apiPenduraAi.exceptions.user.NotFoundUser;
import com.ufc.apiPenduraAi.repositories.user.UserRepository;
import com.ufc.apiPenduraAi.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private UserRepository repository;


    @Override
    public User createUser(CreateUserDTO data) {
        User u = new User(data.nome(), data.email(), data.senha(), data.role());
        return repository.save(u);
    }

    @Override
    public User authUser(LoginUserDTO data) {

        if(data.email() == null || data.senha() == null){
            throw new EmailOrPassNull("Email ou Senha Invalidos!");
        }

        User u = repository.findByEmail(data.email());
        if(u != null){
            if(u.getEmail().equals(data.email()) && u.getSenha().equals(data.senha())){
                return u;
            }else{
                return null;
            }
        }
        throw new NotFoundUser("User Not Found!");
    }

    @Override
    public List<User> listAllUsers() {
        return repository.findAll();
    }
}
