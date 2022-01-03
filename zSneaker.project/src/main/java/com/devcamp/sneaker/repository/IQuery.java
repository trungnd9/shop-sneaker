package com.devcamp.sneaker.repository;

public interface IQuery {
	
	String getProductId();

    Long getCount();
    
    Long getOrderDetailId();
    
    Long getPrice();
    
    String getQuantity();
    
    String getProductName();
    
    Long getOrderId(); 
    
    Long getCustomerId();
    
    String getOrderDate();
    
    String getImage();
}
