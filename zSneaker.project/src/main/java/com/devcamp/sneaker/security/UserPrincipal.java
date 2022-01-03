package com.devcamp.sneaker.security;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 1L;
	
	private Long userId;
	private String username;
	private String password;
	private Collection authorities;

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Collection getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection authorities) {
		this.authorities = authorities;
	}
	
}
