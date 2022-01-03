package com.devcamp.sneaker.repository;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.Order;

public interface IOrderRepository extends JpaRepository<Order, Integer> {
	// find order by customer Id
	List<Order> findBycustomerIdId(Integer customerId);
	
	// find all order
	@Query(value = "SELECT * FROM `orders` WHERE 1", nativeQuery = true)
	List<Order> findAllOrder();
	
	// find all order by order date
	@Query(value = "SELECT DATE_FORMAT(orders.order_date, \"%Y-%m-%d\"), SUM(order_details.quantity_order * order_details.price_each) AS \"Tổng tiền\" FROM order_details\r\n"
			+ "INNER JOIN orders ON order_details.order_id = orders.id\r\n"
			+ "GROUP BY DATE_FORMAT(orders.order_date, \"%Y-%m-%d\");"
			+ "", nativeQuery = true)
	List<Object> sumTotalMoneyOrder();
	
	// filter total money order by day
	@Query(value = "SELECT DATE_FORMAT(orders.order_date, \"%Y-%m-%d\"), SUM(order_details.quantity_order * order_details.price_each) AS \"Total\" FROM order_details\r\n"
			+ "INNER JOIN orders ON order_details.order_id = orders.id\r\n"
			+ "WHERE orders.order_date >= :orderDateS AND orders.order_date <= :orderDateF \r\n"
			+ "GROUP BY DATE_FORMAT(orders.order_date, \"%Y-%m-%d\");\r\n"
			+ "", nativeQuery = true)
	List<Object> sumTotalMoneyOrderByDate(@Param("orderDateS") String orderDateS, @Param("orderDateF") String orderDateF);
	
	// filter total money order by week
	@Query(value = "SELECT FROM_DAYS(TO_DAYS(orders.order_date) - MOD(TO_DAYS(orders.order_date) -1, 7)), SUM(order_details.quantity_order * order_details.price_each) AS \"Total\" FROM order_details\r\n"
			+ "INNER JOIN orders ON order_details.order_id = orders.id\r\n"
			+ "WHERE orders.order_date >= :orderDateS AND orders.order_date <= :orderDateF \r\n"
			+ "GROUP BY FROM_DAYS(TO_DAYS(orders.order_date) - MOD(TO_DAYS(orders.order_date) -1, 7));\r\n"
			+ "", nativeQuery = true)
	List<Object> sumTotalMoneyOrderByWeek(@Param("orderDateS") String orderDateS, @Param("orderDateF") String orderDateF);
	
	// filter total money order by month
	@Query(value = "SELECT MONTHNAME(orders.order_date), SUM(order_details.quantity_order * order_details.price_each) AS \"Total\" FROM order_details\r\n"
			+ "INNER JOIN orders ON order_details.order_id = orders.id\r\n"
			+ "WHERE orders.order_date >= :orderDateS AND orders.order_date <= :orderDateF \r\n"
			+ "GROUP BY MONTHNAME(orders.order_date);\r\n"
			+ "", nativeQuery = true)
	List<Object> sumTotalMoneyOrderByMonth(@Param("orderDateS") String orderDateS, @Param("orderDateF") String orderDateF);
	
	// find order by order_date
	@Query(value = "SELECT * FROM orders  WHERE order_date like %:order_date% ", nativeQuery = true)
	List<Order> findOrderByOrderDate(@Param("order_date") String order_date);
	
	// delete order width order_date = null
	@Transactional
	@Modifying
	@Query(value = "UPDATE orders SET order_date = :order_date Where order_date is null ", nativeQuery = true)
	int updateOrderdateEqualNull(@Param("order_date") String order_date);
	
	// delete order by Id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `orders` WHERE id = :orderId", nativeQuery = true)
	int deleteOrderById(@Param("orderId") Integer productId);
	
	// delete order by id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `orders` WHERE customer_id = :customerId", nativeQuery = true)
	int deleteOrderByCustomerId(@Param("customerId") Integer customerId);
}
