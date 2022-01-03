package com.devcamp.sneaker.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.devcamp.sneaker.entity.OrderDetail;
import com.devcamp.sneaker.entity.RatingAndReview;
import com.devcamp.sneaker.repository.IOrderDetailRepository;
import com.devcamp.sneaker.repository.IRattingAndReview;
import com.devcamp.sneaker.repository.IUserRepository;

@Controller
@CrossOrigin
public class RatingAndReviewController {
	
	@Autowired
	IRattingAndReview ratingAndReviewRepo;
	
	@Autowired
	IOrderDetailRepository orderDetailRepo;
	
	@Autowired
	IUserRepository userRepo;
	
	// get all rating and review
	@GetMapping("rating/review")
	public ResponseEntity<Object> getAllListRatingAndReview() {
		try {
			return ResponseEntity.ok(ratingAndReviewRepo.findAll());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// get Rating and review by productId
	@GetMapping("rating/review/{productId}")
	public ResponseEntity<Object> getRatingByProductId(@PathVariable Integer productId) {
		try {
			List<OrderDetail> listOrderDetail = orderDetailRepo.findByProductIdId(productId);
			List<RatingAndReview> listRatingAndReview = new ArrayList<>();
			for (OrderDetail orderDetail : listOrderDetail) {
				if (orderDetail.getRatingAndReview() != null) {
					listRatingAndReview.add(orderDetail.getRatingAndReview());
				}
			}
			return ResponseEntity.ok(listRatingAndReview);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// get rating by  order detail id
	@GetMapping("rating/review/orderdetail/{orderDetailId}")
	public ResponseEntity<Object> getRatingByOrderDetailId(@PathVariable Integer orderDetailId) {
		try {
			RatingAndReview ratingReview = orderDetailRepo.findById(orderDetailId).get().getRatingAndReview();
			if (ratingReview != null) {
				return ResponseEntity.ok(ratingReview);
			}
			else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// create rating and review
	@PostMapping("rating/review/create/{orderDetailId}")
	@PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_ADMIN', 'ROLE_EMPLOYEE')")
	public ResponseEntity<Object> createRatingAndReview(@PathVariable Integer orderDetailId,@RequestBody RatingAndReview ratingAndReview) {
		try {
			RatingAndReview newRatingReview = new RatingAndReview();
			newRatingReview.setOrdersDetail(orderDetailRepo.findById(orderDetailId).get());
			newRatingReview.setRating(ratingAndReview.getRating());
			newRatingReview.setReview(ratingAndReview.getReview());
			return ResponseEntity.ok(ratingAndReviewRepo.save(newRatingReview));
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// update rating review
	@PutMapping("rating/review/update/{ratingreviewId}")
	@PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_ADMIN', 'ROLE_EMPLOYEE')")
	public ResponseEntity<Object> updateRatingAndReview(@PathVariable Long ratingreviewId,@RequestBody RatingAndReview ratingAndReview) {
		try {
			if(ratingAndReviewRepo.existsById(ratingreviewId)) {
				RatingAndReview newRatingReview = ratingAndReviewRepo.getById(ratingreviewId);
				newRatingReview.setRating(ratingAndReview.getRating());
				newRatingReview.setReview(ratingAndReview.getReview());
				return ResponseEntity.ok(ratingAndReviewRepo.save(newRatingReview));
			} else {
				return new ResponseEntity<>("Not rating", HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//delete rating by id
	@DeleteMapping("rating/review/delete/{ratingId}")
	public ResponseEntity<Object> deleteRatingById(@PathVariable Long ratingId) {
		try {
			ratingAndReviewRepo.deleteById(ratingId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
