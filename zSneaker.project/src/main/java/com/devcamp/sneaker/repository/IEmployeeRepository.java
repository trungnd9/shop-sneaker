package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.devcamp.sneaker.entity.Employee;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Integer> {
	// find employee by email
	@Query(value = "SELECT * FROM `employees` WHERE email = :email", nativeQuery = true)
	Employee findEmployeeByEmail(@Param("email") String email);
	
	// find employee by lastname and firstname
	@Query(value = "SELECT * FROM employees  WHERE last_name like %:lastName% OR first_name LIKE %:firstname%", nativeQuery = true)
	List<Employee> findCustomerByFirstNameORLastName(@Param("lastName") String lastName, @Param("firstname") String firstname);
	
	// delete employee width office_code = null
	@Transactional
	@Modifying
	@Query(value = "UPDATE employees SET office_code = :office_code Where office_code is null ", nativeQuery = true)
	int updateOfficeCodeEqualNull(@Param("office_code") int office_code);
	
}
