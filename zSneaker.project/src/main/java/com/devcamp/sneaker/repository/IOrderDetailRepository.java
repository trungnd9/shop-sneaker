package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.OrderDetail;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	
	// find order detail by orderId
	List<OrderDetail> findByOrderIdId(Integer orderId);
	
	// find order detail by productId
	List<OrderDetail> findByProductIdId(Integer productId);
	
	@Query(value = "SELECT orders.id AS 'orderId', order_details.id AS 'orderDetailId', order_details.price_each AS 'price', order_details.quantity_order AS 'quantity', products.product_name AS 'productName' FROM\r\n"
			+ "products JOIN order_details ON order_details.product_id = products.id JOIN orders ON order_details.order_id = orders.id\r\n"
			+ "HAVING orders.id = :orderId\r\n"
			+ "ORDER BY `order_details`.`id` ASC", nativeQuery = true)
	List<IQuery> findOrderDetailAndProductByOrderId(@Param("orderId") Integer orderId);
	
	// delete order detail by Id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `order_details` WHERE id = :orderDetailId", nativeQuery = true)
	int deleteOrderDetailById(@Param("orderDetailId") Integer orderDetailId);
	
	// delete order detail by productId
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `order_details` WHERE product_id = :productId", nativeQuery = true)
	int deleteOrderDetailByProductId(@Param("productId") Integer productId);
	
	// delete order detail by orderId
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `order_details` WHERE order_id = :orderId", nativeQuery = true)
	int deleteOrderDetailByOrderId(@Param("orderId") Integer orderId);
	
	//delete order detail by customerId
	@Transactional
	@Modifying
	@Query(value = "DELETE `order_details` FROM order_details INNER JOIN orders ON order_details.order_id = orders.id INNER JOIN customers ON orders.customer_id = customers.id WHERE customers.id = :customerId", nativeQuery = true)
	int deleteOrderDetailByCustomerId(@Param("customerId") Integer customerId);
	
	// delete order detail by product_line_id
	@Transactional
	@Modifying
	@Query(value = "DELETE `order_details` FROM order_details INNER JOIN products ON order_details.product_id = products.id\r\n"
			+ "INNER JOIN product_lines ON products.product_line_id = product_lines.id\r\n"
			+ "WHERE product_lines.id = :productLineId", nativeQuery = true)
	int deleteOrderDetailByProductLineId(@Param("productLineId") Integer productLineId);
}
