package com.food.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.food")
@EnableJpaRepositories(basePackages = "com.food.repository")
@EntityScan(basePackages = "com.food.entity")
@EnableDiscoveryClient
public class RestaurantServiceeApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestaurantServiceeApplication.class, args);
    }

}

//Added EnableJPARepo
//Entity scan ka import change kra hai