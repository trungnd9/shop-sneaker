package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.Payment;

public interface IPaymentRepository extends JpaRepository<Payment, Integer> {
	
	// find payment by customer Id
	List<Payment> findBycustomerIdId(Integer customerId);
	
	// delete payment by customerId
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `payments` WHERE customer_id = :customerId", nativeQuery = true)
	int deletePaymenstByCustomerId(@Param("customerId") Integer customerId);
}
