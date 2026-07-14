package com.queueflow.service;

import com.queueflow.entity.Token;
import com.queueflow.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public Token generateToken(Token token) {
        return tokenRepository.save(token);
    }

    public Optional<Token> getTokenByCode(String code) {
        return tokenRepository.findByTokenCode(code);
    }
}
