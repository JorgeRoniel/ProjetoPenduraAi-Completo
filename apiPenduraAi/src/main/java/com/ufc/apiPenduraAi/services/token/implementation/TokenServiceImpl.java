package com.ufc.apiPenduraAi.services.token.implementation;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.exceptions.token.InvalidTokenException;
import com.ufc.apiPenduraAi.services.token.TokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenServiceImpl implements TokenService {

    @Value("${jwt.secret}")
    private String secret;

    @Override
    public String createToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("api_pendura_ai")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirateTime())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("api_pendura_ai")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new InvalidTokenException("Token inválido ou expirado");
        }
    }

    private Instant generateExpirateTime() {
        return Instant.now().plus(1, ChronoUnit.HOURS);
    }
}
