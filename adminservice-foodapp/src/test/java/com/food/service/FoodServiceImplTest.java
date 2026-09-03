package com.food.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.food.entity.Food;
import com.food.repository.FoodRepository;

public class FoodServiceImplTest {

    @Mock
    private FoodRepository foodRepository;

    @InjectMocks
    private FoodServiceImpl foodServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetFoodById() {

        Food food = new Food();
        food.setFoodId(101);
        food.setFoodName("Pizza");
        food.setCategory("Fast Food");
        food.setPrice(250);
        food.setDescription("Cheese Pizza");
        food.setAvailable(true);

        when(foodRepository.findById(101))
                .thenReturn(Optional.of(food));

        Food result = foodServiceImpl.getFoodById(101);

        assertEquals("Pizza", result.getFoodName());
        assertEquals("Fast Food", result.getCategory());
        assertEquals(250, result.getPrice());
    }
}