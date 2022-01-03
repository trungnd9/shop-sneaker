package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.ImageProduct;

public interface IImageProductRepository extends JpaRepository<ImageProduct, Integer> {
	
	// find Image Product by productId
	List<ImageProduct> findByProductIdId(Integer productId);
	
	// delete image product by Id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `product_img` WHERE id = :imageProduct", nativeQuery = true)
	int deleteImageById(@Param("imageProduct") Integer imageProduct);
}
