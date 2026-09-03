package com.food.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "food_seq")
    @SequenceGenerator(
    		name = "food_seq",
    		initialValue = 200,
    		allocationSize = 1)
	
    private int foodId;

    private String foodName;

    private String category;

    private double price;

    private String description;

    private boolean available;

    public Food() {
    }

    public Food(int foodId, String foodName, String category, Double price, String description, Boolean available) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.category = category;
        this.price = price;
        this.description = description;
        this.available = available;
    }
    
    

    public Food(String foodName, String category, double price, String description, boolean available) {
		this.foodName = foodName;
		this.category = category;
		this.price = price;
		this.description = description;
		this.available = available;
	}

	public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}

//Add another constructor which do not takes food ID