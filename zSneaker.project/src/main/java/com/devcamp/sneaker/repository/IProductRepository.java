package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.Product;

public interface IProductRepository extends JpaRepository<Product, Integer> {
	// find product by product_line Id
	List<Product> findByProductLineIdId(Integer productLineId);
	
	// get product by page
	@Query("SELECT e FROM Product e")
	 Page<Product> findProducts(Pageable pageable);
	
	// find product by product_name
	@Query(value = "SELECT * FROM products  WHERE product_name like %:product_name% ", nativeQuery = true)
	List<Product> findProductByProductName(@Param("product_name") String product_name);
	
	// get 3 product first
	@Query(value = "SELECT product_id, COUNT(`product_id`) FROM `order_details` GROUP BY product_id  \r\n"
			+ "ORDER BY `COUNT(``product_id``)`  DESC LIMIT 3", nativeQuery = true)
	List<Object> findProductLimit3();
	
	// get 3 product new
	@Query(value = "SELECT * FROM `products`  \r\n"
			+ "ORDER BY `products`.`id` DESC LIMIT 4", nativeQuery = true)
	List<Product> findProductLimitNew();
	
	// find product by product_code
	@Query(value = "SELECT * FROM products  WHERE product_code like %:product_code% ", nativeQuery = true)
	List<Product> findProductByProductCode(@Param("product_code") String product_code);
	
	// get 4 product by product_vendor
	@Query(value = "SELECT * FROM products  WHERE product_vendor like %:product_vendor% LIMIT 4", nativeQuery = true)
	List<Product> findProductByProductVender(@Param("product_vendor") String product_vendor);
	
	// find product by product_vendor
	@Query(value = "SELECT * FROM products  WHERE product_vendor like %:product_vendor%", nativeQuery = true)
	List<Product> findProductByAllProductBrand(@Param("product_vendor") String product_vendor);
	
	// count product_vendor
	@Query(value = "SELECT product_vendor FROM products GROUP BY product_vendor", nativeQuery = true)
	List<Object> countProductVendor();
	
	// filter productId by customerId
	@Query(value = "SELECT * FROM `products` WHERE buy_price >= :priceLow AND buy_price <= :priceUp ORDER BY `products`.`buy_price` ASC", nativeQuery = true)
	List<Product> findProductByprice(@Param("priceLow") Integer priceLow, @Param("priceUp") Integer priceUp);
	
	// find list order by customerId
	@Query(value = "SELECT customers.id AS 'customerId',order_details.id AS 'orderDetailId', orders.order_date AS 'orderDate', order_details.product_id AS 'productId',"
			+ " order_details.quantity_order AS 'count', products.product_name AS 'productname', products.buy_price AS 'price', product_img.url AS 'image' FROM customers"
			+ " JOIN orders ON customers.id = orders.customer_id JOIN order_details ON orders.id = order_details.order_id JOIN products ON order_details.product_id = products.id "
			+ "JOIN product_img ON products.id = product_img.product_id\r\n"
			+ "WHERE customers.id = :customerId \r\n"
			+ "GROUP BY orderDetailId ORDER BY `orderDate` DESC;", nativeQuery = true)
	List<IQuery> findProductIdByCustomerId(@Param("customerId") Integer customerId);
	
	// show product by price low to high
	@Query(value = "SELECT * FROM `products` WHERE 1 ORDER BY `products`.`buy_price` ASC", nativeQuery = true)
	Page<Product> showListProductLowToHigh(Pageable pageable);
	
	// show product by price low to high
	@Query(value = "SELECT * FROM `products` WHERE 1 ORDER BY `products`.`buy_price`  DESC", nativeQuery = true)
	Page<Product> showListProductHighToLow(Pageable pageable);
	
	// show latest product list
	@Query(value = "SELECT * FROM `products` WHERE 1 ORDER BY `products`.`id`  DESC", nativeQuery = true)
	Page<Product> showListLatestProduct(Pageable pageable);
	
	// delete product width = null
	@Transactional
	@Modifying
	@Query(value = "UPDATE products SET product_code = :product_code Where product_code is null ", nativeQuery = true)
	int updateProductCodeEqualNull(@Param("product_code") String product_code);
	
	// delete product by Id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `order_details` WHERE id = :productId", nativeQuery = true)
	int deleteProductById(@Param("productId") Integer productId);
	
	// delete product by product_line_id
	@Transactional
	@Modifying
	@Query(value = "DELETE `products`FROM products INNER JOIN product_lines ON products.product_line_id = product_lines.id\r\n"
			+ "WHERE product_lines.id = :productLineId", nativeQuery = true)
	int deleteProductByProductLineId(@Param("productLineId") Integer productLineId);
}
