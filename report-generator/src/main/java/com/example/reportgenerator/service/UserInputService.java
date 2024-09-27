package com.example.reportgenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.reportgenerator.model.UserInput;
import com.example.reportgenerator.repository.UserInputRepository;

import java.util.List;

@Service
public class UserInputService {

    @Autowired
    private UserInputRepository userInputRepository;

    public UserInput saveUserInput(UserInput input) {
        return userInputRepository.save(input);
    }

    public List<UserInput> getAllUserInputs() {
        return userInputRepository.findAll();
    }

    public UserInput getUserInputById(Long id) {
        return userInputRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserInput not found with id: " + id));
    }
}
