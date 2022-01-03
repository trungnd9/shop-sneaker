package com.devcamp.sneaker.repository;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.ProductLine;

public interface IProductLineRepository extends JpaRepository<ProductLine, Integer> {
	
	// delete product_line by id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `product_lines` WHERE id = :productLineId", nativeQuery = true)
	int deleteProductById(@Param("productLineId") Integer productLineId);
}
