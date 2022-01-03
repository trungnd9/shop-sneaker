package com.devcamp.sneaker.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.User;

public interface IUserRepository extends JpaRepository<User, Long> {
	
	User findByUsername(String username);
	
	// delete order detail by orderId
		@Transactional
		@Modifying
		@Query(value = "DELETE FROM `t_user_role` WHERE user_id = :userId", nativeQuery = true)
		int deleteUserRoleByUserId(@Param("userId") Long userId);
}
