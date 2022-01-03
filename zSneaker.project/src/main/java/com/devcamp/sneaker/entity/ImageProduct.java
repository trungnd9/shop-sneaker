package com.devcamp.sneaker.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product_img")
public class ImageProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "url")
	private String url;
	
	@Transient
	private int idProduct;
	
	public int getIdProduct() {
		return productId.getId();
	}

	public void setIdProduct(int idProduct) {
		this.idProduct = idProduct;
	}

	@Transient
	private String productName;

	public String getProductName() {
		return productId.getProductName();
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
	@JoinColumn(name = "product_id", nullable = false)
	@JsonIgnore
	private Product productId;

	public ImageProduct() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImageProduct(int id, String url, Product productId) {
		super();
		this.id = id;
		this.url = url;
		this.productId = productId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Product getProductId() {
		return productId;
	}

	public void setProductId(Product productId) {
		this.productId = productId;
	}
	
	
}
