package com.devcamp.sneaker.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull(message = "Must have order date")
	@Column(name = "order_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderDate;
	
	@NotNull(message = "Must have required date")
	@Column(name = "required_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date requiredDate;
	
	@Column(name = "shipped_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date shippedDate;
	
	@NotEmpty(message = "Enter status order")
	@Column(name = "status")
	private String status;

	@Column(name = "comments")
	private String comments;

	@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.ALL})
	@JoinColumn(name = "customer_id", nullable = false)
	@JsonIgnore
	private Customer customerId;
	
	@OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<OrderDetail> orderDetails;
	
	@Transient
	private int idCustomer;

	@Transient
	private String customerName;

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(int id, @NotNull(message = "Must have order date") Date orderDate,
			@NotNull(message = "Must have required date") Date requiredDate, Date shippedDate,
			@NotEmpty(message = "Enter status order") String status, String comments, List<OrderDetail> orderDetails) {
		super();
		this.id = id;
		this.orderDate = orderDate;
		this.requiredDate = requiredDate;
		this.shippedDate = shippedDate;
		this.status = status;
		this.comments = comments;
		this.orderDetails = orderDetails;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getRequiredDate() {
		return requiredDate;
	}

	public void setRequiredDate(Date requiredDate) {
		this.requiredDate = requiredDate;
	}

	public Date getShippedDate() {
		return shippedDate;
	}

	public void setShippedDate(Date shippedDate) {
		this.shippedDate = shippedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Customer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Customer customerId) {
		this.customerId = customerId;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}
	
	public int getIdCustomer() {
		return getCustomerId().getId();
	}

	public void setIdCustomer(int idCustomer) {
		this.idCustomer = idCustomer;
	}
	
	public String getCustomerName() {
		return customerId.getFirstName() + " " + customerId.getLastName();
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
}
