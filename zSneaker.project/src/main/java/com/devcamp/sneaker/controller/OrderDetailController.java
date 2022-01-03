package com.devcamp.sneaker.controller;

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

import com.devcamp.sneaker.entity.Order;
import com.devcamp.sneaker.entity.OrderDetail;
import com.devcamp.sneaker.entity.Product;
import com.devcamp.sneaker.repository.*;

@CrossOrigin
@RestController
public class OrderDetailController {
	@Autowired
	IOrderDetailRepository orderDetailRepo;
	
	@Autowired
	IOrderRepository orderRepo;
	
	@Autowired
	IProductRepository productRepo;
	
	// show all order detail
	@GetMapping("/order-details")
	public ResponseEntity<Object> getAllOrderDetail() {
		try {
			return new ResponseEntity<>(orderDetailRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find order detail by id
	@GetMapping("/order-details/{orderDetailId}")
	public ResponseEntity<Object> getOrderDetailById(@PathVariable Integer orderDetailId) {
		try {
			Optional<OrderDetail> orderDetailFound = orderDetailRepo.findById(orderDetailId);
			if (orderDetailFound.isPresent()) {
				return new ResponseEntity<>(orderDetailFound.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// find order by order-detail id
	@GetMapping("/order-details/order/{orderId}")
	public ResponseEntity<List<OrderDetail>> getOrderDetailByOrderId(@PathVariable Integer orderId) {
		try {
			return new ResponseEntity<>(orderDetailRepo.findByOrderIdId(orderId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// find order-detail and product by order id
	@GetMapping("/order-details/order/{orderId}/product")
	public ResponseEntity<Object> getOrderDetailAndProductByOrderId(@PathVariable Integer orderId) {
		try {
			return new ResponseEntity<>(orderDetailRepo.findOrderDetailAndProductByOrderId(orderId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// create order-detail
	@PostMapping("/order-details/orderId/{orderId}/productId/{productId}")
	public ResponseEntity<Object> createOrderDetail(@PathVariable Integer orderId, @PathVariable Integer productId, @Valid @RequestBody OrderDetail newOrderDetail) {
		try {
			Optional<Order> order = orderRepo.findById(orderId);
			Optional<Product> product = productRepo.findById(productId);
			if (order.isPresent() && product.isPresent()) {
				newOrderDetail.setOrderId(order.get());
				newOrderDetail.setProductId(product.get());
				return new ResponseEntity<>(orderDetailRepo.save(newOrderDetail), HttpStatus.CREATED);
			}
			else {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// edit order-detail
	@PutMapping("/order-details/{orderDetailId}")
	public ResponseEntity<Object> updateOrderDetail(@PathVariable Integer orderDetailId, @RequestBody OrderDetail newOrderDetail) {
		try {
			Optional<OrderDetail> orderDetailFound = orderDetailRepo.findById(orderDetailId);
			if (orderDetailFound.isPresent()) {
				OrderDetail updateOrderDetail = orderDetailFound.get();
				updateOrderDetail.setPriceEach(newOrderDetail.getPriceEach());
				updateOrderDetail.setQuantityOrder(newOrderDetail.getQuantityOrder());
				return new ResponseEntity<>(orderDetailRepo.save(updateOrderDetail), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete order-detail by id
	@DeleteMapping("/order-details/{orderDetailId}")
	public ResponseEntity<Object> deleteOrderDetailById (@PathVariable Integer orderDetailId) {
		try {
			orderDetailRepo.deleteOrderDetailById(orderDetailId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// delete all order-detail
	@DeleteMapping("/order-details")
	public ResponseEntity<Object> deleteAllOrderDetail() {
		try {
			orderDetailRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
