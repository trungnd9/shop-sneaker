package com.devcamp.sneaker.service;

import com.devcamp.sneaker.entity.User;
import com.devcamp.sneaker.security.UserPrincipal;

public interface UserService {
	
    User createUser(User user);

    UserPrincipal findByUsername(String username);
}
