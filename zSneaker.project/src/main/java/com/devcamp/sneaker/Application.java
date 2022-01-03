package com.devcamp.sneaker;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		
		
		File file = new File("");
        String currentDirectory = file.getAbsolutePath();
        System.out.println("Current working directory : " + currentDirectory);
	}	
}	
