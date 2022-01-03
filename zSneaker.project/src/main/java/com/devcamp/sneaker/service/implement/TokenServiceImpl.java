package com.devcamp.sneaker.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devcamp.sneaker.entity.Token;
import com.devcamp.sneaker.repository.ITokenRepository;
import com.devcamp.sneaker.service.TokenService;

@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    private ITokenRepository tokenRepository;

    public Token createToken(Token token) {
        return tokenRepository.saveAndFlush(token);
    }

    @Override
    public Token findByToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
