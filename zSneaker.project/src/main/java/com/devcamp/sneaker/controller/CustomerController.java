package com.devcamp.sneaker.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.sneaker.entity.Customer;
import com.devcamp.sneaker.entity.User;
import com.devcamp.sneaker.repository.ICustomerRepository;
import com.devcamp.sneaker.repository.IOrderDetailRepository;
import com.devcamp.sneaker.repository.IOrderRepository;
import com.devcamp.sneaker.repository.IPaymentRepository;
import com.devcamp.sneaker.repository.IRattingAndReview;
import com.devcamp.sneaker.repository.IUserRepository;

@CrossOrigin
@RestController
public class CustomerController {
	@Autowired
	ICustomerRepository customerRepo;
	@Autowired
	IOrderRepository orderRepo;
	@Autowired
	IPaymentRepository paymentRepo;
	@Autowired
	IOrderDetailRepository orderdetailRepo;
	@Autowired
	IUserRepository userRepo;
	@Autowired
	IRattingAndReview rattingReviewRepo;
	
	// show all customer
	@GetMapping("/customers")
	public ResponseEntity<Object> getAllCustomer() {
		try {
			return new ResponseEntity<>(customerRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find customer by Id
	@GetMapping("/customers/{customerId}")
	public ResponseEntity<Object> getCustomerById(@PathVariable Integer customerId) {
		try {
			Optional<Customer> customerFound = customerRepo.findById(customerId);
			if (customerFound.isPresent()) {
				return new ResponseEntity<>(customerFound.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find customer by firstname and lastname
	@GetMapping("/customers/firstname/{firstName}/lastname/{lastName}")
	public ResponseEntity<Object> getCustomerByFirstNameOrLastName(@PathVariable String firstName,
			@PathVariable String lastName) {
		try {
			return new ResponseEntity<>(customerRepo.findCustomerByFirstNameORLastName(firstName, lastName)
					, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find customer by city
	@GetMapping("/customers/city/{city}/state/{state}")
	public ResponseEntity<Object> getCustomerByCityAndState(@PathVariable String city,
			@PathVariable String state) {
		try {
			return new ResponseEntity<>(customerRepo.findCustomerByCityORSate(city, state, PageRequest.of(2, 10)) 
					, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show customer by page
	@GetMapping("/customers/page")
	public ResponseEntity<Object> getCustomers(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
		      @RequestParam(name = "size", required = false, defaultValue = "9") Integer size,
		      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
		try {
			return new ResponseEntity<>(customerRepo.findCustomers(PageRequest.of(page, size)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find customer by phomeNumber
	@GetMapping("/customers/phoneNumber/{phoneNumber}")
	public ResponseEntity<Object> getCustomerByphoneNumber(@PathVariable String phoneNumber) {
		try {
			return new ResponseEntity<>(customerRepo.findCustomerByPhoneNumber(phoneNumber), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show total order money of customer
	@GetMapping("/customers/totalMoney")
	public ResponseEntity<Object> sumTotalMoneyByCustomer() {
		try {
			return new ResponseEntity<>(customerRepo.sumTotalMoneyByCustomer(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find total order money of customer by total money
	@GetMapping("/customers/totalMoney/{money}")
	public ResponseEntity<Object> sumTotalMoneyByMoney(@PathVariable String money) {
		try {
			return new ResponseEntity<>(customerRepo.sumTotalMoneyCustomerByMoney(money), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// filter customer by total order
	@GetMapping("/customers/totalOrder/{order}")
	public ResponseEntity<Object> sumTotalOrderCustomer(@PathVariable String order) {
		try {
			return new ResponseEntity<>(customerRepo.sumTotalOrderCustomer(order), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// create customer
	@PostMapping("/customers")
	public ResponseEntity<Object> createCustomer(@Valid @RequestBody Customer newCustomer) {
		try {
			return new ResponseEntity<>(customerRepo.save(newCustomer), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// edit customer
	@PutMapping("/customers/{customerId}")
	public ResponseEntity<Object> updateCustomer(@Valid @RequestBody Customer newCustomer, @PathVariable int customerId) {
		try {
			Optional<Customer> customerFound = customerRepo.findById(customerId);
			if (customerFound.isPresent()) {
				Customer updateCustomer = customerFound.get();
				updateCustomer.setAddress(newCustomer.getAddress());
				updateCustomer.setCity(newCustomer.getCity());
				updateCustomer.setCountry(newCustomer.getCountry());
				updateCustomer.setCreditLimit(newCustomer.getCreditLimit());
				updateCustomer.setFirstName(newCustomer.getFirstName());
				updateCustomer.setLastName(newCustomer.getLastName());
				updateCustomer.setPhoneNumber(newCustomer.getPhoneNumber());
				updateCustomer.setPostalCode(newCustomer.getPostalCode());
				updateCustomer.setSalesRepEmployeeNumber(newCustomer.getSalesRepEmployeeNumber());
				updateCustomer.setState(newCustomer.getState());
				return new ResponseEntity<>(customerRepo.save(updateCustomer), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete all customer
	@DeleteMapping("/customers")
	public ResponseEntity<Object> deleteAllCustomer() {
		try {
			customerRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete customer by customerId
	@DeleteMapping("/customers/{customerId}")
	public ResponseEntity<Object> deleteCustomerById(@PathVariable Integer customerId) {
		try {
			Optional<Customer> customerFound = customerRepo.findById(customerId);
			if (customerFound.isPresent()) {
				if (customerFound.get().getUser() == null) {
					orderdetailRepo.deleteOrderDetailByCustomerId(customerId);
					orderRepo.deleteOrderByCustomerId(customerId);
					paymentRepo.deletePaymenstByCustomerId(customerId);
					customerRepo.deleteCustomerById(customerId);
					return new ResponseEntity<>( HttpStatus.NO_CONTENT);
				}
				else {
					User user = customerRepo.findById(customerId).get().getUser();
					rattingReviewRepo.deleteRatingReviewByCustomerId(customerId);
					orderdetailRepo.deleteOrderDetailByCustomerId(customerId);
					orderRepo.deleteOrderByCustomerId(customerId);
					paymentRepo.deletePaymenstByCustomerId(customerId);
					customerRepo.deleteCustomerById(customerId);
					userRepo.deleteUserRoleByUserId(user.getId());
					userRepo.deleteById(user.getId());
					return new ResponseEntity<>( HttpStatus.NO_CONTENT);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
