package com.devcamp.sneaker.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devcamp.sneaker.entity.Employee;
import com.devcamp.sneaker.entity.Office;

@Repository
public interface IOfficeRepository extends JpaRepository<Office, Integer> {
	
	// find employee by city and country
	@Query(value = "SELECT * FROM offices  WHERE city like %:city% OR country LIKE %:country%", nativeQuery = true)
	List<Employee> findOfficeByCity(@Param("city") String city, @Param("country") String country);
	
	// delete office wwidth office_code = null
	@Transactional
	@Modifying
	@Query(value = "UPDATE offices SET city = :city Where office_code is null ", nativeQuery = true)
	int updateOfficeCityEqualNull(@Param("city") String city);
}
