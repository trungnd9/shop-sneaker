package com.devcamp.sneaker.service;

import com.devcamp.sneaker.entity.Token;

public interface TokenService {
	
	Token createToken(Token token);

    Token findByToken(String token);
}
