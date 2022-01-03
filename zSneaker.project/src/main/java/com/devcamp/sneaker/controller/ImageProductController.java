package com.devcamp.sneaker.controller;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devcamp.sneaker.entity.ImageProduct;
import com.devcamp.sneaker.entity.Product;
import com.devcamp.sneaker.repository.IImageProductRepository;
import com.devcamp.sneaker.repository.IProductRepository;

@RestController
@CrossOrigin
@RequestMapping("images")
public class ImageProductController {
	@Autowired
	IImageProductRepository pImageProductRepo;

	@Autowired
	IProductRepository pProductRepo;

	// get list image product by productId
	@GetMapping("/{productId}")
	public ResponseEntity<List<ImageProduct>> getImageByProductId(@PathVariable Integer productId) {
		try {
			return new ResponseEntity<>(pImageProductRepo.findByProductIdId(productId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// upload image
	@PostMapping("/upload/{productId}")
	@ResponseStatus(HttpStatus.CREATED)
	public ImageProduct uploadImage(@PathVariable Integer productId, @RequestParam MultipartFile image)
			throws IOException {
		Optional<Product> product = pProductRepo.findById(productId);
		String productBrand = product.get().getProductVendor();
		Path imageUpload = Paths
				.get("D:\\JAVA SCRIPT\\Shop\\Project Sneaker Shop\\assets\\img\\product\\upload\\" + productBrand);
		if (!Files.exists(imageUpload)) {
			Files.createDirectories(imageUpload);
		}
		Path file = imageUpload.resolve(image.getOriginalFilename());
		try (OutputStream os = Files.newOutputStream(file)) {
			os.write(image.getBytes());
		}

		ImageProduct imageProduct = new ImageProduct();
		imageProduct.setUrl("assets\\img\\product\\upload" + "\\" + productBrand + "\\" + image.getOriginalFilename());
		imageProduct.setProductId(product.get());
		return pImageProductRepo.save(imageProduct);
	}
	
	// upload multiple image
	@PostMapping("/uploadMultiple/{productId}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> uploadMultipleImage(@PathVariable Integer productId,
			@RequestParam("images") MultipartFile[] images) throws IOException {
		try {
			return ResponseEntity.ok(Arrays.asList(images).stream().map(file -> {
				try {
					return uploadImage(productId, file);
				} catch (IOException e) {
					return ResponseEntity.unprocessableEntity().body("Failed: " + e.getCause().getCause().getMessage());
				}
			}).collect(Collectors.toList()));

		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception details: " + e.getCause().getCause().getMessage());
			return ResponseEntity.unprocessableEntity().body("Failed: " + e.getCause().getCause().getMessage());
		}

	}
	
	// delete image product
	@DeleteMapping("/deleteImageProduct/{imageProductId}")
	public ResponseEntity<Object> deleteImageProduct(@PathVariable Integer imageProductId) {
		Optional<ImageProduct> imageProduct = pImageProductRepo.findById(imageProductId);
		Path image = Paths.get("D:\\JAVA SCRIPT\\Shop\\Project Sneaker Shop\\" + imageProduct.get().getUrl());
		try {
			Files.delete(image);
			pImageProductRepo.deleteImageById(imageProductId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return ResponseEntity.unprocessableEntity().body("Failed: " + e.getCause().getCause().getMessage());
		}
	}

}
