package com.devcamp.sneaker.controller;

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

import com.devcamp.sneaker.entity.ProductLine;
import com.devcamp.sneaker.repository.IOrderDetailRepository;
import com.devcamp.sneaker.repository.IProductLineRepository;
import com.devcamp.sneaker.repository.IProductRepository;

@RestController
@CrossOrigin
public class ProductLineController {
	@Autowired
	IProductLineRepository productLineRepo;
	
	@Autowired
	IOrderDetailRepository orderDetailRepo;
	@Autowired
	IProductRepository productRepo;
	
	//show all product line
	@GetMapping("/product-lines")
	public ResponseEntity<Object> getAllProductLines() {
		try {
			return new ResponseEntity<>(productLineRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find product-line by id
	@GetMapping("/product-lines/{productLineId}")
	public ResponseEntity<Object> getProductLineById(@PathVariable Integer productLineId) {
		try {
			Optional<ProductLine> productLineFound = productLineRepo.findById(productLineId);
			if (productLineFound.isPresent()) {
				return new ResponseEntity<>(productLineFound.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find product-line by productId
	@GetMapping("/product-lines/products/{productLineId}")
	public ResponseEntity<Object> getProductById(@PathVariable Integer productLineId) {
		try {
			return new ResponseEntity<>(productRepo.findByProductLineIdId(productLineId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// create product-line
	@PostMapping("/product-lines")
	public ResponseEntity<Object> createProductLine(@Valid @RequestBody ProductLine newProductLine) {
		try {
			return new ResponseEntity<>(productLineRepo.save(newProductLine), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//edit product-line
	@PutMapping("/product-lines/{productLineId}")
	public ResponseEntity<Object> updateProductLine(@PathVariable Integer productLineId
			,@Valid @RequestBody ProductLine newProductLine) {
		try {
			Optional<ProductLine> productLineFound = productLineRepo.findById(productLineId);
			if (productLineFound.isPresent()) {
				ProductLine updateProDuctLine = productLineFound.get();
				updateProDuctLine.setDescription(newProductLine.getDescription());
				updateProDuctLine.setProductLine(newProductLine.getProductLine());
				return new ResponseEntity<>(productLineRepo.save(updateProDuctLine), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete product-line by id
	@DeleteMapping("/product-lines/{productLineId}")
	public ResponseEntity<Object> deleteProductLineById(@PathVariable Integer productLineId) {
		try {
			Optional<ProductLine> productLineFound = productLineRepo.findById(productLineId);
			if (productLineFound.isPresent()) {
				orderDetailRepo.deleteOrderDetailByProductLineId(productLineId);
				productRepo.deleteProductByProductLineId(productLineId);
				productLineRepo.deleteProductById(productLineId);
				return new ResponseEntity<>( HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete all product-line
	@DeleteMapping("/product-lines")
	public ResponseEntity<Object> deleteAllProductLine() {
		try {
			productLineRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
