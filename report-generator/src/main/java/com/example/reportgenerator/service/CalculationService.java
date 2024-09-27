package com.example.reportgenerator.service;

import com.example.reportgenerator.model.UserInput;
import org.springframework.stereotype.Service;

@Service
public class CalculationService {

    // Method to calculate percentage of actual hours vs. planned hours
    public double calculateEfficiency(UserInput input) {
        if (input.getPlannedHours() == 0) {
            return 0; // Avoid division by zero
        }
        return (double) input.getActualHours() / input.getPlannedHours() * 100;
    }
}
