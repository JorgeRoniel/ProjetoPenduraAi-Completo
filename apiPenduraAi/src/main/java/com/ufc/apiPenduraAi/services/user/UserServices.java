package com.ufc.apiPenduraAi.services.user;

import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnLoginDTO;

import java.util.List;

public interface UserServices {

    User createUser(CreateUserDTO data);
    ReturnLoginDTO authUser(LoginUserDTO data);
    List<User> listAllUsers();
}
