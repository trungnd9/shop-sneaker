package com.devcamp.sneaker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.sneaker.entity.Role;

public interface IRolesRepository extends JpaRepository<Role, Long> {

}
