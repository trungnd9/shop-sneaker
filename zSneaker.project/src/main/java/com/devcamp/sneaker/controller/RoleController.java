package com.devcamp.sneaker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.sneaker.repository.IRolesRepository;

@CrossOrigin
@RestController
public class RoleController {
	
	@Autowired
	IRolesRepository roleRepo;
	
	@GetMapping("/roles/all")
	public ResponseEntity<Object> getAllRole() {
		try {
			return new ResponseEntity<>(roleRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
