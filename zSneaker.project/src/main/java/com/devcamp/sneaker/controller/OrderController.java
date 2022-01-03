package com.devcamp.sneaker.controller;

import java.util.ArrayList;
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
import com.devcamp.sneaker.entity.Order;
import com.devcamp.sneaker.entity.OrderDetail;
import com.devcamp.sneaker.entity.Product;
import com.devcamp.sneaker.entity.User;
import com.devcamp.sneaker.repository.*;

@RestController
@CrossOrigin
public class OrderController {
	@Autowired
	IOrderRepository orderRepo;
	
	@Autowired
	ICustomerRepository customerRepo;
	
	@Autowired
	IOrderDetailRepository orderdetailRepo;
	
	@Autowired
	IProductRepository productRepo;
	
	@Autowired
	IUserRepository userRepo;
	
	@Autowired
	IRattingAndReview ratingReviewRepo;
	
	// show all order
	@GetMapping("/orders")
	public ResponseEntity<Object> getAllOrder() {
		try {
			return new ResponseEntity<>(orderRepo.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show order by orderId
	@GetMapping("/orders/{orderId}")
	public ResponseEntity<Object> getOrderById(@PathVariable Integer orderId) {
		try {
			Optional<Order> orderFound = orderRepo.findById(orderId);
			if (orderFound.isPresent()) {
				return new ResponseEntity<>(orderFound.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show order by customerId
	@GetMapping("/orders/customer/{customerId}")
	public ResponseEntity<List<Order>> getOrderListByCustomerId(@PathVariable Integer customerId) {
		try {
			return new ResponseEntity<>(orderRepo.findBycustomerIdId(customerId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show total money by orderDate
	@GetMapping("/orders/{orderDateS}/{orderDateF}")
	public ResponseEntity<Object> getTotalMoneyOrderByDate(@PathVariable String orderDateS, @PathVariable String orderDateF) {
		try {
			return new ResponseEntity<>(orderRepo.sumTotalMoneyOrderByDate(orderDateS, orderDateF), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show total money by week
	@GetMapping("/orders/week/{orderDateS}/{orderDateF}")
	public ResponseEntity<Object> getTotalMoneyOrderByWeek(@PathVariable String orderDateS, @PathVariable String orderDateF) {
		try {
			return new ResponseEntity<>(orderRepo.sumTotalMoneyOrderByWeek(orderDateS, orderDateF), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// show total money by moth
	@GetMapping("/orders/month/{orderDateS}/{orderDateF}")
	public ResponseEntity<Object> getTotalMoneyOrderByMonth(@PathVariable String orderDateS, @PathVariable String orderDateF) {
		try {
			return new ResponseEntity<>(orderRepo.sumTotalMoneyOrderByMonth(orderDateS, orderDateF), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// show total money all order by orderDate
	@GetMapping("/orders/totalOrder")
	public ResponseEntity<Object> getTotalMoneyOrder() {
		try {
			return new ResponseEntity<>(orderRepo.sumTotalMoneyOrder(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// create new order
	@PostMapping("/orders/{customerId}")
	public ResponseEntity<Object> createOrder (@PathVariable Integer customerId, @Valid @RequestBody Order newOrder) {
		try {
			Optional<Customer> customer = customerRepo.findById(customerId);
			if (customer.isPresent() ) {
				newOrder.setOrderDate(new Date());
				newOrder.setCustomerId(customer.get());
				return new ResponseEntity<>(orderRepo.save(newOrder), HttpStatus.CREATED);
			}
			else {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//create order by customerId
	@PostMapping("/orders/orderDetail/{userId}")
	public ResponseEntity<Object> createOrderAndOrderDetail (@PathVariable Long userId, @Valid @RequestBody Order newOrder) {
		try {
			Optional<User> user = userRepo.findById(userId);
			Customer customer = user.get().getCustomer();
			ArrayList<OrderDetail> orderDetailArray = new ArrayList<>(newOrder.getOrderDetails());
			if (orderDetailArray.size() == 0) {
				return new ResponseEntity<>("Không có sản phẩm", HttpStatus.NOT_FOUND);
			}
			else {
				if (customer != null) {
					Order orderNew = new Order();
					orderNew.setOrderDate(new Date());
					orderNew.setRequiredDate(newOrder.getRequiredDate());
					orderNew.setCustomerId(customer);
					orderNew.setStatus(newOrder.getStatus());
					Order saveOrderNew = orderRepo.save(orderNew);
					
					for (int i = 0; i < orderDetailArray.size(); i++) {
						OrderDetail orderDetail = new OrderDetail();
						orderDetail.setOrderId(saveOrderNew);
						Product product = productRepo.findById(orderDetailArray.get(i).getIdProductNumber()).get();
						orderDetail.setProductId(product);
						orderDetail.setPriceEach(orderDetailArray.get(i).getPriceEach());
						orderDetail.setQuantityOrder(orderDetailArray.get(i).getQuantityOrder());
						orderdetailRepo.save(orderDetail);
					}
					return ResponseEntity.ok(saveOrderNew);
				}
				else {
					return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/orders/orderDetail/customerId/{customerId}")
	public ResponseEntity<Object> createOrderAndOrderDetailByCustomerId (@PathVariable Integer customerId, @Valid @RequestBody Order newOrder) {
		try {
			Customer customer = customerRepo.getById(customerId);
			ArrayList<OrderDetail> orderDetailArray = new ArrayList<>(newOrder.getOrderDetails());
			if (orderDetailArray.size() == 0) {
				return new ResponseEntity<>("Không có sản phẩm", HttpStatus.NOT_FOUND);
			}
			else {
				if (customer != null) {
					Order orderNew = new Order();
					orderNew.setOrderDate(new Date());
					orderNew.setRequiredDate(newOrder.getRequiredDate());
					orderNew.setCustomerId(customer);
					orderNew.setStatus(newOrder.getStatus());
					Order saveOrderNew = orderRepo.save(orderNew);
					
					for (int i = 0; i < orderDetailArray.size(); i++) {
						OrderDetail orderDetail = new OrderDetail();
						orderDetail.setOrderId(saveOrderNew);
						Product product = productRepo.findById(orderDetailArray.get(i).getIdProductNumber()).get();
						orderDetail.setProductId(product);
						orderDetail.setPriceEach(orderDetailArray.get(i).getPriceEach());
						orderDetail.setQuantityOrder(orderDetailArray.get(i).getQuantityOrder());
						orderdetailRepo.save(orderDetail);
					}
					return ResponseEntity.ok(saveOrderNew);
				}
				else {
					return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// update order
	@PutMapping("/orders/{orderId}")
	public ResponseEntity<Object> updateOrder(@PathVariable Integer orderId, @Valid @RequestBody Order newOrder) {
		try {
			Optional<Order> orderFound = orderRepo.findById(orderId);
			if (orderFound.isPresent()) {
				Order updateOrder = orderFound.get();
				updateOrder.setComments(newOrder.getComments());
				updateOrder.setOrderDate(newOrder.getOrderDate());
				updateOrder.setRequiredDate(newOrder.getRequiredDate());
				updateOrder.setShippedDate(newOrder.getShippedDate());
				updateOrder.setStatus(newOrder.getStatus());
				return new ResponseEntity<>(orderRepo.save(updateOrder), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	//delete order by orderId
	@DeleteMapping("/orders/{orderId}")
	public ResponseEntity<Object> deleteOrderById(@PathVariable Integer orderId) {
		try {
			Optional<Order> orderFound = orderRepo.findById(orderId);
			if (orderFound.isPresent()) {
				ratingReviewRepo.deleteRatingReviewByOrderId(orderId);
				orderdetailRepo.deleteOrderDetailByOrderId(orderId);
				orderRepo.deleteOrderById(orderId);
				return new ResponseEntity<>( HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// delete all order
	@DeleteMapping("/orders")
	public ResponseEntity<Object> deleteAllOrder() {
		try {
			orderRepo.deleteAll();
			return new ResponseEntity<>( HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
