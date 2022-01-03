package com.devcamp.sneaker.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_details")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Transient
	private int idOrder;
	
	public int getIdOrder() {
		return getOrderId().getId();
	}

	public void setIdOrder(int idOrder) {
		this.idOrder = idOrder;
	}
	
	@Transient
	private int idProduct;
	
	@Transient
	private String userName;
	
	@Transient
	private String userPhoto;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	@JsonIgnore
	private Order orderId;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "product_id", nullable = false)
	@JsonIgnore
	private Product productId;

	@NotNull(message = "Must have quantity order")
	@Column(name = "quantity_order", nullable = false)
	private int quantityOrder;

	@NotNull(message = "Must have price each")
	@Column(name = "price_each", nullable = false)
	private Double priceEach;
	
	@OneToOne(mappedBy = "ordersDetail", fetch = FetchType.EAGER)
	@JsonIgnore
	private RatingAndReview ratingAndReview;

	public OrderDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderDetail(int id, Order orderId, Product productId, @NotNull int quantityOrder, @NotNull(message = "Must have price each") Double priceEach) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.productId = productId;
		this.quantityOrder = quantityOrder;
		this.priceEach = priceEach;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Order getOrderId() {
		return orderId;
	}

	public void setOrderId(Order orderId) {
		this.orderId = orderId;
	}

	public int getQuantityOrder() {
		return quantityOrder;
	}

	public void setQuantityOrder(int quantityOrder) {
		this.quantityOrder = quantityOrder;
	}

	public @NotNull(message = "Must have price each") Double getPriceEach() {
		return priceEach;
	}

	public void setPriceEach(@NotNull(message = "Must have price each") Double priceEach) {
		this.priceEach = priceEach;
	}

	public Product getProductId() {
		return productId;
	}

	public void setProductId(Product productId) {
		this.productId = productId;
	}
	
	public int getIdProduct() {
		return getProductId().getId();
	}

	public void setIdProduct(int idProduct) {
		this.idProduct = idProduct;
	}
	
	@JsonIgnore
	public int getIdProductNumber() {
		return idProduct;
	}

	public RatingAndReview getRatingAndReview() {
		return ratingAndReview;
	}

	public void setRatingAndReview(RatingAndReview ratingAndReview) {
		this.ratingAndReview = ratingAndReview;
	}

	public String getUserName() {
		return getOrderId().getCustomerId().getUser().getUsername();
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPhoto() {
		return getOrderId().getCustomerId().getUser().getPhotos();
	}

	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}

}
