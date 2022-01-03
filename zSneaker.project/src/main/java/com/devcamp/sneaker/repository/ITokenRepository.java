package com.devcamp.sneaker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.sneaker.entity.Token;

public interface ITokenRepository extends JpaRepository<Token, Long> {
	
	Token findByToken(String token);
}
