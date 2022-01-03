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

import com.devcamp.sneaker.entity.Product;
import com.devcamp.sneaker.entity.ProductLine;
import com.devcamp.sneaker.repository.*;

@CrossOrigin
@RestController
public class ProductController {
	@Autowired
	IProductRepository productRepo;
	@Autowired
	IProductLineRepository productLineRepo;
	@Autowired
	IOrderDetailRepository orderDetailRepo;
	
	// show all product
	@GetMapping("/products")
	public ResponseEntity<Object> getAllProducts() {
		try {
			return new ResponseEntity<>(productRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find product by productId
	@GetMapping("/products/{productId}")
	public ResponseEntity<Object> getProductById(@PathVariable Integer productId) {
		try {
			Optional<Product> productFound = productRepo.findById(productId);
			if (productFound.isPresent()) {
				return new ResponseEntity<>(productFound.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show product by page
	@GetMapping("/products/page")
	public ResponseEntity<Object> getProducts(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
		      @RequestParam(name = "size", required = false, defaultValue = "6") Integer size,
		      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
		try {
			return new ResponseEntity<>(productRepo.findProducts(PageRequest.of(page, size)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//show product price low to price high
	@GetMapping("/products/price/low")
	public ResponseEntity<Object> showProductsListLowToHigh(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
		      @RequestParam(name = "size", required = false, defaultValue = "6") Integer size,
		      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
		try {
			return new ResponseEntity<>(productRepo.showListProductLowToHigh(PageRequest.of(page, size)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//show product price high to price low
	@GetMapping("/products/price/high")
	public ResponseEntity<Object> showProductsListHighToLow(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
		      @RequestParam(name = "size", required = false, defaultValue = "6") Integer size,
		      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
		try {
			return new ResponseEntity<>(productRepo.showListProductHighToLow(PageRequest.of(page, size)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//show latest product
		@GetMapping("/products/latest/")
		public ResponseEntity<Object> showLatestProducts(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
			      @RequestParam(name = "size", required = false, defaultValue = "6") Integer size,
			      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
			try {
				return new ResponseEntity<>(productRepo.showListLatestProduct																																																																																																																																																																																																							(PageRequest.of(page, size)), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	
	// show product by product vendor
	@GetMapping("/products/vendor/{productVender}")
	public ResponseEntity<Object> getProductByVender(@PathVariable String productVender) {
		try {
			return new ResponseEntity<>(productRepo.findProductByProductVender(productVender), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show product by product brand
	@GetMapping("/products/brand/{brand}")
	public ResponseEntity<Object> getProductByBrand(@PathVariable String brand) {
		try {
			return new ResponseEntity<>(productRepo.findProductByAllProductBrand(brand), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show three product with the most orders
	@GetMapping("/products/third")
	public ResponseEntity<Object> getProductLimit3() {
		try {
			return new ResponseEntity<>(productRepo.findProductLimit3(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show three new product
	@GetMapping("/products/new")
	public ResponseEntity<Object> getProductNew() {
		try {
			return new ResponseEntity<>(productRepo.findProductLimitNew(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// count product vendor
	@GetMapping("/products/countVendor")
	public ResponseEntity<Object> countProductVendor() {
		try {
			return new ResponseEntity<>(productRepo.countProductVendor(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find product by price
	@GetMapping("/products/price/{priceLow}/{priceUp}")
	public ResponseEntity<Object> getProductBuyPrice(@PathVariable Integer priceLow, @PathVariable Integer priceUp) {
		try {
			return new ResponseEntity<>(productRepo.findProductByprice(priceLow, priceUp), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// get product by customerId
	@GetMapping("/products/customerId/{customerId}")
		public ResponseEntity<Object> getProductByCustomer(@PathVariable Integer customerId) {
			try {
				return new ResponseEntity<>(productRepo.findProductIdByCustomerId(customerId), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	
	// create product
	@PostMapping("/products/product-line/{productLineId}")
	public ResponseEntity<Object> createProduct(@PathVariable Integer productLineId, @Valid @RequestBody Product newProduct) {
		try {
			Optional<ProductLine> productLine = productLineRepo.findById(productLineId);
			if (productLine.isPresent()) {
				newProduct.setProductLineId(productLine.get());
				return new ResponseEntity<>(productRepo.save(newProduct), HttpStatus.CREATED);
			}
			else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// edit product
	@PutMapping("/products/{productId}")
	public ResponseEntity<Object> updateProduct(@PathVariable Integer productId,@Valid @RequestBody Product newProduct) {
		try {
			Optional<Product> productFound = productRepo.findById(productId);
			if (productFound.isPresent()) {
				Product updateProduct = productFound.get();
				updateProduct.setBuyPrice(newProduct.getBuyPrice());
				updateProduct.setProductCode(newProduct.getProductCode());
				updateProduct.setProductDescription(newProduct.getProductDescription());
				updateProduct.setProductName(newProduct.getProductName());
				updateProduct.setProductSize(newProduct.getProductSize());
				updateProduct.setProductColor(newProduct.getProductColor());
				updateProduct.setProductVendor(newProduct.getProductVendor());
				updateProduct.setQuantityInStock(newProduct.getQuantityInStock());
				return new ResponseEntity<>(productRepo.save(updateProduct), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete product
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<Object> deleteProductById(@PathVariable Integer productId) {
		try {
			Optional<Product> productFound = productRepo.findById(productId);
			if (productFound.isPresent()) {
				orderDetailRepo.deleteOrderDetailByProductId(productId);
				productRepo.deleteProductById(productId);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete all product
	@DeleteMapping("/products")
	public ResponseEntity<Object> deleteAllProduct() {
		try {
			productRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
