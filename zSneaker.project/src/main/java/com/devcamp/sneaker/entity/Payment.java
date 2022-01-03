package com.devcamp.sneaker.entity;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "payments")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customerId;
	
	@NotEmpty(message = "Enter check number")
	@Column(name = "check_number", nullable = false)
	private String checkNumber;

	@Column(name = "payment_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date paymentDate;
	
	@NotNull(message = "Must have ammount")
	@Column(name = "ammount", nullable = false)
	private Double  amount;
	
	@Transient
	private int idCustomer;
	
	public int getIdCustomer() {
		return getCustomerId().getId();
	}

	public void setIdCustomer(int idCustomer) {
		this.idCustomer = idCustomer;
	}

	public Payment() {
		super();
	}
	
	public Payment(int id, Customer customerId, @NotEmpty(message = "Enter check number") String checkNumber,
			Date paymentDate, @NotNull(message = "Must have ammount") Double amount) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.checkNumber = checkNumber;
		this.paymentDate = paymentDate;
		this.amount = amount;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	@JsonIgnore
	public Customer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Customer customerId) {
		this.customerId = customerId;
	}

	public String getCheckNumber() {
		return checkNumber;
	}

	public void setCheckNumber(String checkNumber) {
		this.checkNumber = checkNumber;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
