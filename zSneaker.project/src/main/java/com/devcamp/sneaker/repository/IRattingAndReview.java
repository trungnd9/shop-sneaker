package com.devcamp.sneaker.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.RatingAndReview;

public interface IRattingAndReview extends JpaRepository<RatingAndReview, Long> {
	
	// delete rating by Order_id
	@Transactional
	@Modifying
	@Query(value = "DELETE `rating_and_review` FROM rating_and_review JOIN order_details ON rating_and_review.orders_detail_id = order_details.id\r\n"
			+ "JOIN orders ON orders.id = order_details.order_id\r\n"
			+ "WHERE orders.id = :orderId", nativeQuery = true)
	int deleteRatingReviewByOrderId(@Param("orderId") Integer orderId);
	
	//delete order detail by customerId
		@Transactional
		@Modifying
		@Query(value = "DELETE `rating_and_review` FROM rating_and_review INNER JOIN order_details ON rating_and_review.orders_detail_id = order_details.id \r\n"
				+ "INNER JOIN orders ON order_details.order_id = orders.id INNER JOIN customers ON orders.customer_id = customers.id WHERE customers.id = :customerId", nativeQuery = true)
		int deleteRatingReviewByCustomerId(@Param("customerId") Integer customerId);
}
