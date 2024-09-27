package com.example.reportgenerator.controller;

import com.example.reportgenerator.model.UserInput;
import com.example.reportgenerator.service.UserInputService;
import com.example.reportgenerator.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from your React frontend
@RestController
@RequestMapping("/api/inputs")
public class UserInputController {

    @Autowired
    private UserInputService userInputService;

    @Autowired
    private CalculationService calculationService;

    @PostMapping
    public UserInput addUserInput(@RequestBody UserInput input) {
        return userInputService.saveUserInput(input);
    }

    @GetMapping
    public List<UserInput> getAllUserInputs() {
        return userInputService.getAllUserInputs();
    }

    // Endpoint to calculate efficiency for a given input
    @GetMapping("/{id}/efficiency")
    public double calculateEfficiency(@PathVariable Long id) {
        UserInput input = userInputService.getUserInputById(id);  // Now throws exception if not found
        return calculationService.calculateEfficiency(input);
    }
}
