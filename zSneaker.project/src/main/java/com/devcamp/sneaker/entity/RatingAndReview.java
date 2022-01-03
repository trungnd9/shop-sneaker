package com.devcamp.sneaker.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
public class RatingAndReview extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	private int rating;
	
	private String review;
	
	@OneToOne
	private OrderDetail ordersDetail;

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public OrderDetail getOrdersDetail() {
		return ordersDetail;
	}

	public void setOrdersDetail(OrderDetail ordersDetail) {
		this.ordersDetail = ordersDetail;
	}
}
