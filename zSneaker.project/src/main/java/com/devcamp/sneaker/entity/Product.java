package com.devcamp.sneaker.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Transient
	private int idProductLine;
	
	@NotEmpty(message = "Enter product code")
	@Column(name = "product_code", nullable = true, unique = true)
	private String productCode;

	@NotEmpty(message = "Enter product name")
	@Column(name = "product_name", nullable = false)
	private String productName;

	@Column(name = "product_description")
	private String productDescription;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "product_line_id")
	@JsonIgnore
	private ProductLine productLineId;
	
	@Column(name = "product_size", nullable = false)
	private String productSize;
	
	@Column(name = "product_color", nullable = false)
	private String productColor;
	
	@OneToMany(mappedBy = "productId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<ImageProduct> productImgs;

	@Column(name = "product_vendor", nullable = false)
	private String productVendor;

	@Column(name = "quantity_in_stock", nullable = false)
	private int quantityInStock;

	@Column(name = "buy_price", nullable = false)
	private java.math.BigDecimal buyPrice;

	@OneToMany(mappedBy = "productId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<OrderDetail> orderDetail;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public Product(int id, int idProductLine, @NotEmpty(message = "Enter product code") String productCode,
			@NotEmpty(message = "Enter product name") String productName, String productDescription,
			ProductLine productLineId, String productSize, String productColor, List<ImageProduct> productImgs,
			String productVendor, int quantityInStock, BigDecimal buyPrice, List<OrderDetail> orderDetail) {
		super();
		this.id = id;
		this.idProductLine = idProductLine;
		this.productCode = productCode;
		this.productName = productName;
		this.productDescription = productDescription;
		this.productLineId = productLineId;
		this.productSize = productSize;
		this.productColor = productColor;
		this.productImgs = productImgs;
		this.productVendor = productVendor;
		this.quantityInStock = quantityInStock;
		this.buyPrice = buyPrice;
		this.orderDetail = orderDetail;
	}


	public int getIdProductLine() {
		return getProductLineId().getId();
	}

	public void setIdProductLine(int idProductLine) {
		this.idProductLine = idProductLine;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public ProductLine getProductLineId() {
		return productLineId;
	}

	public void setProductLineId(ProductLine productLineId) {
		this.productLineId = productLineId;
	}

	public String getProductSize() {
		return productSize;
	}

	public void setProductSize(String productSize) {
		this.productSize = productSize;
	}

	public String getProductColor() {
		return productColor;
	}

	public void setProductColor(String productColor) {
		this.productColor = productColor;
	}

	public String getProductVendor() {
		return productVendor;
	}

	public void setProductVendor(String productVendor) {
		this.productVendor = productVendor;
	}

	public int getQuantityInStock() {
		return quantityInStock;
	}

	public void setQuantityInStock(int quantityInStock) {
		this.quantityInStock = quantityInStock;
	}

	public java.math.BigDecimal getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(java.math.BigDecimal buyPrice) {
		this.buyPrice = buyPrice;
	}


	public List<ImageProduct> getProductImgs() {
		return productImgs;
	}


	public void setProductImgs(List<ImageProduct> productImgs) {
		this.productImgs = productImgs;
	}
	
	
}
