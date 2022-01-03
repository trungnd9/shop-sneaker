package com.devcamp.sneaker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devcamp.sneaker.entity.Customer;


public interface ICustomerRepository extends JpaRepository<Customer, Integer> {
	// find all
	@Query("SELECT e FROM Customer e")
	List<Customer> findCustomers(Pageable pageable);

	// find customer by firstname and lastname
	@Query(value = "SELECT * FROM customers  WHERE last_name like %:lastName% OR first_name LIKE %:firstname%", nativeQuery = true)
	List<Customer> findCustomerByFirstNameORLastName(@Param("lastName") String lastName,
			@Param("firstname") String firstname);

	// find all customer by total money order
	@Query(value = "SELECT `id`, `CONCAT(customers.first_name,' ',customers.last_name)`,COUNT(orderId), SUM(`Tổng tiền`) FROM `customermoney` GROUP BY `id`"
			+ "", nativeQuery = true)
	List<Object> sumTotalMoneyByCustomer();

	// filter list customer by total money
	@Query(value = "SELECT `id`, `CONCAT(customers.first_name,' ',customers.last_name)`,COUNT(orderId), SUM(`Tổng tiền`) FROM `customermoney` GROUP BY `id` HAVING SUM(`Tổng tiền`) > :totalMoney", nativeQuery = true)
	List<Object> sumTotalMoneyCustomerByMoney(@Param("totalMoney") String totalMoney);

	// filter list customer by total order
	@Query(value = "SELECT `id`, `CONCAT(customers.first_name,' ',customers.last_name)`, COUNT(`orderId`), `Tổng tiền` FROM `customermoney` GROUP BY id HAVING COUNT(`orderId`) = :totalOrder", nativeQuery = true)
	List<Object> sumTotalOrderCustomer(@Param("totalOrder") String totalOrder);

	// filter customer by country
	@Query(value = "SELECT * from customers c WHERE city like %:city% OR state like %:state%", nativeQuery = true)
	List<Customer> findCustomerByCityORSate(@Param("city") String city, @Param("state") String state,
			Pageable pageable);
	
	// filter customer by country and state
	@Query(value = "SELECT * from customers c WHERE country like %:country% ORDER BY c.last_name ASC", nativeQuery = true)
	List<Customer> findCustomerByCountry(@Param("country") String country, Pageable pageable);
	
	// filter customer by phone number
	@Query(value = "SELECT * FROM `customers` WHERE phone_number = :phoneNumber", nativeQuery = true)
	Customer findCustomerByPhoneNumber(@Param("phoneNumber") String phoneNumber);
	
	// delete customer width country = null
	@Transactional
	@Modifying
	@Query(value = "UPDATE customers SET country = :country Where country is null ", nativeQuery = true)
	int updateCountryEqualNull(@Param("country") String country);
	
	// find customer by country
	List<Customer> findByCountry(String country);
	
	// delete customer by id
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM `customers` WHERE id = :customerId", nativeQuery = true)
	int deleteCustomerById(@Param("customerId") Integer customerId);
}
