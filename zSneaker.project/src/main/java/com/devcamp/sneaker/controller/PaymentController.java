package com.devcamp.sneaker.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.sneaker.entity.Customer;
import com.devcamp.sneaker.entity.Payment;
import com.devcamp.sneaker.repository.*;

@CrossOrigin
@RestController
public class PaymentController {
	@Autowired
	IPaymentRepository paymentRepo;
	
	@Autowired
	ICustomerRepository customerRepo;
	
	@GetMapping("/payments")
	public ResponseEntity<Object> getAllPayments() {
		try {
			return new ResponseEntity<>(paymentRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/payments/customer/{customerId}")
	public ResponseEntity<List<Payment>> getPaymentByCustomerId(@PathVariable Integer customerId) {
		try {
			return new ResponseEntity<>(paymentRepo.findBycustomerIdId(customerId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/payments/{customerId}")
	public ResponseEntity<Object> createPayment(@PathVariable Integer customerId, @Valid @RequestBody Payment newPayment) {
		try {
			Optional<Customer> customer = customerRepo.findById(customerId);
			if (customer.isPresent()) {
				newPayment.setPaymentDate(new Date());
				newPayment.setCustomerId(customer.get());
				return new ResponseEntity<>(paymentRepo.save(newPayment), HttpStatus.CREATED);
			}
			else {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/payments/{paymentId}")
	public ResponseEntity<Object> updatePayment(@PathVariable Integer paymentId, @Valid @RequestBody Payment newPayment) {
		try {
			Optional<Payment> paymentFound = paymentRepo.findById(paymentId);
			if (paymentFound.isPresent()) {
				Payment updatePayment = paymentFound.get();
				updatePayment.setAmount(newPayment.getAmount());
				updatePayment.setCheckNumber(newPayment.getCheckNumber());
				updatePayment.setPaymentDate(newPayment.getPaymentDate());
				return new ResponseEntity<>(paymentRepo.save(updatePayment), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@DeleteMapping("/payments/{paymentId}")
	public ResponseEntity<Object> deletePaymentById(@PathVariable Integer paymentId) {
		try {
			Optional<Payment> paymentFound = paymentRepo.findById(paymentId);
			if (paymentFound.isPresent()) {
				paymentRepo.deleteById(paymentId);
				return new ResponseEntity<>( HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/payments")
	public ResponseEntity<Object> deleteAllPayment() {
		try {
			paymentRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
