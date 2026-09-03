package com.food.service;

import java.util.List;

import com.food.entity.Food;

public interface FoodService {

    Food addFood(Food food);

    Food getFoodById(Integer foodId);

    List<Food> getAllFoods();

    Food updateFood(Integer foodId, Food food);

    void deleteFood(Integer foodId);
    
    List<Food> getFoodByCategory(String category);

    List<Food> getFoodBelowPrice(Double price);

    List<Food> getAvailableFoods();

    List<Food> getFoodBetweenPrices(Double minPrice, Double maxPrice);
}