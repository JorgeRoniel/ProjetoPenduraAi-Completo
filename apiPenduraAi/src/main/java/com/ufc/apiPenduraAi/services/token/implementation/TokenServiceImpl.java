package com.ufc.apiPenduraAi.services.token.implementation;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.services.token.TokenService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenServiceImpl implements TokenService {

    private final String secret = "T3ST3";

    @Override
    public String createToken(User user) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token  = JWT.create()
                    .withIssuer("api_pendura_ai")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirateTime())
                    .sign(algorithm);

            return token;
        }catch (JWTCreationException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String verifyToken(String token) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("api_pendura_ai")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private Instant generateExpirateTime(){
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"));
    }
}
