package com.ufc.apiPenduraAi.services.token;

import com.ufc.apiPenduraAi.domain.user.User;

public interface TokenService {
    String createToken(User user);
    String verifyToken(String token);
}
