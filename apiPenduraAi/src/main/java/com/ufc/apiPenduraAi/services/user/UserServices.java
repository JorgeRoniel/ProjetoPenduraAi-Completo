package com.ufc.apiPenduraAi.services.user;

import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.user.CreateUserDTO;
import com.ufc.apiPenduraAi.dtos.user.LoginUserDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnLoginDTO;
import com.ufc.apiPenduraAi.dtos.user.ReturnUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserServices {

    User createUser(CreateUserDTO data);
    ReturnLoginDTO authUser(LoginUserDTO data);
    Page<ReturnUserDTO> listAllUsers(Pageable pageable);
}
